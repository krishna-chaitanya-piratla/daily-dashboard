// src/todo/todo.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  addTodo(@Body() todo: any) {
    return this.todoService.addTodo(todo);
  }

  @Put(':index')
  updateTodo(@Param('index') index: number, @Body() todo: any) {
    return this.todoService.updateTodo(index, todo);
  }

  @Delete(':index')
  deleteTodo(@Param('index') index: number) {
    return this.todoService.deleteTodo(index);
  }

  @Delete()
  clearTodos() {
    this.todoService.clearTodos();
  }
}
