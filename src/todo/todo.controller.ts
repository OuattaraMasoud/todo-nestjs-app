import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDo } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import path from 'path';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@ApiTags('todo')
@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  async getAllMessages(@Req() req: any, @Query('keyboard') keyboard: string): Promise<ToDo[]> {
    console.log("Request =>", req.user);

    return await this.todoService.getAllTodo(req.user.id, keyboard);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({ status: 200, description: 'The todo', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async getTodoById(@Param('id') id: string): Promise<ToDo> {
    return await this.todoService.getTodoById(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'The todo has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createTodo(@Body() data: CreateTodoDto): Promise<string> {
    return await this.todoService.createToDo(data);
  }


  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() data: any, @Req() req: any): Promise<string> {
    return await this.todoService.updateTodo(req.user.id, id, data);
  }

  // @Get()
  // async searchToDo(@Query('keyboard') keyboard: string): Promise<ToDo[]> {
  //   console.log(await this.todoService.searchToDo(keyboard))
  //   return await this.todoService.searchToDo(keyboard);
  // }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Req() req: any): Promise<string> {
    return await this.todoService.deleteMessage(id, req.user.id);
  }
}
