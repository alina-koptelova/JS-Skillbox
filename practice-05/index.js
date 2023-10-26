// Задача 1

function getAge(birthYear) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return currentYear - birthYear;
}

console.log(getAge(1998)); // 25
console.log(getAge(1991)); // 32
console.log(getAge(2007)); // 16

// Задача 2

function filter(whiteEmailsList, blackEmailsList) {
    return whiteEmailsList.filter(el => !blackEmailsList.includes(el));
}

let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru',
 'goodday@day.ru']
let blackList = ['jsfunc@mail.ru','goodday@day.ru']
let result = filter(whiteList, blackList);
console.log(result);

// Задача 3

function arrSort(arr) {
    // for (let i = 0; i < arr.length; ++i) {
    //     for (let j = 0; j < arr.length - 1; ++j) {
    //         if (arr[j] > arr[j + 1]) {
    //             let temp = arr[j];
    //             arr[j] = arr[j + 1];
    //             arr[j + 1] = temp;
    //         }
    //     }
    // }

    // console.log(arr);
    arr.sort((a, b) => a - b);
    console.log(arr);
}

arrSort([2, 5, 1, 3, 4]);
arrSort([12, 33, 3, 44, 100]);
arrSort([0, 1]);