// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
const studentsList = [
    {
        surname: "Сергеевич",
        name: "Иван",
        lastname: "Петров",
        birthday: new Date("2000-02-15"),
        startYear: 2020,
        faculty: "Информационные технологии"
    },
    {
        surname: "Александровна",
        name: "Мария",
        lastname: "Иванова",
        birthday: new Date("2001-05-20"),
        startYear: 2019,
        faculty: "Экономика"
    },
    {
        surname: "Петрович",
        name: "Андрей",
        lastname: "Смирнов",
        birthday: new Date("2002-06-07"),
        startYear: 2021,
        faculty: "Медицина"
    },
    {
        surname: "Дмитриевна",
        name: "Елена",
        lastname: "Козлова",
        birthday: new Date("1999-01-19"),
        startYear: 2020,
        faculty: "Искусства"
    },
    {
        surname: "Игоревич",
        name: "Денис",
        lastname: "Волков",
        birthday: new Date("2002-03-30"),
        startYear: 2018,
        faculty: "Химия"
    }
];

function calculateAge(birthday) {
    const today = new Date();
    const birth = new Date(birthday);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

function getEducationInfo(startYear) {
    const finishYear = startYear + 4;
    const currentYear = new Date().getFullYear();
    let course = currentYear >= finishYear ? 'закончил' : `${currentYear - startYear + 1} курс`;

    return `${startYear}-${finishYear} (${course})`;
}

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('ru-RU', options).split('.').reverse().join('.');
}

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
function getStudentItem(studentObj) {
    let tableRow = document.createElement('tr');
    let nameCell = document.createElement('td');
    let facultyCell = document.createElement('td');
    let birthdayCell = document.createElement('td');
    let studyYearsCell = document.createElement('td');
    let age = calculateAge(studentObj.birthday);

    nameCell.textContent = `${studentObj.lastname} ${studentObj.name} ${studentObj.surname}`;
    facultyCell.textContent = studentObj.faculty;
    birthdayCell.textContent = `${formatDate(studentObj.birthday)} (${age} лет)`;
    studyYearsCell.textContent = getEducationInfo(parseInt(studentObj.startYear))
    tableRow.appendChild(nameCell);
    tableRow.appendChild(facultyCell);
    tableRow.appendChild(birthdayCell);
    tableRow.appendChild(studyYearsCell);

    return tableRow;
};

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
function renderStudentsTable(studentsArray) {
    const studentsTable = document.querySelector('.students-table');
    const fragment = document.createDocumentFragment();
    const nameFilter = document.querySelector('.name-filter').value.trim();
    const facultyFilter = document.querySelector('.faculty-filter').value.trim();
    const startYearFilter = document.querySelector('.start-year-filter').value.trim();
    const finishYearFilter = document.querySelector('.finish-year-filter').value.trim();
    const filters = {
        name: nameFilter,
        faculty: facultyFilter,
        startYear: startYearFilter,
        finishYear: finishYearFilter
    };

    studentsArray = filterStudentsArray(studentsList, filters);
    studentsArray.forEach(student => {
        const rowContent = getStudentItem(student);
        fragment.appendChild(rowContent);
    });

    studentsTable.innerHTML = '';
    studentsTable.appendChild(fragment);
    
    const birthdayInput = document.querySelector('.birthday');
    const maxDate = new Date().toISOString().split('T')[0];
    birthdayInput.setAttribute('max', maxDate);
    const startYearInput = document.querySelector('.start-year');
    const maxYear = new Date().getFullYear();
    startYearInput.setAttribute('max', maxYear);
}

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
const addStudentForm = document.querySelector('.add-student-form');
addStudentForm.addEventListener('submit', e => {
    e.preventDefault();
    const surname = document.querySelector('.surname').value.trim();
    const name = document.querySelector('.name').value.trim();
    const lastname = document.querySelector('.lastname').value.trim();
    const birthday = document.querySelector('.birthday').value.trim();
    const startYear = document.querySelector('.start-year').value.trim();
    const faculty = document.querySelector('.faculty').value.trim();

    if (surname && name && lastname && birthday && startYear && faculty) {
        const newStudent = {
            surname,
            name,
            lastname,
            birthday: formatDate(birthday),
            startYear,
            faculty
        };

        studentsList.push(newStudent);
        localStorage.setItem('studentsList', JSON.stringify(studentsList));
        renderStudentsTable(studentsList);
        addStudentForm.reset();
    }
});

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
function sortStudents(studentsArray, propSortBy) {
    if (propSortBy === 'name') {
        studentsArray.sort((a, b) => {
            const nameA = `${a.lastname} ${a.firstname} ${a.surname}`;
            const nameB = `${b.lastname} ${b.firstname} ${b.surname}`;
    
            return nameA.localeCompare(nameB);
        });
    } else if (propSortBy === 'faculty') {
        studentsArray.sort((a, b) => a.faculty.localeCompare(b.faculty));
    } else if (propSortBy === 'birthday') {
        studentsArray.sort((a, b) => b.birthday - a.birthday)
    } else if (propSortBy === 'startYear') {
        studentsArray.sort((a, b) => a.startYear - b.startYear);
    }
};

const nameHeader = document.querySelector('th[name="name"]');
    nameHeader.addEventListener('click', () => {
    sortStudents(studentsList, 'name');
    renderStudentsTable(studentsList);
});

const facultyHeader = document.querySelector('th[name="faculty"]');
    facultyHeader.addEventListener('click', () => {
    sortStudents(studentsList, 'faculty');
    renderStudentsTable(studentsList);
});

const birthdayHeader = document.querySelector('th[name="birthday"]');
    birthdayHeader.addEventListener('click', () => {
    sortStudents(studentsList, 'birthday');
    renderStudentsTable(studentsList);
});

const startYearHeader = document.querySelector('th[name="study-years"]');
    startYearHeader.addEventListener('click', () => {
    sortStudents(studentsList, 'startYear');
    renderStudentsTable(studentsList);
});


// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
function filterStudentsArray(studentsList, filters) {
    const { name, faculty, startYear, finishYear } = filters;

    let filteredStudents = studentsList.filter(student => {
        const isNameMatch = [
            `${student.lastname} ${student.name} ${student.surname},
            ${student.name} ${student.lastname} ${student.surname},
            ${student.name} ${student.surname} ${student.lastname},
            ${student.surname} ${student.name} ${student.lastname}
        `].some(fullName => fullName.toLowerCase().includes(name.toLowerCase()));
        const isFacultyMatch = student.faculty.toLowerCase().includes(faculty.toLowerCase());
        const isStartYearMatch = !startYear || student.startYear === Number(startYear);
        const isFinishYearMatch =  !finishYear || (student.startYear + 4) === Number(finishYear);
        
        return isNameMatch && isFacultyMatch && isStartYearMatch && isFinishYearMatch;
  });

  return filteredStudents;
}

const filtetForm = document.querySelector('.filter-form')
const applyFilterButton = document.querySelector('.apply-filter');
applyFilterButton.addEventListener('click', e => {
    e.preventDefault();
    renderStudentsTable(studentsList);
    filtetForm.reset();
});

const resetFilterButton = document.querySelector('.reset-filter');
resetFilterButton.addEventListener('click', () => {
    location.reload();
});

window.addEventListener('DOMContentLoaded', () => {
    renderStudentsTable(studentsList);
});