{
    const tasks = [
        {
            content: "zrobić trening",
            done: false,
        },
        {
            content: "zjeść zupę",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;

    };

    const init = () => {
        render();

    };

    init();
}