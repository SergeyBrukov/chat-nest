import {Controller, Get, Render} from '@nestjs/common';
import {ChatService} from "./chat.service";

@Controller('chat')
export class ChatController {

    constructor(
        private readonly chatService: ChatService
    ) {
    }

    @Get()
    getMessages() {
        return this.chatService.getMessages()
    }
}
