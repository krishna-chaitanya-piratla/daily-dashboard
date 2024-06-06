import axios from 'axios';
import { Todo, TodoListType } from '../components/TodoList/TodoList'; // Adjust the import path as necessary

export const addTodo = async (
  newTodo: string,
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTodo: React.Dispatch<React.SetStateAction<string>>
) => {
  if (newTodo.trim()) {
    const todo = { text: newTodo, completed: false };
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}`, todo);
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, response.data].sort((a, b) => Number(a.completed) - Number(b.completed));
        return updatedTodos;
      });
      setNewTodo('');
    } catch (error) {
      console.error('There was an error adding the todo!', error);
    }
  }
};

export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  newTodo: string,
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTodo: React.Dispatch<React.SetStateAction<string>>
) => {
  if (event.key === 'Enter') {
    addTodo(newTodo, listId, setTodos, setNewTodo);
  }
};

export const toggleTodo = async (
  todoId: string,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const todo = todos.find(t => t.id === todoId);
  if (todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${todoId}`, updatedTodo);
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map(t => (t.id === todoId ? response.data : t)).sort((a, b) => Number(a.completed) - Number(b.completed));
        return updatedTodos;
      });
    } catch (error) {
      console.error('There was an error updating the todo!', error);
    }
  }
};

export const deleteTodo = async (
  todoId: string,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${todoId}`);
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter(t => t.id !== todoId);
      return updatedTodos;
    });
  } catch (error) {
    console.error('There was an error deleting the todo!', error);
  }
};

export const clearTodos = async (
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/clear`);
    setTodos([]);
  } catch (error) {
    console.error('There was an error clearing the todos!', error);
  }
};

export const handleTitleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTitle: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log("handleTitleChange - New title:", e.target.value);
  setTitle(e.target.value);
};

export const handleTitleBlur = async (
  title: string,
  listId: string,
  setIsEditingTitle: React.Dispatch<React.SetStateAction<boolean>>,
  todoLists: TodoListType[],
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>
) => {
  try {
    console.log("handleTitleBlur - Saving title:", title, "for listId:", listId);
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/title`, { title });
    
    // Update the title in the todoLists state
    setTodoLists(prevTodoLists => {
      const updatedTodoLists = prevTodoLists.map(list =>
        list.id === listId ? { ...list, title } : list
      );
      console.log("Updated todoLists:", updatedTodoLists);
      return updatedTodoLists;
    });
  } catch (error) {
    console.error('There was an error updating the title!', error);
  } finally {
    setIsEditingTitle(false);
  }
};

export const editTodo = async (
  todoId: string,
  newText: string,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const todo = todos.find(t => t.id === todoId);
  if (todo) {
    const updatedTodo = { ...todo, text: newText };
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${todoId}`, updatedTodo);
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map(t => (t.id === todoId ? response.data : t)).sort((a, b) => Number(a.completed) - Number(b.completed));
        return updatedTodos;
      });
    } catch (error) {
      console.error('There was an error updating the todo!', error);
    }
  }
};

export const deleteTodoList = async (
  listId: string
) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}`);
    // You can also add any additional cleanup logic here if necessary
  } catch (error) {
    console.error('There was an error deleting the todo list!', error);
  }
};

export const reorderTodos = async (listId: string, todoIds: string[]) => {
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/reorder`, { todoIds });
  } catch (error) {
    console.error('There was an error reordering the todos!', error);
  }
};
