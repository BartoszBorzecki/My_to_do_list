{
    let tasks = [];
    let hideDoneTasks = false;


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
            },
        ];

        render();

    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();

    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];

        render();

    };

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;

        render();

    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,

        }));

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskList ${hideDoneTasks && task.done ? "taskList--hide" : ""}">
            <button class="taskList__button js-done">
              ${task.done ? "✔" : ""}
            </button>
            <span class="${task.done ? "taskList__content--done" : ""}">${task.content}</span>
            <button class="taskList__button taskList__button--remove js-remove"> 🗑 </button>
        </li>
            `;
        };

        document.querySelector(".js-list").innerHTML = htmlString;

    };

    const renderButtons = () => {
        const listButtons = document.querySelector(".js-listButtons");

        if (tasks.length === 0) {
            listButtons.innerHTML = "";

            return;
        }

        listButtons.innerHTML = `
                  <button class = "section__button js-toggleHideDoneTask" ${tasks.some(({ done }) => done) ? "" : "disabled"}>
                     ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
                  </button>
                  <button class = "section__button js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                     Ukończ wszystkie
                  </button>   
        `;

    };

    const bindButtonsEvents = () => {
        const toggleHideDoneTaskButton = document.querySelector(".js-toggleHideDoneTask");

        if (toggleHideDoneTaskButton) {
            toggleHideDoneTaskButton.addEventListener("click", () => {

                toggleHideDoneTask();
            })
        };

        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDone");

        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", () => {

                markAllTasksDone();
            })
        };
    };

    const render = () => {

        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            return;
        }

        newTaskElement.value = "";
        newTaskElement.focus();

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form")
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}