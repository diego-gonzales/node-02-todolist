const Task = require("./task");


class Tasks {
    _list = {};

    get arrayTasks() {
        return Object.values(this._list);
    };

    constructor() {
        this._list = {};
    };

    createTask(description = '') {
        const task = new Task(description);
        this._list[task.id] = task; // crea un obj de la siguiente forma: { '131-eaea21-123': Task { id: '131-eaea21-123', 'desc': '', 'completeAt': ''}}
    };

    loadTasksFromData(data = []) {
        data.forEach( task => {
            // const task = new Task(tareita.description);
            this._list[task.id] = task;
        })
    };

    listTasks() {
        this.arrayTasks.forEach((task, index) => {
            const i = `${index + 1}`.green;
            const { description, completeAt } = task;

            const state = (completeAt)
                                ? 'Complete'.green
                                : 'Pending'.red;

            console.log(`${i}. ${description} :: ${state}`);
        });
    };

    listTasksCompletesOrPendings( showTasksCompletes ) {
        console.log();
        let contador = 0;
        this.arrayTasks.forEach((task, index) => {
            
            const { description, completeAt } = task;

            if (showTasksCompletes) {
                if (completeAt) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${description} :: ${completeAt.green}`);
                };
            } else {
                if (!completeAt) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${description} :: ${'Pending'.red}`);
                };
            };
        });
    };

    deleteTask( id ) {
        if (this._list[id]) {
            delete this._list[id];
        };
    };

    markTasksAsCompleted( ids = [] ) {
        ids.forEach( id => {
            const task = this._list[id];
            if ( !task.completeAt ) task.completeAt = new Date().toISOString(); 
        });

        this.arrayTasks.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                const task = this._list[tarea.id];
                task.completeAt = null;
            };
        });
    };

};


module.exports = Tasks;