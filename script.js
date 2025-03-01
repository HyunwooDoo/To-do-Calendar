
const calendarContainer = document.querySelector('.calendar-container');
const modal = document.querySelector('.todo-modal');
const modalDate = document.getElementById('modal-date');
const todoList = document.querySelector('.todo-list');
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const closeBtn = document.querySelector('.close-btn');
let selectedDate = "";
let todos = JSON.parse(localStorage.getItem('todos')) || {};
const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function renderCalendar() {
    calendarContainer.innerHTML = "";
    for (let month = 0; month < 12; month++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        monthDiv.textContent = monthNames[month];
        calendarContainer.appendChild(monthDiv);
        
        const weekdaysDiv = document.createElement('div');
        weekdaysDiv.classList.add('weekdays');
        ['일', '월', '화', '수', '목', '금', '토'].forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            weekdaysDiv.appendChild(dayEl);
        });
        calendarContainer.appendChild(weekdaysDiv);
        
        const calendarDiv = document.createElement('div');
        calendarDiv.classList.add('calendar');
        const firstDay = new Date(2025, month, 1).getDay();
        const lastDate = new Date(2025, month + 1, 0).getDate();
        for (let i = 0; i < firstDay; i++) {
            calendarDiv.appendChild(document.createElement('div'));
        }
        for (let i = 1; i <= lastDate; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = i;
            dayDiv.addEventListener('click', () => openModal(`2025-${month + 1}-${i}`));
            calendarDiv.appendChild(dayDiv);
        }
        calendarContainer.appendChild(calendarDiv);
    }
}
function openModal(date) {
    selectedDate = date;
    modalDate.textContent = date;
    renderTodoList();
    modal.classList.add('show');
}
function renderTodoList() {
    todoList.innerHTML = "";
    const items = todos[selectedDate] || [];
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.addEventListener('click', () => removeTodo(index));
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    });
}
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    if (!todos[selectedDate]) todos[selectedDate] = [];
    todos[selectedDate].push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = "";
    renderTodoList();
}
function removeTodo(index) {
    todos[selectedDate].splice(index, 1);
    if (todos[selectedDate].length === 0) delete todos[selectedDate];
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList();
}
addTodoBtn.addEventListener('click', addTodo);
closeBtn.addEventListener('click', () => modal.classList.remove('show'));
renderCalendar();