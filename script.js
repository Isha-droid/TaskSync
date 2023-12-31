document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('input-box');
    const categorySelect = document.getElementById('category-select');
    const listContainer = document.getElementById('listContainer');

    function addTaskElement(taskContent, taskCategory, taskDate) {
        let li = document.createElement("li");
        li.innerHTML = `${taskContent} <span class="date">${taskDate}</span> <span class="category">${taskCategory}</span>`;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);

        // Apply styles and event listeners
        li.addEventListener('click', function (e) {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("checked");
                saveData();
            } else if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                saveData();
            }
        }, false);
    }

    function addTask() {
        if (inputBox.value.trim() === '') {
            alert("You must add something");
        } else {
            const currentDate = new Date().toLocaleDateString();
            const selectedCategory = categorySelect.value;
            addTaskElement(inputBox.value, selectedCategory, currentDate);
            saveData();
        }
        inputBox.value = '';
    }

    saveData = () => {
        const tasks = Array.from(listContainer.children).map(task => task.innerHTML);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };



    function showTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        listContainer.innerHTML = '';

        storedTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = task;
            listContainer.appendChild(taskItem);
        });
    }

    showTasks();

    // Attach the event listener to the button or any other trigger
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', addTask);
});
