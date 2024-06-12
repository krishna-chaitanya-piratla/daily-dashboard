import { makeAutoObservable } from 'mobx';
import axios from 'axios';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoListType {
  id: string;
  title: string;
  todos: Todo[];
}

class TodoStore {
  todoLists: TodoListType[] = [];
  activeListIndex: number = 0;
  newTodo: string = '';
  title: string = '';
  isEditingTitle: boolean = false;
  isMinimized: boolean = false;
  previousTitle: string = '';
  originalTitle: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTodoLists() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos`);
      this.todoLists = response.data;
    } catch (error) {
      console.error('There was an error fetching the todo lists!', error);
    }
  }

  async addTodoList() {
    const newList = { title: 'New List', todos: [] };
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos`, newList);
      this.todoLists.push(response.data);
      this.activeListIndex = this.todoLists.length - 1;
      this.setTitle('New List'); // Set the title for the new list
    } catch (error) {
      console.error('There was an error adding the todo list!', error);
    }
  }

  async removeTodoList(listId: string) {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}`);
      this.todoLists = this.todoLists.filter(list => list.id !== listId);
      this.activeListIndex = 0;
    } catch (error) {
      console.error('There was an error removing the todo list!', error);
    }
  }

  async addTodo() {
    if (this.newTodo.trim()) {
      const todo = { text: this.newTodo, completed: false };
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos/${this.activeListId}`, todo);
        this.todos.push(response.data);
        this.sortTodos();
        this.newTodo = '';
      } catch (error) {
        console.error('There was an error adding the todo!', error);
      }
    }
  }

  async toggleTodo(todoId: string) {
    const todo = this.todos.find(t => t.id === todoId);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${this.activeListId}/${todoId}`, updatedTodo);
        this.updateTodoInList(response.data);
      } catch (error) {
        console.error('There was an error updating the todo!', error);
      }
    }
  }

  async deleteTodo(todoId: string) {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${this.activeListId}/${todoId}`);
      this.todos = this.todos.filter(t => t.id !== todoId);
    } catch (error) {
      console.error('There was an error deleting the todo!', error);
    }
  }

  async clearTodos() {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${this.activeListId}/clear`);
      this.todos = [];
    } catch (error) {
      console.error('There was an error clearing the todos!', error);
    }
  }

  async reorderTodos(todoIds: string[]) {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${this.activeListId}/reorder`, { todoIds });
    } catch (error) {
      console.error('There was an error reordering the todos!', error);
    }
  }

  async handleTitleBlur() {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${this.activeListId}/title`, { title: this.title });
      this.updateTitleInList(this.title);
    } catch (error) {
      console.error('There was an error updating the title!', error);
    } finally {
      this.isEditingTitle = false;
    }
  }

  async editTodo(todoId: string, newText: string) {
    const todo = this.todos.find(t => t.id === todoId);
    if (todo) {
      const updatedTodo = { ...todo, text: newText };
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${this.activeListId}/${todoId}`, updatedTodo);
        this.updateTodoInList(response.data);
      } catch (error) {
        console.error('There was an error updating the todo!', error);
      }
    }
  }

  handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.title = e.target.value;
  }

  setIsEditingTitle(value: boolean) {
    this.isEditingTitle = value;
  }

  setIsMinimized(value: boolean) {
    this.isMinimized = value;
  }

  setActiveListIndex(index: number) {
    this.activeListIndex = index;
  }

  setNewTodo(value: string) {
    this.newTodo = value;
  }

  setPreviousTitle(title: string) {
    this.previousTitle = title;
  }

  setOriginalTitle(title: string) {
    this.originalTitle = title;
  }

  setTitle(value: string) {
    this.title = value;
  }

  setTodos(updatedTodos: Todo[]) {
    if (this.todoLists[this.activeListIndex]) {
      this.todoLists[this.activeListIndex].todos = updatedTodos;
    }
  }

  get activeListId() {
    return this.todoLists[this.activeListIndex]?.id || '';
  }

  get todos() {
    return this.todoLists[this.activeListIndex]?.todos || [];
  }

  set todos(updatedTodos: Todo[]) {
    if (this.todoLists[this.activeListIndex]) {
      this.todoLists[this.activeListIndex].todos = updatedTodos;
    }
  }

  private sortTodos() {
    this.todos = this.todos.sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  private updateTodoInList(updatedTodo: Todo) {
    this.todos = this.todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t));
    this.sortTodos();
  }

  private updateTitleInList(updatedTitle: string) {
    this.todoLists = this.todoLists.map(list => (list.id === this.activeListId ? { ...list, title: updatedTitle } : list));
  }
}

export default TodoStore;
