const inquirer = require ('inquirer');
require ('colors');

const preguntas = [
{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'1'.blue}. Buscar ciudad`
        },

        {
            value: 2,
            name: `${'2'.blue}. Historial`
        },

        {
            value: 0,
            name: `${'0'.blue}. Salir`
        },
    ]
}];

const inquirerMenu = async() => {
    console.clear();
    console.log ('==========================='.blue);
    console.log ('   Seleccione una opcion'.blue)
    console.log ('===========================\n'.blue);

    const {opcion} = await inquirer.prompt (preguntas);
    return opcion;
}

const pausa = async()=>{
    const question = [
        {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
        }
    ];
    await inquirer.prompt (question);
}

const leerInput = async(mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            massage: mensaje,
            validate (value) {
                if (value.length ===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
const {desc} = await inquirer.prompt (question);
return desc;

}

const listarLugares = async(lugares= []) => {
    
    const choices = lugares.map ((lugar, i) => {
        const idx = `${i +1}`.green;

        return {
        value: lugar.id,
        name: ` ${idx} ${lugar.nombre}`
    }
});

choices.unshift ({
    value: '0',
    name: '0.'.blue + ' Cancelar'
})

const preguntas = [{
    type: 'list',
    name: 'id',
    message: 'Seleccione lugar:',
    choices
}]

const {id} = await inquirer.prompt (preguntas);
return id;
}





const confirmar = async(message)=> {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok}= await inquirer.prompt (pregunta);
    return ok;
}


const mostrarListadoCheckList = async(tareas= []) => {
    
    const choices = tareas.map ((tarea, i) => {
        const idx = `${i +1}`.green;

        return {
        value: tarea.id,
        name: ` ${idx}. ${tarea.desc}`,
        checked: (tarea.completadoEn) ?true :false
    }
});

const pregunta = [{
    type: 'checkbox',
    name: 'ids',
    message: 'Selecciones',
    choices
}]

const {ids} = await inquirer.prompt (pregunta);
return ids;
}

module.exports= {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}
