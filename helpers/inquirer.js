require('colors');
const inquirer = require('inquirer');

// HACIENDOLO CON INQUIRER, YA QUE ESTA LIBRERIA ME PERMITE HACER VALIDACIONES Y MÁS
const inquirerMenu = async() => {
    // console.clear();

    console.log('================'.green);
    console.log('      Menu'.white);
    console.log('================'.green);

    const menu = [
        {
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: [
                {
                    value: '1',
                    name: `${'1'.green}. Create task`,
                },
                {
                    value: '2',
                    name: `${'2'.green}. List tasks`,
                },
                {
                    value: '3',
                    name: `${'3'.green}. List complete tasks`,
                },
                {
                    value: '4',
                    name: `${'4'.green}. List pending tasks`,
                },
                {
                    value: '5',
                    name: `${'5'.green}. Complete task(s)`,
                },
                {
                    value: '6',
                    name: `${'6'.green}. Delete task`,
                },
                {
                    value: '0',
                    name: `${'0'.green}. Leave`
                }
            ]
        }
    ];

    const { option } = await inquirer.prompt(menu);
    return option;
};


const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'continue_enter',
            message: `Press ${'ENTER'.green} to continue`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
};

// Funciones para algunas opciones del menú
const readInputForCreateTask = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.trim().length === 0) return 'Please enter a valid description';

                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);
    return description;
};


const showOptionsOfTasksToDelete = async (tasks = []) => {
    const choices = tasks.map( (task, index) => {
        return {
            value: task.id,
            name: `${(index + 1).toString().green}. ${task.description}`
        };
    });

    choices.push({
        value: '0',
        name: `${'0. Cancel'.blue}`
    });

    const list = [
        {
            type: 'list',
            name: 'optionSelected',
            message: 'What task do you want to delete?',
            choices
        }
    ];

    const { optionSelected } = await inquirer.prompt(list);
    return optionSelected;
};


const confirm = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'answer',
            message
        }
    ];

    const { answer } = await inquirer.prompt(question);
    return answer; // puede ser true o false
};


const checkboxTasks = async (tareas = []) => {
    const choices = tareas.map( task => {
        return {
            value: task.id,
            name: task.description,
            checked: (task.completeAt) ? true : false
        };
    });

    const options = [
        {
            type: 'checkbox',
            message: 'Mark your complete tasks',
            name: 'ids',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(options);
    return ids;
};


module.exports = {
    inquirerMenu,
    pause,
    readInputForCreateTask,
    showOptionsOfTasksToDelete,
    confirm,
    checkboxTasks
}