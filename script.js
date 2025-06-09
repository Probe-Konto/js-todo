// 3 way dark theme 
const defaultTheme = window.matchMedia("(prefers-color-scheme: light)").matches; //true for light or false for dark
document.documentElement.classList.toggle('dark', !defaultTheme);

document.querySelector('#themeBtn').addEventListener('click', () => document.documentElement.classList.toggle('dark'));

///////////////////////////////
const todos = {
    0: {
        name: 'Check for GTA VI',
        checked: true
    },

    1: {
        name: "Read Nietzsche",
        checked: false
    },

    2: {
        name: 'Hunt mosquitoes',
        checked: false,
    },

    3: {
        name: 'Clean the house',
        checked: false
    }
}
const todoArr = ['Check for GTA VI', "Read Nietzsche", 'Hunt mosquitoes', 'Clean the house'];
const todoList = document.querySelector('#todoUl');
const todoCount = document.querySelector('#todoCount');

function updateTodoCount() {
    todoCount.textContent = todoArr.length;
}


function renderTodoList() {
    updateTodoCount();
    todoArr.forEach((el, index) => {
        todoList.insertAdjacentHTML('afterbegin',
            `<li class="p-3 border-b-1 border-gray-400 dark:border-gray-600  ">
                    <label class="flex items-center gap-4 ps-1 group">
                        <!--hide default checkbox icon and work on a new custom one-->
                        <input type="checkbox" class="hidden">

                        <span class=" h-6 w-6 rounded-full border-2 border-gray-400 flex place-content-center p-1 
                            group-has-checked:border-0 group-has-checked:bg-gradient-to-br from-grad1 to-grad2">
                            <img class="hidden group-has-checked:block" alt="check icon" src="images/icon-check.svg">
                        </span>
                        <span
                            class="text-gray-500 dark:text-gray-300 group-has-checked:line-through group-has-checked:text-gray-400">
                            ${el}
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

renderTodoList();

////////////////////
const newTodo = document.querySelector('#newTodo');

newTodo.addEventListener('keydown', (e) => {

    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        todoList.replaceChildren();
        todoArr.push(newTodo.value);
        renderTodoList();
        updateTodoCount();
        newTodo.value = '';
    }
});

/////////////////////
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteTodo')) {
        todoList.replaceChildren();
        todoArr.splice(e.target.id, 1);
        renderTodoList();
        updateTodoCount();
    }
})



/////////////////////





