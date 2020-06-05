// DOM queries
const todoList = document.querySelector('.todo-list');
const newTodoForm = document.querySelector('.new-todo');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const categories = document.querySelector('.categories');
const title = document.querySelector('h1');
const nameInput = document.querySelector('.new-user-form');
const mainContent = document.querySelector('.main-content');

nameInput.addEventListener('submit', e => {
    e.preventDefault();
    console.log(nameInput);
    const name = nameInput.name.value.trim();
    category.updateName(name);
    nameInput.classList.add('d-none');
    mainContent.classList.remove('d-none');
});


newTodoForm.addEventListener('submit', e => {
    e.preventDefault();
    const content = newTodoForm.content.value.trim();
    category.addTodo(content)
        .then(() => newTodoForm.reset())
        .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = newNameForm.name.value.trim();
    category.updateName(name);
    newNameForm.reset();
    updateMssg.innerText = `Your name was updated to ${name}`;
    setTimeout(() => {
        updateMssg.innerText = '';
    }, 3000);
});

categories.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        todoUI.clear();
        category.updateCategory(e.target.getAttribute('id'));
        category.getTodos((todo, id) => todoUI.render(todo, id));
    }
});

todoList.addEventListener('click', e => {
    if (e.target.tagName === 'I') {
        const id = e.target.parentElement.getAttribute('data-id');
        category.deleteTodos(id,(id) => todoUI.remove(id));
    }
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.parentElement.getAttribute('data-id');
        category.changeFinishedStatus(id);
    }
});

title.addEventListener('click', e => {
    todoUI.clear();
    category.updateCategory('general');
    category.getTodos((todo, id) => todoUI.render(todo, id));
});

const name = localStorage.username ? localStorage.username : 'New User';
const categoryPage = localStorage.category ? localStorage.category : 'general';

if (!localStorage.username) {
    console.log(localStorage.username);
    nameInput.classList.remove('d-none');
    mainContent.classList.add('d-none');
}

const todoUI = new TodoUI(todoList);
const category = new Category(categoryPage, name);

category.getTodos((todo, id) => todoUI.render(todo, id));

