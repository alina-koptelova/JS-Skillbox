// Задача 2

function createStudentCard(student) {
    let card = document.createElement('div');
    document.body.append(card);
    let studentName = document.createElement('h2');
    card.append(studentName);
    personName.textContent = student.name;
    let studentAge = document.createElement('span');
    card.append(studentAge);
    personAge.textContent = 'Возраст: ' + student.age + ' лет';
}

let studentObj={
    name: 'Игорь',
    age: 17
}

createStudentCard(studentObj)