// 3 way dark theme 
const defaultTheme = window.matchMedia("(prefers-color-scheme: light)").matches; //true for light or false for dark
document.documentElement.classList.toggle('dark', !defaultTheme);

document.querySelector('#themeBtn').addEventListener('click', () => document.documentElement.classList.toggle('dark'));

///////////////////////////////
const todos = [
    { task: "Clean the house", checked: false },
    { task: 'Check for GTA VI', checked: false },
    { task: 'Hunt mosquitoes', checked: false },
    { task: "Read Nietzsche", checked: true },
];


const todoList = document.querySelector('#todoUl');
const todoCount = document.querySelector('#todoCount');

function updateTodoCount() {
    todoCount.textContent = todos.length;
}


function renderTodoList(arr) {
    updateTodoCount();
    arr.forEach((todo, index) => {
        todoList.insertAdjacentHTML('afterbegin',
            `<li class="p-3 border-b-1 border-gray-400 dark:border-gray-600 todo-item" draggable="false" >
                    <label class="flex items-center gap-4 ps-1 group">
                        <input type="checkbox" class="todoCheckbox hidden" ${todo.checked ? "checked" : ""} data-index=${index}>

                        <span class=" h-6 w-6 rounded-full border-2 border-gray-400 flex place-content-center p-1 
                            group-has-checked:border-0 group-has-checked:bg-gradient-to-br from-grad1 to-grad2">
                            <img class="hidden group-has-checked:block" alt="check icon" src="images/icon-check.svg">
                        </span>
                        <span
                            class="text-gray-500 dark:text-gray-300 group-has-checked:line-through group-has-checked:text-gray-400">
                            ${todo.task}
                        </span>

                        <span class="hidden group-hover:block ms-auto ">
                            <button type="button" id=${index}
                                class=" deleteTodo flex place-content-center cursor-pointer px-2 text-black dark:text-white">
                                &#10005;
                            </button>
                        </span>
                    </label>
                </li>
               `
        )
    })
};

renderTodoList(todos);

////////////////////
const todoForm = document.querySelector('#todoForm');
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    todoList.replaceChildren();
    todos.push({ task: e.target.querySelector('input').value, checked: false });
    renderTodoList(todos);
    updateTodoCount();
    newTodo.value = '';
})

/////////////////////
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteTodo')) {
        todoList.replaceChildren();
        todos.splice(e.target.id, 1);
        renderTodoList(todos);
        updateTodoCount();
    }
});

/////////////////////
const todoCheckboxes = document.querySelectorAll('.todoCheckbox');
const all = document.querySelector('#all');
const active = document.querySelector('#active');
const completed = document.querySelector('#Completed');
const clear = document.querySelector('#clear')


todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('todoCheckbox')) {
        todos.at(e.target.dataset.index).checked = !todos.at(e.target.dataset.index).checked;
    }
});

all.addEventListener('click', () => {
    all.classList.add('activeBtn');
    active.classList.remove('activeBtn');
    completed.classList.remove('activeBtn');
    todoList.replaceChildren();
    renderTodoList(todos);
});

completed.addEventListener('click', () => {
    completed.classList.add('activeBtn');
    all.classList.remove('activeBtn');
    active.classList.remove('activeBtn');

    todoList.replaceChildren();
    renderTodoList(todos.filter(todo => todo.checked === true))
}
);


active.addEventListener('click', () => {
    active.classList.add('activeBtn');
    all.classList.remove('activeBtn');
    completed.classList.remove('activeBtn');

    todoList.replaceChildren();
    renderTodoList(todos.filter(todo => todo.checked === false))
}
);

clear.addEventListener('click', () => {
    all.classList.add('activeBtn');
    active.classList.remove('activeBtn');
    completed.classList.remove('activeBtn');

    todoList.replaceChildren();

    for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i].checked) {
            todos.splice(i, 1);
        }
    }

    renderTodoList(todos); // ← you missed this
});

