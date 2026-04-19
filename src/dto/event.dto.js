import TicketDto from "./ticket.dto.js";
import UserDto from "./user.dto.js";
export class EventDto {
  constructor(event) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.city = event.city;
    this.date = event.date;
    this.isPublished = event.isPublished;
    this.user = new UserDto(event.user);
    this.tickets = event.tickets?.map((ticket) => new TicketDto(ticket)) ?? [];
  }
}

export default EventDto;
