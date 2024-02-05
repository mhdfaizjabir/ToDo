window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    const todoContainer = document.querySelector('.todo-container');

    // Simulate delay (you can remove this in a real-world scenario)
    setTimeout(() => {
        loading.style.display = 'none';
        todoContainer.style.display = 'block';
    }, 2000); // Adjust the duration as needed
});// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value;

        // Create a task object
        const task = {
            text: taskText,
            done: false
        };

        // Save the task to local storage
        saveTask(task);

        // Display the task
        displayTask(task);

        // Clear the input
        taskInput.value = '';
    }
}

// Function to display a task
function displayTask(task) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.textContent = task.text;

    // Check if the task is marked as done
    if (task.done) {
        li.classList.add('done');

        // Find the last crossed task in the list
        let lastCrossedTask = taskList.querySelector('.done:last-child');

        if (lastCrossedTask) {
            // Insert the crossed task after the last crossed task
            lastCrossedTask = lastCrossedTask.nextSibling;
            taskList.insertBefore(li, lastCrossedTask);
        } else {
            // If no crossed tasks, append at the end
            taskList.appendChild(li);
        }
    } else {
        // Append the new non-crossed task at the top
        taskList.insertBefore(li, taskList.firstChild);
    }

    // Add a double click event listener to mark the task as done
    li.addEventListener('dblclick', () => {
        task.done = !task.done;
        updateTask(task);
        li.classList.toggle('done');
        
        // Move the crossed task to the correct position
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

// Function to save a task to local storage
function saveTask(task) {
    // Get existing tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task
    storedTasks.push(task);

    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// Function to update a task in local storage
function updateTask(task) {
    // Get existing tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Find the task index
    const taskIndex = storedTasks.findIndex(t => t.text === task.text);

    // Update the task
    storedTasks[taskIndex] = task;

    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

// Function to load tasks from local storage and display them
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    // Clear the existing tasks in the HTML
    taskList.innerHTML = '';

    storedTasks.forEach(task => {
        displayTask(task);
    });
}
// Function to clear all tasks
function clearTasks() {
    const taskList = document.getElementById('taskList');

    // Remove all tasks from the HTML
    taskList.innerHTML = '';

    // Clear tasks from local storage
    localStorage.removeItem('tasks');
}


// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);
