window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    const todoContainer = document.querySelector('.todo-container');

    setTimeout(() => {
        loading.style.display = 'none';
        todoContainer.style.display = 'block';
    }, 2000);
});
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value;

        const task = {
            text: taskText,
            done: false
        };

      
        saveTask(task);

      
        displayTask(task);

     
        taskInput.value = '';
    }
}


function displayTask(task) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.textContent = task.text;

   
    if (task.done) {
        li.classList.add('done');

     
        let lastCrossedTask = taskList.querySelector('.done:last-child');

        if (lastCrossedTask) {
         
            lastCrossedTask = lastCrossedTask.nextSibling;
            taskList.insertBefore(li, lastCrossedTask);
        } else {
         
            taskList.appendChild(li);
        }
    } else {
      
        taskList.insertBefore(li, taskList.firstChild);
    }

  
    li.addEventListener('dblclick', () => {
        task.done = !task.done;
        updateTask(task);
        li.classList.toggle('done');
        
        
        if (task.done) {
            let lastCrossedTask = taskList.querySelector('.done:last-child');
            if (lastCrossedTask) {
                lastCrossedTask = lastCrossedTask.nextSibling;
                taskList.insertBefore(li, lastCrossedTask);
            } else {
                taskList.appendChild(li);
            }
        }
    });
}


function saveTask(task) {
    
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.push(task);

  
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

function updateTask(task) {
   
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

   
    const taskIndex = storedTasks.findIndex(t => t.text === task.text);


    storedTasks[taskIndex] = task;

    
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}


function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

  
    taskList.innerHTML = '';

    storedTasks.forEach(task => {
        displayTask(task);
    });
}

function clearTasks() {
    const taskList = document.getElementById('taskList');


    taskList.innerHTML = '';


    localStorage.removeItem('tasks');
}


// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);
