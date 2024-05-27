import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TodosService {
  private todos: any[] = [];
  private TODO_FILE_PATH: string;

  constructor(private configService: ConfigService) {
    const DATA_LOCATION = this.configService.get<string>('DATA_LOCATION_LOCAL');

    this.TODO_FILE_PATH = path.resolve(DATA_LOCATION, 'todos.json');
    this.ensureDataFileExists();
    this.loadTodos();
  }

  private ensureDataFileExists() {
    const dirPath = path.dirname(this.TODO_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(this.TODO_FILE_PATH)) {
      fs.writeFileSync(this.TODO_FILE_PATH, '[]', 'utf8');
    }
  }

  private loadTodos() {
    const data = fs.readFileSync(this.TODO_FILE_PATH, 'utf8');
    this.todos = JSON.parse(data) || [];
  }

  private saveTodos() {
    fs.writeFileSync(this.TODO_FILE_PATH, JSON.stringify(this.todos, null, 2), 'utf8');
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
