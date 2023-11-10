const game = document.querySelector('.game');

function getForm() {
    game.innerHTML = `
    <form class="game-settings">
        <label for="cards-count-input">Количество карточек по вертикали/горизонтали:</label>
        <input type="number" class="cards-count" min="2" max="10" step="2" value="4">
        <button type="button" class="start-game">Начать игру</button>
    </form>`;
}

function getCardsCount() {
    const cardsCountInput = document.querySelector('.cards-count')
    let cardsCount = parseInt(cardsCountInput.value);

    if (cardsCount < 2 || cardsCount > 10 || cardsCount % 2 !== 0) {
        cardsCount = 4;
    }

    return cardsCount;
}

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
function createNumbersArray(count) {
    const cardsNumberArray = [];
    for (let i = 1; i <= count; i++) {
        cardsNumberArray.push(i, i)
    }
    return cardsNumberArray;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
function startGame(count) {
    const cardsNumberArray = shuffle(createNumbersArray(count));
    let firstCard = null;
    let secondCard = null;

    for (const cardNumber of cardsNumberArray) {
        let card = document.createElement("div");

        card.textContent = cardNumber;
        card.classList.add("card");

        card.addEventListener("click", function () {
            if (card.classList.contains("open") || card.classList.contains("success")) {
                return;
            }   

            if (firstCard !== null && secondCard !== null) {
                firstCard.classList.remove("open");
                secondCard.classList.remove("open");
                firstCard = null;
                secondCard = null;
            }
        
            card.classList.add("open");
        
            if (firstCard === null) {
                firstCard = card;
            } else {
                secondCard = card;
            }
        
            if (firstCard !== null && secondCard !== null) {
                let firstCardNumber = firstCard.textContent
                let secondCardNumber = secondCard.textContent
                if (firstCardNumber === secondCardNumber) {
                    firstCard.classList.add("success")
                    secondCard.classList.add("success")
                }
            }
        
            if (cardsNumberArray.length === document.querySelectorAll(".success").length) {
                setTimeout(function () {
                    game.innerHTML = "";
                    const playAgainButton = document.createElement("button");
                    playAgainButton.textContent = "Сыграть ещё раз";

                    playAgainButton.addEventListener('click', function() {
                        game.innerHTML = "";
                        getForm();
                        const startGameButton = document.querySelector('.start-game');

                        startGameButton.addEventListener('click', function() {
                            count = getCardsCount();
                            game.innerHTML = "";
                            startGame(count);
                        });
                    });

                    game.appendChild(playAgainButton);
                }, 400);
            }
        })
    
        game.append(card);
    }
}


getForm();
const startGameButton = document.querySelector('.start-game');

startGameButton.addEventListener('click', function() {
    let cardsCount = getCardsCount();
    game.innerHTML = "";
    startGame(cardsCount);
});




