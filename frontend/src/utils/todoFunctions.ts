import axios from 'axios';
import { Todo, TodoListType } from '../components/TodoList/TodoList'; // Adjust the import path as necessary

export const addTodo = async (
  newTodo: string,
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTodo: React.Dispatch<React.SetStateAction<string>>,
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>,
  todoLists: TodoListType[]
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
      
      // Update the todoLists state
      setTodoLists(prevTodoLists =>
        prevTodoLists.map(list =>
          list.id === listId ? { ...list, todos: [...list.todos, response.data] } : list
        )
      );
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
  setNewTodo: React.Dispatch<React.SetStateAction<string>>,
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>,
  todoLists: TodoListType[]
) => {
  if (event.key === 'Enter') {
    addTodo(newTodo, listId, setTodos, setNewTodo, setTodoLists, todoLists);
  }
};

export const toggleTodo = async (
  todoId: string,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>,
  todoLists: TodoListType[]
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

      // Update the todoLists state
      setTodoLists(prevTodoLists =>
        prevTodoLists.map(list =>
          list.id === listId ? { ...list, todos: list.todos.map(t => t.id === todoId ? response.data : t) } : list
        )
      );
    } catch (error) {
      console.error('There was an error updating the todo!', error);
    }
  }
};

export const deleteTodo = async (
  todoId: string,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>,
  todoLists: TodoListType[]
) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/${todoId}`);
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter(t => t.id !== todoId);
      return updatedTodos;
    });

    // Update the todoLists state
    setTodoLists(prevTodoLists =>
      prevTodoLists.map(list =>
        list.id === listId ? { ...list, todos: list.todos.filter(t => t.id !== todoId) } : list
      )
    );
  } catch (error) {
    console.error('There was an error deleting the todo!', error);
  }
};

export const clearTodos = async (
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>,
  todoLists: TodoListType[]
) => {
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/clear`);
    setTodos([]);

    // Update the todoLists state
    setTodoLists(prevTodoLists =>
      prevTodoLists.map(list =>
        list.id === listId ? { ...list, todos: [] } : list
      )
    );
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
  setIsEditingTitle: React.Dispatch<React.SetStateAction<boolean>>,
  todoLists: TodoListType[],
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>
) => {
  setIsEditingTitle(false);
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/title`, { title });
    
    // Update the title in the todoLists state
    setTodoLists(prevTodoLists =>
      prevTodoLists.map(list =>
        list.id === listId ? { ...list, title } : list
      )
    );
  } catch (error) {
    console.error('There was an error updating the title!', error);
  }
};

export const editTodo = async (
  todoId: string,
  newText: string,
  todos: Todo[],
  listId: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>,
  todoLists: TodoListType[]
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

      // Update the todoLists state
      setTodoLists(prevTodoLists =>
        prevTodoLists.map(list =>
          list.id === listId ? { ...list, todos: list.todos.map(t => t.id === todoId ? response.data : t) } : list
        )
      );
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

export const reorderTodos = async (
  listId: string,
  todoIds: string[],
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>,
  todoLists: TodoListType[]
) => {
  try {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todos/${listId}/reorder`, { todoIds });

    // Update the todoLists state
    const updatedTodos = todoIds.map(id => todoLists.find(list => list.id === listId)?.todos.find(todo => todo.id === id)!);
    setTodoLists(prevTodoLists =>
      prevTodoLists.map(list =>
        list.id === listId ? { ...list, todos: updatedTodos } : list
      )
    );
  } catch (error) {
    console.error('There was an error reordering the todos!', error);
  }
};
