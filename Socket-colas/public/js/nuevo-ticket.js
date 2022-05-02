//Referencias html
const lblNuevoTicket = document.querySelector ('#lblNuevoTicket')
const btnCrear = document.querySelector ('button')


const socket = io();                 //De donde viene esta funcion?




socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;  //habilitar el boton cuando el servidor esta activo
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;  //deshabilitar el boton cuando el servidor no esta activo

});


socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerHTML = 'Ticket ' + ultimo;
});


btnCrear.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerHTML = ticket;
    });

});

console.log('Nuevo Ticket HTML');