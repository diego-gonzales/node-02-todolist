// const { showMenu, pause } = require('./helpers/messages');
require('colors');
const { inquirerMenu,
        pause,
        readInputForCreateTask,
        showOptionsOfTasksToDelete,
        confirm,
        checkboxTasks
      } = require('./helpers/inquirer');
const { saveDataOnDB, readDataFromDB } = require('./helpers/manage-data');
const Tasks = require('./models/tasks');



console.clear();

const main = async() => {
    let optionSelected = '';
    const tasks = new Tasks();

    const data = readDataFromDB();
    if (data) {
        tasks.loadTasksFromData(data);
    };

    do {
        optionSelected = await inquirerMenu();
        switch (optionSelected) {
            case '1':
                const description = await readInputForCreateTask('Enter a description:');
                tasks.createTask(description);
                break;
            case '2':
                tasks.listTasks();
                break;
            case '3':
                tasks.listTasksCompletesOrPendings(true);
                break;
            case '4':
                tasks.listTasksCompletesOrPendings(false);
                break;
            case '5':
                const idsCompleteTasks = await checkboxTasks(tasks.arrayTasks);
                tasks.markTasksAsCompleted(idsCompleteTasks);
                break;
            case '6':
                const taskID = await showOptionsOfTasksToDelete(tasks.arrayTasks);
                if (taskID === '0') continue; // 'continue' or may be 'break'

                const resp = await confirm('Are you sure to delete this task?')
                if (resp) {
                    tasks.deleteTask(taskID);
                    console.log('Task Deleted!')
                };
                break;
        };

        saveDataOnDB(tasks.arrayTasks);

        if (optionSelected !== '0') await pause(); // para que ya no aparezaca el 'Press enter to continue' al elegir el cero

    } while (optionSelected !== '0');
};

main();