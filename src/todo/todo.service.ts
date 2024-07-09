import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ToDo } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) { }
  async getAllTodo(userId: string, keyboard: string): Promise<ToDo[]> {
    //
    if (keyboard) {
      console.log("userId", userId)
      const todo = await this.prisma.toDo.findMany({
        where: {
          userId,
          OR: [
            {
              messageText: {
                contains: keyboard,
                mode: 'insensitive'
              },
            },
            {
              title: {
                contains: keyboard,
                mode: 'insensitive'
              }
            }
          ]
        }
      })

      console.log(todo)
      return todo
    }
    return this.prisma.toDo.findMany({
      where: {
        userId
      }
    });
  }

  async getTodoById(id: string): Promise<ToDo> {
    return await this.prisma.toDo.findUnique({ where: { id } });
  }

  async createToDo(todoData: CreateTodoDto): Promise<string> {
    await this.prisma.toDo.create({ data: todoData });
    return 'Tâche ajoutée avec succès!'
  }


  async updateTodo(userId: string, index: string, data: any): Promise<string> {
    console.log("userId", userId)
    console.log("todo id", index)
    console.log("data", data)

    const updateData = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== undefined) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    await this.prisma.toDo.update({
      where: { id: index, userId: userId },
      data: updateData
    })
    return 'Message mis à jour avec succès'
  }



  async deleteMessage(index: string, userId: string): Promise<string> {
    console.log("userId", userId)
    console.log("todo id", index)

    await this.prisma.toDo.delete({
      where: {
        id: index, userId: userId
      }
    });
    return 'Message supprimé avec succès'
  }
}
