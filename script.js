class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.addBtn = document.getElementById('addBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.taskCount = document.getElementById('taskCount');

        this.init();
    }

    init() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearBtn.addEventListener('click', () => this.clearAllTasks());
        this.render();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (!taskText) {
            alert('Vui lòng nhập công việc');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.taskInput.value = '';
        this.taskInput.focus();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    clearAllTasks() {
        if (this.tasks.length === 0) {
            alert('Không có công việc để xóa');
            return;
        }

        if (confirm('Bạn chắc chắn muốn xóa tất cả công việc?')) {
            this.tasks = [];
            this.saveTasks();
            this.render();
        }
    }

    render() {
        this.taskList.innerHTML = '';

        if (this.tasks.length === 0) {
            this.taskList.innerHTML = '<div class="empty-state">📪 Không có công việc nào. Hãy thêm một công việc!</div>';
        } else {
            this.tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                taskItem.innerHTML = `
                    <input 
                        type="checkbox" 
                        ${task.completed ? 'checked' : ''}
                        onchange="taskManager.toggleTask(${task.id})"
                    >
                    <span class="task-text">${this.escapeHtml(task.text)}</span>
                    <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})">Xóa</button>
                `;
                
                this.taskList.appendChild(taskItem);
            });
        }

        this.updateCount();
    }

    updateCount() {
        const count = this.tasks.length;
        this.taskCount.textContent = `${count} công việc`;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});
