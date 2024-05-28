import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodosService, Todo, TodoList } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  getAllTodoLists(): TodoList[] {
    return this.todoService.getAllTodoLists();
  }

  @Post()
  addTodoList(): TodoList {
    return this.todoService.addTodoList();
  }

  @Put(':listId/title')
  updateTodoListTitle(@Param('listId') listId: string, @Body('title') title: string): TodoList {
    return this.todoService.updateTodoListTitle(listId, title);
  }

  @Post(':listId')
  addTodo(@Param('listId') listId: string, @Body() todo: Todo): Todo {
    return this.todoService.addTodo(listId, todo);
  }

  @Put(':listId/:todoIndex')
  updateTodo(@Param('listId') listId: string, @Param('todoIndex') todoIndex: number, @Body() todo: Todo): Todo {
    return this.todoService.updateTodo(listId, todoIndex, todo);
  }

  @Delete(':listId')
  deleteTodoList(@Param('listId') listId: string): TodoList {
    return this.todoService.deleteTodoList(listId);
  }

  @Delete(':listId/:todoIndex')
  deleteTodoFromList(@Param('listId') listId: string, @Param('todoIndex') todoIndex: number): Todo {
    return this.todoService.deleteTodoFromList(listId, todoIndex);
  }
}
