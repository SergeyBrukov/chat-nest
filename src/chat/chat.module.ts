import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import {PrismaService} from "../prisma/prisma.service";
import { ChatController } from './chat.controller';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'views'), // Вказуємо шлях до папки зі статичними HTML-файлами
      serveRoot: '/', // Зв'язуємо ServeStaticModule з кореневим URL (/) для статичних HTML-файлів
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'static', 'js'), // Вказуємо шлях до папки зі статичними JS-файлами
      serveRoot: '/static/js', // Зв'язуємо ServeStaticModule з URL /static/js для статичних JS-файлів
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'static', 'css'), // Вказуємо шлях до папки зі статичними CSS-файлами
      serveRoot: '/static/css', // Зв'язуємо ServeStaticModule з URL /static/css для статичних CSS-файлів
    }),
  ],
  providers: [ChatService, PrismaService],
  exports: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
