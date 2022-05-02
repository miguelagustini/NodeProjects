const socket = io();     //De donde viene esta funcion?

//Referencias html
const ticket1html = document.querySelector ('#lblTicket1');
const escritorio1 = document.querySelector ('#lblEscritorio1');

const ticket2html = document.querySelector ('#lblTicket2')
const escritorio2 = document.querySelector ('#lblEscritorio2');

const ticket3html = document.querySelector ('#lblTicket3');
const escritorio3 = document.querySelector ('#lblEscritorio3');

const ticket4html = document.querySelector ('#lblTicket4');
const escritorio4 = document.querySelector ('#lblEscritorio4');



socket.on('ultimos4', (payload) => {
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ticket1,ticket2,ticket3,ticket4] = payload;

    if(ticket1) {}

    ticket1html.innerHTML = 'Ticket '+ticket1.numero;
    escritorio1.innerHTML = 'Escritorio ' +ticket1.escritorio;

    ticket2html.innerHTML = 'Ticket '+ticket2.numero;
    escritorio2.innerHTML = 'Escritorio ' +ticket2.escritorio;

    ticket3html.innerHTML = 'Ticket '+ticket3.numero;
    escritorio3.innerHTML = 'Escritorio ' +ticket3.escritorio;

    ticket4html.innerHTML = 'Ticket '+ticket4.numero;
    escritorio4.innerHTML = 'Escritorio ' +ticket4.escritorio;
});



console.log('Nuevo Ticket HTML');

