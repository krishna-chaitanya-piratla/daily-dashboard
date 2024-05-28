import axios from 'axios';
import { Todo } from '../components/TodoList/TodoList'; // Adjust the import path as necessary

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
      setTodos((prevTodos) => [...prevTodos, response.data]);
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
  index: number,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const updatedTodo = { ...todos[index], completed: !todos[index].completed };
  try {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${index}`, updatedTodo);
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index] = response.data;
      return updatedTodos;
    });
  } catch (error) {
    console.error('There was an error updating the todo!', error);
  }
};

export const deleteTodo = async (
  index: number,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${index}`);
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  } catch (error) {
    console.error('There was an error deleting the todo!', error);
  }
};

export const clearTodos = async (
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}`);
    setTodos([]);
  } catch (error) {
    console.error('There was an error clearing the todos!', error);
  }
};

export const handleTitleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTitle: React.Dispatch<React.SetStateAction<string>>
) => {
  setTitle(e.target.value);
};

export const handleTitleBlur = async (
  title: string,
  listId: string,
  setIsEditingTitle: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsEditingTitle(false);
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/title`, { title });
  } catch (error) {
    console.error('There was an error updating the title!', error);
  }
};
