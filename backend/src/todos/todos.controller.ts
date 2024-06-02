import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodosService, Todo, TodoList } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  getAllTodoLists(): TodoList[] {
    const lists = this.todoService.getAllTodoLists();
    return lists;
  }

  @Post()
  addTodoList(): TodoList {
    const newList = this.todoService.addTodoList();
    return newList;
  }

  @Put(':listId/clear')
  clearTodoList(@Param('listId') listId: string): TodoList {
    const clearedList = this.todoService.clearTodoList(listId);
    return clearedList;
  }

  @Put(':listId/reorder')
  async reorderTodos(@Param('listId') listId: string, @Body() body: { todoIds: string[] }): Promise<void> {
    await this.todoService.reorderTodos(listId, body.todoIds);
  }

  @Put(':listId/title')
  updateTodoListTitle(@Param('listId') listId: string, @Body('title') title: string): TodoList {
    const updatedList = this.todoService.updateTodoListTitle(listId, title);
    return updatedList;
  }

  @Post(':listId')
  addTodo(@Param('listId') listId: string, @Body() todo: Omit<Todo, 'id'>): Todo {
    const newTodo = this.todoService.addTodo(listId, todo);
    return newTodo;
  }

  @Put(':listId/:todoId')
  updateTodo(@Param('listId') listId: string, @Param('todoId') todoId: string, @Body() todo: Omit<Todo, 'id'>): Todo {
    const updatedTodo = this.todoService.updateTodo(listId, todoId, todo);
    return updatedTodo;
  }

  @Delete(':listId/:todoId')
  deleteTodoFromList(@Param('listId') listId: string, @Param('todoId') todoId: string): Todo {
    const deletedTodo = this.todoService.deleteTodoFromList(listId, todoId);
    return deletedTodo;
  }

  @Delete(':listId')
  deleteTodoList(@Param('listId') listId: string): TodoList {
    const deletedList = this.todoService.deleteTodoList(listId);
    return deletedList;
  }


}
