let allDishes = [];

function getDishes() {
    fetch('db/db.json').then(res => res.json()).then(result => {{allDishes = result}; renderCards(allDishes);});
};

const cart = {
    cartItems: [],
    addCardId(id) {
        const item = this.cartItems.find(dish => dish.id === id);
        if (item) {
            this.plusItem(id);
        } else {
            const {id: idx, name, price} = allDishes.find(dish => dish.id === id);
            this.cartItems.push({id: idx, name, price, count: 1});
            this.cartRender();
        }
        this.saveCartToLocalStorage();
    },
    cartRender() {
        cartTableItems.textContent = '';
        this.cartItems.forEach(({name, id, price, count}) => {
            const foodRow = document.createElement('div');
            foodRow.classList.add('food-row');
            foodRow.dataset.id = id;
            foodRow.innerHTML = `
            <span class="food-name">${name}</span>
			<strong class="food-price">${price * count} ₽</strong>
			<div class="food-counter">
			    <button class="cart-btn-minus" data-id=${id}>-</button>
			    <span class="counter">${count}</span>
			    <button class="cart-btn-plus" data-id=${id}>+</button>
            </div>
            `
            cartTableItems.append(foodRow);
        })
        const totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
        cartTableTotal.textContent = `${totalPrice} ₽`;
        cartCount.textContent = this.cartItems.reduce((sum, item) => sum + item.count, 0);
    },
    plusItem(id) {
        const elem = this.cartItems.find(el => el.id === id);
        if (elem) {
            elem.count++;
        }
        this.cartRender();
        this.saveCartToLocalStorage();
    },
    minusItem(id) {
        const elem = this.cartItems.find(el => el.id === id);
        if (elem.count === 1) {
            this.deleteItem(id);
        } else {
            elem.count--;
        }
        this.cartRender();
        this.saveCartToLocalStorage();
    },
    deleteItem(id) {
        this.cartItems = this.cartItems.filter(el => el.id !== id);
        this.cartRender();
        this.saveCartToLocalStorage();
    },
    isCartEmpty() {
        return this.cartItems.length === 0;
    },
    clearCart() {
        this.cartItems = [];
        this.cartRender();
        cartCount.textContent = '0';
        this.saveCartToLocalStorage();
    },
    saveCartToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    loadCartFromLocalStorage() {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            this.cartItems = JSON.parse(savedCartItems);
            cartCount.textContent = this.cartItems.reduce((sum, item) => sum + item.count, 0);
            this.cartRender();
        }
    }
};

const cards = document.querySelector('.cards');
const selectFilter = document.querySelector('.food-categories');
const searchInput = document.querySelector('.input-search');
const cartButton = document.querySelector('.cart-button');
const modalCart = document.querySelector('.modal');
const closeCartButton = document.querySelector('.close');
const cartTableItems = document.querySelector('.modal-body');
const cartTableTotal = document.querySelector('.modal-pricetag');
const cartCount = document.querySelector('.cart-count');
const cancelButton = document.querySelector('.cancel');
const orderButton = document.querySelector('.order-button');

cartTableItems.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'BUTTON') {
        const className = target.className;
        const id = target.dataset.id;
        switch(className) {
            case 'cart-btn-minus':
                cart.minusItem(id);
                break;
            case 'cart-btn-plus':
                cart.plusItem(id);
                break;
        }
    } 
});

function renderCards(data) {
    cards.textContent = '';
    const allCards = data.map(dish => createCard(dish));
    cards.append(...allCards);
};

function createCard(objCard) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <img src=db/${objCard.img} class="card-img">
    <div class="card-text">
        <div class="card-heading">
            <h3 class="card-title">${objCard.name}</h3>
        </div>
        <div class="card-info">
            <div class="price" data-id="${objCard.id}">
                <img src="img/add-to-cart.png">
                ${objCard.price} ₽
            </div>
            <div class="category">${objCard.category}</div>
        </div>	
    </div>
    `;
    return card;
};

function filterCards(value) {
    renderCards(allDishes.filter(dish => dish["category"] === value));
};

selectFilter.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === "Все") {
        renderCards(allDishes);
    } else {
        filterCards(value);
    }
});

function searchMenuItem(allDishes, input, selectedCategory) {
    input = input.toLowerCase();
    const searchedItem = allDishes.filter(dish => {
        const inSelectedCategory = selectedCategory === 'Все' || dish.category === selectedCategory;
        return inSelectedCategory && dish.name.toLowerCase().includes(input);
    });
    return searchedItem;
};

searchInput.addEventListener('input', function() {
    const selectedCategory = selectFilter.value;
    const searchResult = searchMenuItem(allDishes, this.value, selectedCategory);
    renderCards(searchResult);
});

cartButton.addEventListener('click', () => {
    modalCart.classList.add('is-open');
});

closeCartButton.addEventListener('click', () => {
    modalCart.classList.remove('is-open');
});

cancelButton.addEventListener('click', () => {
    if (!cart.isCartEmpty()) {
        cart.clearCart();
    } else {
        alert('Корзина уже пуста. Очистка не требуется.');
    }
});

orderButton.addEventListener('click', () => {
    if (!cart.isCartEmpty()) {
        window.location.href = 'payment.html';
    } else {
        alert('Корзина пуста. Пожалуйста, добавьте товары перед оформлением заказа.');
    }
});

document.body.addEventListener('click', (e) => {
    const target = e.target.closest('.price');
    if (target) {
        cart.addCardId(target.dataset.id);
    }
});

getDishes();
cart.loadCartFromLocalStorage();

