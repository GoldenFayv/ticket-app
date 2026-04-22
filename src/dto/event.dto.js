import TicketTypeDto from "./ticket.type.dto.js";
import UserDto from "./user.dto.js";
export class EventDto {
  constructor(event) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.city = event.city;
    this.date = event.date;
    this.isPublished = event.isPublished;
    this.user = event.user ? new UserDto(event.user) : null;
    this.ticket_types = event.ticket_types?.map((ticket) => new TicketTypeDto(ticket)) ?? [];
  }
}

export default EventDto;
