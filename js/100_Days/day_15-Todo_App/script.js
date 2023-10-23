// https://www.youtube.com/watch?v=0Ao1UN1WSCw&list=PLkC56g8fboI0HghByzVuD2Vz8ROUXfF_j&index=15

const todoInput = document.querySelector('.todo__input');
const filtersElems = document.querySelectorAll('.todo__filter');
const clearButton = document.querySelector('.todo__clear');
const todoOut = document.querySelector('.todo__inner');

let editId = 0;
let isEditTask = false;
let todosArr = JSON.parse(localStorage.getItem('todo-list'));

filtersElems.forEach(elem => {
  elem.addEventListener('click', () => {
    const activeElem = document.querySelector('.todo__filter.active');
    activeElem.classList.remove('active');
    elem.classList.add('active');

    showTodos(elem.id);
  });
});

function showTodos(filter) {
  let liTag = '';
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status === 'completed' ? 'checked' : '';
      if (filter === todo.status || filter === 'all') {
        liTag = `<li class="todo__task">
          <label for="${id}">
            <input type="checkbox" id="${id}" ${completed}>
            <p class="${completed}">${todo.name}</p>
          </label>
        </li>`
      }
    })
  }
  todoOut.innerHTML = liTag || 'task empty';
}

showTodos('all');