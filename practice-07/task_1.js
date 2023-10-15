// Задача 1

function createStudentCard(name, age) {
    let card = document.createElement('div');
    document.body.append(card);
    let personName = document.createElement('h2');
    card.append(personName);
    personName.textContent = name;
    let personAge = document.createElement('span');
    card.append(personAge);
    personAge.textContent = 'Возраст: ' + age + ' лет';
}

createStudentCard('Игорь', 17);