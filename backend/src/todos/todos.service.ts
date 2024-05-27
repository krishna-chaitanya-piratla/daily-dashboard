import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const TODO_FILE_PATH = path.resolve(__dirname, '../../data/todos.json');

@Injectable()
export class TodosService {
  private todos: any[] = [];

  constructor() {
    this.loadTodos();
  }

  private loadTodos() {
    if (fs.existsSync(TODO_FILE_PATH)) {
      const data = fs.readFileSync(TODO_FILE_PATH, 'utf8');
      this.todos = JSON.parse(data) || [];
    } else {
      this.todos = [];
    }
  }

  private saveTodos() {
    fs.writeFileSync(TODO_FILE_PATH, JSON.stringify(this.todos, null, 2), 'utf8');
  }

  getAllTodos() {
    return this.todos;
  }

  addTodo(todo: any) {
    this.todos.push(todo);
    this.saveTodos();
    return todo;
  }

  updateTodo(index: number, todo: any) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = todo;
      this.saveTodos();
      return todo;
    }
    return null;
  }

  deleteTodo(index: number) {
    if (index >= 0 && index < this.todos.length) {
      const deleted = this.todos.splice(index, 1);
      this.saveTodos();
      return deleted[0];
    }
    return null;
  }

  clearTodos() {
    this.todos = [];
    this.saveTodos();
  }
}
