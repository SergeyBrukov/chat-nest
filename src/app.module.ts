import {Module} from '@nestjs/common';
import {PrismaService} from './prisma/prisma.service';
import {WebSocketChatGateway} from './web-socket-chat/web-socket-chat.gateway';
import {ChatModule} from './chat/chat.module';

@Module({
    imports: [ChatModule],
    controllers: [],
    providers: [PrismaService, WebSocketChatGateway],
})
export class AppModule {
}