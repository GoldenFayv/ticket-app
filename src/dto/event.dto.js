import { UserDto } from "./user.dto.js";

export class EventDto{
    constructor(event){
        this.id = event.id,
        this.title = event.title,
        this.discription = event.discription,
        this.user = new UserDto(event.user)
    }
}