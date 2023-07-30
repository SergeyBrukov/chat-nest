import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from "socket.io"
import {Prisma} from "@prisma/client";
import {ChatService} from "../chat/chat.service";

@WebSocketGateway()
export class WebSocketChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  constructor(
      private readonly chatService: ChatService
  ) {
  }

  @WebSocketServer() server: Server
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: Prisma.ChatCreateInput): Promise<void> {
    await this.chatService.createMessage(payload)
    this.server.emit("recMessage", payload)
  }

  afterInit(server: any): any {
    console.log(server)
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected ${client.id}`)
  }
}
