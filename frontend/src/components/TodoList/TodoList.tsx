import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoListTitle from './TodoListTitle';
import { StyledTodoListContainer, StyledTodoListWrapper } from '../../styled-components/TodoList/TodoList';
import { StyledTodoInputContainer } from '../../styled-components/TodoList/TodoInput';
import TodoInput from './TodoInput';
import {
  handleKeyDown,
  toggleTodo,
  deleteTodo,
  clearTodos,
  handleTitleChange,
  handleTitleBlur,
  editTodo,
  deleteTodoList,
  reorderTodos
} from '../../utils/todoFunctions';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

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

interface TodoListProps {
  todoLists: TodoListType[];
  removeTodoList: (listId: string) => void;
  addTodoList: () => void;
  setTodoLists: React.Dispatch<React.SetStateAction<TodoListType[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todoLists, removeTodoList, addTodoList, setTodoLists }) => {
  const [activeListIndex, setActiveListIndex] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [title, setTitle] = useState<string>(todoLists[0]?.title || '');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    if (todoLists.length > 0) {
      setTodos(todoLists[activeListIndex]?.todos.sort((a, b) => Number(a.completed) - Number(b.completed)));
      setTitle(todoLists[activeListIndex]?.title);
    } else {
      setTodos([]);
      setTitle('');
    }
  }, [activeListIndex, todoLists]);

  const handleEditTodo = (todoId: string, newText: string) => {
    editTodo(todoId, newText, todos, todoLists[activeListIndex]?.id || '', setTodos, setTodoLists, todoLists);
  };

  const handleDeleteTodoList = async () => {
    const nextIndex = (activeListIndex + 1) % todoLists.length;
    await deleteTodoList(todoLists[activeListIndex].id);
    removeTodoList(todoLists[activeListIndex].id);
    if (todoLists.length > 1) {
      setActiveListIndex(nextIndex);
    } else {
      setActiveListIndex(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const updatedTodos = arrayMove(
        todos,
        todos.findIndex((todo) => todo.id === active.id),
        todos.findIndex((todo) => todo.id === over.id)
      );
      setTodos(updatedTodos);

      // Save the updated order to the backend
      await reorderTodos(todoLists[activeListIndex]?.id || '', updatedTodos.map((todo) => todo.id), setTodoLists, todoLists);
    }
  };

  return (
    <StyledTodoListWrapper>
      <StyledTodoListContainer>
        <TodoListTitle
          title={title || "Todos"}
          isEditingTitle={isEditingTitle}
          isMinimized={isMinimized}
          setIsEditingTitle={setIsEditingTitle}
          toggleMinimize={toggleMinimize}
          handleTitleChange={(e) => handleTitleChange(e, setTitle)}
          handleTitleBlur={() => handleTitleBlur(title, todoLists[activeListIndex]?.id || '', setIsEditingTitle, todoLists, setTodoLists)}
          clearTodos={() => clearTodos(todoLists[activeListIndex]?.id || '', setTodos, setTodoLists, todoLists)}
          deleteTodoList={todoLists.length > 0 ? handleDeleteTodoList : undefined}
          addTodoList={addTodoList}
          todoLists={todoLists}
          setActiveListIndex={setActiveListIndex}
          setTodoLists={setTodoLists}
        />
        {todoLists.length === 0 ? (
          <div>
            <p>No todos available. Please add a new todo list.</p>
          </div>
        ) : (
          !isMinimized && (
            <>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                  <div className="todo-items">
                    {todos.map((todo, index) => (
                      <TodoItem
                        key={todo.id}
                        id={todo.id}
                        todo={todo.text}
                        completed={todo.completed}
                        onToggle={() => toggleTodo(todo.id, todos, todoLists[activeListIndex]?.id || '', setTodos, setTodoLists, todoLists)}
                        onDelete={() => deleteTodo(todo.id, todos, todoLists[activeListIndex]?.id || '', setTodos, setTodoLists, todoLists)}
                        onEdit={(newText) => handleEditTodo(todo.id, newText)}
                        isEditingTitle={isEditingTitle}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <StyledTodoInputContainer isEditingTitle={isEditingTitle}>
                <TodoInput
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(event) => handleKeyDown(event, newTodo, todoLists[activeListIndex]?.id || '', setTodos, setNewTodo, setTodoLists, todoLists)}
                  placeholder="Add a new to-do"
                  disabled={isEditingTitle}
                />
              </StyledTodoInputContainer>
            </>
          )
        )}
      </StyledTodoListContainer>
    </StyledTodoListWrapper>
  );
};

export default TodoList;
