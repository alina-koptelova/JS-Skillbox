// Задача 1

function generateArray(n, m, count) {
    let array = [];
    for (let i = 0; i < count; ++i) {
        let range = Math.abs(m - n);
        let numberInRange = Math.round(Math.random() * range);
        let min = Math.min(n, m);
        let randomNumber = min + numberInRange;
        array.push(randomNumber);
    }

    console.log(array);
}

generateArray(0, 100, 100);
generateArray(2, 5, 50);
generateArray(100, -5, 70);
generateArray(-3, -10, 42);

// Задача 2

function mixArray(count) {
    let array = [];
    for (let i = 1; i <= count; ++i) {
        array.push(i);
    }
    for (let i = 0; i < count; ++i) {
        let range = Math.abs(count - 1);
        let numberInRange = Math.round(Math.random() * range)
        let min = Math.min(0, count - 1);
        let j = min + numberInRange;
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    return array;
}


let array_1 = mixArray(5);
let array_2 = mixArray(7);
let array_3 = mixArray(3);
console.log(array_1);
console.log(array_2);
console.log(array_3);

// Задача 3

function findIndex(array, n) {
    let index = array.findIndex((element) => element === n);
    
    if (index === -1) {
        console.log('Элемент не найден');
    } else {
        console.log(index);
    }
}

findIndex(array_1, 3);
findIndex(array_2, 1);
findIndex(array_3, 7);

// Задача 4

function joinArrays(arr1, arr2) {
    console.log(arr1.concat(arr2));
}

joinArrays([2, 2, 17, 21, 45, 12, 54, 31, 53], [12, 44, 23, 5]);