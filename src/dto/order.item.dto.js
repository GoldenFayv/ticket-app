import OrderDto from "./order.dto.js";
import TicketTypeDto from "./ticket.type.dto.js";
class OrderItemDto{
    constructor(item){
        this.id = item.id,
        this.quantity = item.quantity,
        this.unit_price = item.unit_price,
        this.total_price = item.total_price,
        this.ticket_type = item.ticket_type ? new TicketTypeDto(item.ticket_type) : null,
        this.order = item.order ? new OrderDto(item.order) : null
    }
}

export default OrderItemDto;