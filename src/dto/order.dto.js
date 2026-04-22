import EventDto from "./event.dto.js";
import UserDto from "./user.dto.js";
import OrderItemDto from "./order.item.dto.js";

class OrderDto {
  constructor(order) {
    this.id = order.id;
    this.reference = order.reference;
    this.buyer_name = order.buyer_name;
    this.buyer_email = order.buyer_email;
    this.buyer_phone = order.buyer_phone;
    this.total_amount = order.total_amount;
    this.payment_status = order.payment_status;
    this.paidAt = order.paidAt;
    this.event = order.event ? new EventDto(order.event) : null;
    this.user = order.user ? new UserDto(order.user) : null;
    this.items = order.items?.map((item) => new OrderItemDto(item)) ?? [];
  }
}

export default OrderDto;