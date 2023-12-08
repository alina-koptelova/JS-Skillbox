function renderOrderItems(orderItems) {
    const orderBody = document.querySelector('.order-body');
    orderBody.innerHTML = '';
    orderItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <strong class="item-price">${item.price * item.count} ₽</strong>
            <span class="item-counter">Кол-во: ${item.count}</span>
        `;
        orderBody.appendChild(orderItem);
    });

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.count, 0);
    const finalSum = document.querySelector('.final-sum');
    finalSum.textContent = `Итого: ${totalPrice} ₽`;
};

function handlePayment() {
    const paymentForm = document.querySelector('.contacts-form');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.clear();
        alert("Заказ оплачен. Ожидайте доставку.");
        window.location.href = 'index.html';
    });
};

handlePayment();

function loadCartFromLocalStorage() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        const cartItems = JSON.parse(savedCartItems);
        renderOrderItems(cartItems);
    }
};

window.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
});