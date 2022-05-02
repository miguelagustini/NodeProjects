const path = require ('path');
const fs = require ('fs');

class Ticket {
    constructor (numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy= new Date().getDate();
        this.tickets = [];
        this.ultimos4=[];


        this.init();

    }


    //serializar a la hora de guardar en la db
    get toJson(){
       return  {
            utlimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const {hoy,tickets,ultimo,ultimos4} = require ('../db/data.json');
        if (hoy === this.hoy) {                 //si se reincializa y es el mismo dia sigue con los mismos tickets
            this.tickets = tickets;
            this.utlimo =  ultimo;
            this.ultimos4 = ultimos4
        } else {
            //es otro dia
            this.guardarDB();
        }


    }

    guardarDB(){
        const dbPath = path.join (__dirname, '../db/data.json');
        fs.writeFileSync (dbPath, JSON.stringify(this.toJson))

    }


    //siguiente ticket
    siguiente(){
        //Creamos el ticket
        this.ultimo += 1;
        const ticket = new Ticket (this.ultimo, null);
        this.tickets.push(ticket);

        //Lo guardamos en db
        this.guardarDB();  

        //devuelve el numero del ticket
        return 'Ticket ' + ticket.numero; 
     }


     //Retorna un null si no hay tickets o retorna los tickets q el escritorio debe atender
     atenderTicket (escritorio) {
         //No tenemos tickets

         if(this.tickets.length === 0) {
             return null
         }

         const ticket = this.tickets.shift();
         ticket.escritorio = escritorio;

         //añadimos el ticket al comienzo del arreglo
         this.ultimos4.unshift(ticket);

         //validamos que sean 4 tickets y no mas de eso
         if (this.ultimos4.length > 4) {
             this.ultimos4.splice(-1,1);  //borramos al ultimo elemento del arreglo cuando se superan los 4
         }

         this.guardarDB();

         return ticket;
     }



}




module.exports = TicketControl;