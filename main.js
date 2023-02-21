let todoArray = []


const createAppTitle = (title) => {
    const appTitle = document.createElement('h1');
    appTitle.innerHTML = title;
    appTitle.classList.add('todo-title')
    return appTitle;
}

const createTodoForm = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const addButton = document.createElement('button');
    const wrapper = document.createElement('div');

    addButton.disabled = !input.value.length;

    input.addEventListener('input', () => {
        addButton.disabled = !input.value.length;
    })

    form.classList.add('todo-form');
    input.classList.add('todo-input');
    input.placeholder = 'Введите название дела';
    addButton.classList.add('todo-button');
    wrapper.classList.add('todo-wrapper');
    addButton.textContent = 'Добавить';

    wrapper.append(addButton);
    form.append(input);
    form.append(wrapper);

    return {
        form,
        input,
        addButton
    }
}

const createTodoList = () => {
    const list = document.createElement('ul');
    list.classList.add('todo-list');

    return list;
}

const createTodoItem = (name) => {
    const todoItem = document.createElement('li');
    const actionsWrapper = document.createElement('div');
    const chbox = document.createElement('input');
    const deleteBtn = document.createElement('button');

    const randomId = Math.random() * 15.75;
    todoItem.id = randomId.toFixed(2);

    chbox.type = 'checkbox';
    todoItem.classList.add('todo-item');
    chbox.classList.add('item-checkbox');
    deleteBtn.classList.add('item-delete');
    todoItem.textContent = name;
    deleteBtn.textContent = 'Удалить';

    actionsWrapper.append(deleteBtn, chbox);
    todoItem.append(actionsWrapper);

    return {
        todoItem,
        chbox,
        deleteBtn,
        actionsWrapper
    }
}

const changeItemDone = (arr, item) => {
    arr.map(obj => {
        if (obj.id === item.id & obj.done === false) {
            obj.done = true;
        } else if(obj.id === item.id & obj.done === true){
            obj.done = false;
        }
    })
}

const completeTodoItem = (item, chbox) => {
    chbox.addEventListener('click', () => {
        todoArray = JSON.parse(localStorage.getItem(key));

        item.classList.toggle('complete-item');
        changeItemDone(todoArray, item);
        localStorage.setItem(key, JSON.stringify(todoArray));
    });
}

const deleteTodoItem = (item, btn) => {
    btn.addEventListener('click', () => {
        todoArray = JSON.parse(localStorage.getItem(key));

        const newList = todoArray.filter(obj => obj.id !== item.id)

        localStorage.setItem(key, JSON.stringify(newList));
        item.remove();
    });
}

function createTodoApp(container, title, key) {
    const appTitle = createAppTitle(title);
    const appForm = createTodoForm();
    const appList = createTodoList();

    container.append(appTitle, appForm.form, appList);

    if (localStorage.getItem(key)) {
        todoArray = JSON.parse(localStorage.getItem(key))
    
        for (const obj of todoArray) {
            const todoItem = createTodoItem(appForm.input.value);
            todoItem.todoItem.textContent = obj.name;
            todoItem.todoItem.id = obj.id;


            if (obj.done == true) {
                todoItem.todoItem.classList.add('complete-item');
                
            } else {
                todoItem.todoItem.classList.remove('complete-item');
                
            }

            completeTodoItem(todoItem.todoItem, todoItem.chbox);
            deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn);

            appList.append(todoItem.todoItem);
            todoItem.todoItem.append(todoItem.actionsWrapper); 
        }
    }

    appForm.form.addEventListener('submit', e => {
        e.preventDefault();

        const todoItem = createTodoItem(appForm.input.value);

        if (!appForm.input.value) {
            return;
        }

        completeTodoItem(todoItem.todoItem, todoItem.chbox);
        deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn);

        let localStorageData = localStorage.getItem(key);

        if (localStorageData == null) {
            todoArray = []
        } else {
            todoArray = JSON.parse(localStorageData);
        }

        const createItemObj = (arr) => {
            const itemObj = {};
            itemObj.name = appForm.input.value;
            itemObj.id = todoItem.todoItem.id;
            itemObj.done = false;

            arr.push(itemObj);
        }
        createItemObj(todoArray);
        localStorage.setItem(key, JSON.stringify(todoArray));


        appList.append(todoItem.todoItem);
        appForm.input.value = '';

        appForm.addButton.disabled = !appForm.addButton.disabled;
    });
}