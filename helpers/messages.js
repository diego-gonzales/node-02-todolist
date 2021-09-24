require('colors');


// HACIENDOLO SIN INQUIRER

const showMenu = () => {

    return new Promise( (resolve, reject) => {
        console.clear();

        console.log('================'.green)
        console.log('      Menu'.green)
        console.log('================'.green)
    
        console.log(`${'1'.green}. Create task`);
        console.log(`${'2'.green}. List tasks`);
        console.log(`${'3'.green}. List complete tasks`);
        console.log(`${'4'.green}. List pending tasks`);
        console.log(`${'5'.green}. Complete task(s)`);
        console.log(`${'6'.green}. Delete task`);
        console.log(`${'0'.green}. Leave`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('\nSelect an option: ', (answer) => {
            readline.close();
            resolve(answer);
        });
    });

};


const pause = () => {

    return new Promise( (resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPress ${'ENTER'.green} to continue\n`, (answer) => {
            readline.close();
            resolve();
        });
    });

};



module.exports = {
    showMenu,
    pause
}