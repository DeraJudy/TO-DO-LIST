const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }else {
    alert("Please enter a task!");
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;
    if (task.completed) {
      taskTextElement.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    listItem.appendChild(checkbox);
    listItem.appendChild(taskTextElement);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function toggleTaskCompletion(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
  }
}