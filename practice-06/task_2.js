// Задача 3

function filter(objects, property, value) {
    let filteredArray = [];

    for (let object of objects) {
        if (object[property] === value) {
          filteredArray.push(object);
        }
    }
    
    return filteredArray;
}

let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
]
let result = filter(objects, 'name', 'Иван');

console.log(result);