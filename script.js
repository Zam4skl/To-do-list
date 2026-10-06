document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('tasklist');

    // Feature 1: Add New Task
    function addTask() {
        const text = taskInput.value.trim();

        if (text === '') {
            alert('Please enter a task before adding!');
            return;
        }

        // Create <li> container
        const li = document.createElement('li');

        // Create task wrapper (Checkbox + Text Span)
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = text;

        taskContent.appendChild(checkbox);
        taskContent.appendChild(span);

        // Create button wrapper (Edit + Remove)
        const actionBtns = document.createElement('div');
        actionBtns.className = 'action-btns';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'delete-btn';
        removeBtn.textContent = 'Remove';

        actionBtns.appendChild(editBtn);
        actionBtns.appendChild(removeBtn);

        // Assemble all parts into <li>
        li.appendChild(taskContent);
        li.appendChild(actionBtns);

        // Append <li> to <ul>
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
        taskInput.focus();
    }

    // Attach click and enter key handlers to add tasks
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    /**
     * EVENT DELEGATION PATTERN
     * Listens on parent <ul> container for Checkbox, Edit, and Remove clicks.
     */
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const parentLi = target.closest('li');

        if (!parentLi) return;

        // Feature 4: Checkbox toggle (Adds/removes .completed class for strikethrough)
        if (target.classList.contains('task-checkbox')) {
            if (target.checked) {
                parentLi.classList.add('completed');
            } else {
                parentLi.classList.remove('completed');
            }
        }

        // Feature 2: Edit Task
        else if (target.classList.contains('edit-btn')) {
            const taskSpan = parentLi.querySelector('.task-text');
            const currentText = taskSpan.textContent;
            const updatedText = prompt('Edit task:', currentText);

            if (updatedText !== null && updatedText.trim() !== '') {
                taskSpan.textContent = updatedText.trim();
            }
        }

        // Feature 3: Remove Task
        else if (target.classList.contains('delete-btn')) {
            parentLi.remove();
        }
    });
});