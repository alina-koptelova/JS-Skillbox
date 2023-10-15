// Задача 1
function rectangleArea(x1, y1, x2, y2) {
    let a = Math.abs(x2 - x1);
    let b = Math.abs(y2 - y1);

    return a * b;
}

console.log(rectangleArea(2, 3, 10, 5)); // 16
console.log(rectangleArea(10, 5, 2, 3)); // 16
console.log(rectangleArea(-5, 8, 10, 5)); // 45
console.log(rectangleArea(5, 8, 5, 5)); // 0
console.log(rectangleArea(8, 1, 5, 1)); // 0

// Задача 2
function calculateFractionalPart(a, b, n) {
    let aNormilized = Math.floor(a % 1 * Math.pow(10, n));
    let bNormilized = Math.floor(b % 1 * Math.pow(10, n));

    console.log('Дробные части чисел', aNormilized, bNormilized);
    console.log('Числа равны', aNormilized === bNormilized);
    console.log('Первое число больше', aNormilized > bNormilized);
    console.log('Первое число меньше', aNormilized < bNormilized);
    console.log('Первое число больше или равно', aNormilized >= bNormilized);
    console.log('Первое число меньше или равно', aNormilized <= bNormilized);
    console.log('Числа не равны', aNormilized !== bNormilized);
}

calculateFractionalPart(13.123456789, 2.123, 5); // 12345 12300
calculateFractionalPart(13.890123, 2.891564, 2); // 89 89
calculateFractionalPart(13.890123, 2.891564, 3); // 890 891

// Задача 3
function generateRandomNumbers(n, m) {
    let numberInRange1 = Math.round(Math.random() * Math.abs(m - n));
    let numberInRange2 = Math.round(Math.random() * Math.abs(m - n));
    let number1 = Math.min(n, m) + numberInRange1;
    let number2 = Math.min(n, m) + numberInRange2;

    console.log('Произвольные числа', number1, number2);
    console.log('Числа равны', number1 === number2);
    console.log('Первое число больше', number1 > number2);
    console.log('Первое число меньше', number1 < number2);
    console.log('Первое число больше или равно', number1 >= number2);
    console.log('Первое число меньше или равно', number1 <= number2);
    console.log('Числа не равны', number1 !== number2);
}

generateRandomNumbers(0, 100); // 11 24, 33 83, 35 61, 87 58, 51 68
generateRandomNumbers(2, 5); // 3 4, 5 5, 2 4, 3 4, 4 2
generateRandomNumbers(100, -5); // 20 51, 99 1, 21 73, -3 5, 73 32
generateRandomNumbers(-3, -10); // -3 -9, -4 -5, -9 -6, -10 -4, -4 -3