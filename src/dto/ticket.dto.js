class TicketDto{
    constructor(ticket){
        this.id = ticket.id,
        this.name = ticket.name,
        this.description = ticket.description,
        this.price = ticket.price,
        this.quantity_remaining = ticket.quantity - ticket.purchased_quantity
    }
}

export default TicketDto