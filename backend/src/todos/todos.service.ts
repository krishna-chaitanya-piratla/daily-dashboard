import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  todos: Todo[];
}

@Injectable()
export class TodosService {
  private todoLists: TodoList[] = [];
  private TODO_FILE_PATH: string;

  constructor(private configService: ConfigService) {
    const DATA_LOCATION = this.configService.get<string>('DATA_LOCATION_LOCAL');
    this.TODO_FILE_PATH = path.resolve(DATA_LOCATION, 'todos.json');
    this.ensureDataFileExists();
    this.loadTodoLists();
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

  private loadTodoLists() {
    const data = fs.readFileSync(this.TODO_FILE_PATH, 'utf8');
    this.todoLists = JSON.parse(data) || [];
  }

  private saveTodoLists() {
    fs.writeFileSync(this.TODO_FILE_PATH, JSON.stringify(this.todoLists, null, 2), 'utf8');
  }

  getAllTodoLists(): TodoList[] {
    return this.todoLists;
  }

  addTodoList(): TodoList {
    const newList: TodoList = { id: uuidv4(), title: 'New List', todos: [] };
    this.todoLists.push(newList);
    this.saveTodoLists();
    return newList;
  }

  updateTodoListTitle(listId: string, title: string): TodoList {
    const list = this.todoLists.find(list => list.id === listId);
    if (list) {
      list.title = title;
      this.saveTodoLists();
      return list;
    }
    return null;
  }

  addTodo(listId: string, todo: Todo): Todo {
    const list = this.todoLists.find(list => list.id === listId);
    if (list) {
      list.todos.push(todo);
      this.saveTodoLists();
      return todo;
    }
    return null;
  }

  updateTodo(listId: string, todoIndex: number, todo: Todo): Todo {
    const list = this.todoLists.find(list => list.id === listId);
    if (list && todoIndex >= 0 && todoIndex < list.todos.length) {
      list.todos[todoIndex] = todo;
      this.saveTodoLists();
      return todo;
    }
    return null;
  }

  deleteTodoList(listId: string): TodoList {
    const index = this.todoLists.findIndex(list => list.id === listId);
    if (index >= 0) {
      const deletedList = this.todoLists.splice(index, 1);
      this.saveTodoLists();
      return deletedList[0];
    }
    return null;
  }

  deleteTodoFromList(listId: string, todoIndex: number): Todo {
    const list = this.todoLists.find(list => list.id === listId);
    if (list && todoIndex >= 0 && todoIndex < list.todos.length) {
      const deleted = list.todos.splice(todoIndex, 1);
      this.saveTodoLists();
      return deleted[0];
    }
    return null;
  }
}
