require ('colors');

const mostrarMenu = ()=>{

    return new Promise (resolve => {
    console.clear();
    console.log ('==========================='.blue);
    console.log ('   Seleccione una opcion'.blue)
    console.log ('===========================\n'.blue);


    console.log (`1. Crear tarea`);
    console.log (`2. Listar tareas`);
    console.log (`3. Listar tareas completadas`);
    console.log (`4. Listar tareas pendientes`);
    console.log (`5. Completar tareas(s)`);
    console.log (`6. Borrar tareas`);
    console.log (`0. Salir \n`);

    const readline = require ('readline').createInterface ({
        input: process.stdin,
        output: process.stdout
    });

    readline.question(`Seleccione la opcion que desea: `,(opt)=> {
        readline.close();
        resolve (opt);
    })
}
    
    )}

const pausa = ()=>{

    return new Promise(resolve=> {

        const readline = require ('readline').createInterface ({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${'ENTER'.blue} para continuar`,(opt)=> {
        readline.close();
        resolve ();
        })
    

    });
}

module.exports = {
    mostrarMenu,
    pausa
}