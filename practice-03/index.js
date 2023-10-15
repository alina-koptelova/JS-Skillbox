// Задача 1

function checkPassword(password) {
    if (password.length >= 4 && (password.includes('-') || password.includes('_'))) {
        console.log('Пароль надёжный')
    } else {
        console.log('Пароль недостаточно надёжный')
    }
}

checkPassword('1234-');
checkPassword('4321_');
checkPassword('qaz-xsw');
checkPassword('_zxd');
checkPassword('_-a');
checkPassword('qaz');
checkPassword('_-3');
checkPassword('123456789');

// Задача 2

function fixName(userName, userSurname) {
    let fixedName = userName.substring(0, 1).toUpperCase() + userName.substring(1).toLowerCase();
    let fixedSurName = userSurname.substring(0, 1).toUpperCase() + userSurname.substring(1).toLowerCase();

    console.log(userName === fixedName ? 'Имя осталось без изменений' : 'Имя было преобразовано');
    console.log(userSurname === fixedSurName ? 'Фамилия осталась без изменений' : 'Фамилия была преобразована');
}

fixName('Алина', 'Коптелова');
fixName('алина', 'коптелова');
fixName('аЛИНА', 'Коптелова');
fixName('Алина', 'кОпТеЛовА');

// Задача 3

function checkParity(number) {
    console.log(number % 2 === 0 ? "Число чётное" : "Число нечётное");
}

checkParity(5); // нечетное
checkParity(52); // четное
checkParity(1); // нечетное
checkParity(0); // четное