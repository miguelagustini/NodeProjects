//Referencias html
const lblEscritorio = document.querySelector ('h1');
const btnAtender = document.querySelector ('button');
const  lblTicket = document.querySelector ('small');
const divAlerta = document.querySelector ('.alert');
const  lblPendientes = document.querySelector ('#lblPendientes');


const searchParams = new URLSearchParams (window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}


divAlerta.style.display = 'none';

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerHTML = escritorio;

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;  //habilitar el boton cuando el servidor esta activo
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;  //deshabilitar el boton cuando el servidor no esta activo

});


socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes===0) {
        lblPendientes.style.display="none"
    } else {
        lblPendientes.style.display=""
        lblPendientes.innerHTML = pendientes;
    }

});


btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket',{escritorio},({ok,ticket})=>{
        if (!ok) {
            lblTicket.innerHTML = 'Nadie';
            return divAlerta.style.display = '';
        }

        lblTicket.innerHTML = 'Ticket ' + ticket.numero;
    })

   /*  socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerHTML = ticket;
    }); */

});

console.log('Nuevo Ticket HTML');