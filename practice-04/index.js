// Задача 1

function generateArray(n, m, count) {
    let array = [];
    for (let i = 0; i < count; ++i) {
        let randomNumber = Math.min(n, m) + Math.round(Math.random() * Math.abs(m - n));
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
        let j = Math.min(0, count - 1) + Math.round(Math.random() * Math.abs(count - 1));
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
    let index = -1;

    for (let i in array) {
        if (array[i] === n) {
            index = i;
            break;
        }
    }
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
    for (let i in arr2) {
        arr1.push(arr2[i]);
    }

    console.log(arr1);
}

joinArrays([2, 2, 17, 21, 45, 12, 54, 31, 53], [12, 44, 23, 5]);