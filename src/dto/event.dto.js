import TicketDto from "./ticket.dto.js";
import UserDto from "./user.dto.js";

class EventDto {
  constructor(event) {
    ((this.id = event.id),
      (this.title = event.title),
      (this.discription = event.discription),
      (this.user = new UserDto(event.user)));
    this.tickets = new TicketDto(event.tickets);
  }
}

export default EventDto;
