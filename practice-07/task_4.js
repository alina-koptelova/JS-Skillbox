// Задача 4

function createStudentsList(listArr) {
    let studentsList = document.createElement('ul');
    document.body.append(studentsList);

    for (let student of listArr) {
        let li = document.createElement('li');
        let studentName = document.createElement('h2');
        li.append(studentName);
        let studentAge = document.createElement('span');
        li.append(studentAge);
        studentName.textContent = student.name;
        studentAge.textContent = 'Возраст: ' + student.age + ' лет';
        studentsList.append(li);
    }
}

let allStudents = [
    {name: 'Валя', age: 11},
    {name: 'Таня', age: 24},
    {name: 'Рома', age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
]

let button = document.querySelector('button');

button.addEventListener('click', function() {
    createStudentsList(allStudents);
});

