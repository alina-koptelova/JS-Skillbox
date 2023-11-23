(function() {
    let todos = [];

    function generateId() {
        let maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);
        return maxId + 1;
    }

    function updateIds() {
        todos.forEach((todo, index) => {
            todo.id = index + 1;
        });
    }

    function saveDataToLocalStorage(key, data) {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    }
  
    function getDataFromLocalStorage(key) {
        const jsonData = localStorage.getItem(key);
        return JSON.parse(jsonData);
    }

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;
        
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', () => {
            button.disabled = input.value.trim() === '';
        });

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(todo) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = todo.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        if (todo.done) {
            item.classList.add('list-group-item-success');
        }

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function addEventListeners(todoItem, todo, listName) {
        todoItem.doneButton.addEventListener('click', () => {
            todoItem.item.classList.toggle('list-group-item-success');
            todo.done = !todo.done;
            saveDataToLocalStorage(listName, todos);
        });
        todoItem.deleteButton.addEventListener('click', () => {
            if (confirm('Вы уверены?')) {
                todoItem.item.remove();
                todos = todos.filter((item) => item.id !== todo.id);
                updateIds();
                saveDataToLocalStorage(listName, todos);
            }
        });
    }

    function createTodoApp(container, title = 'Список дел', listName) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        const savedTodos = getDataFromLocalStorage(listName);

        if (savedTodos) {
            todos = savedTodos;
            todos.forEach(todo => {
                let todoItem = createTodoItem(todo);
                todoList.append(todoItem.item);
                addEventListeners(todoItem, todo, listName);
            });
        }

        todoItemForm.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let todo = {
                id: generateId(),
                name: todoItemForm.input.value,
                done: false,
            };

            let todoItem = createTodoItem(todo);
            addEventListeners(todoItem, todo, listName);

            todoList.append(todoItem.item);
            todos.push(todo);

            saveDataToLocalStorage(listName, todos);

            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})()

