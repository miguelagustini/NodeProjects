const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require ('colors');



const main =async() => {

    let opt = '';
    const tareas = new Tareas ();

    const tareasDB = leerDB();

    if (tareasDB){  //cargar tareas
        tareas.cargarTareasFromArray (tareasDB);
    }


    do {
        //imprimir el menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //crear Opcion
                const desc = await leerInput('Descripcion: ');
                console.log (desc);
                tareas.crearTarea (desc);
            break;

            case '2':  //Listar todas
                tareas.listadoCompleto ();
            break;

            case '3':  //Listar completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':  //Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':  //Completado o pendiente
               const ids = await mostrarListadoCheckList (tareas.listadoArr);
               tareas.toggleCompletadas (ids);
            break;

            case '6': //Borrar
                const id = await listadoTareasBorrar (tareas.listadoArr);
                const ok = await confirmar ('Estas seguro?')
                if (ok){
                    tareas.borrarTarea(id);
                    console.log ('Tarea borrada');
                }

            break;
        }
        guardarDB(tareas.listadoArr)
        await pausa();


    } while (opt!=='0');
}

main();