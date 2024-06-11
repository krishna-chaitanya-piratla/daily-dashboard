import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import TodoItem from './TodoItem';
import TodoListTitle from './TodoListTitle';
import { StyledTodoListContainer, StyledTodoListWrapper } from '../../styled-components/TodoList/TodoList';
import { StyledTodoInputContainer } from '../../styled-components/TodoList/TodoInput';
import TodoInput from './TodoInput';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useStore } from '../../store/StoreProvider';

const TodoList: React.FC = observer(() => {
  const { todoStore } = useStore();

  useEffect(() => {
    if (todoStore.todoLists.length > 0) {
      todoStore.setTodos(todoStore.todoLists[todoStore.activeListIndex]?.todos.sort((a, b) => Number(a.completed) - Number(b.completed)));
      todoStore.setTitle(todoStore.todoLists[todoStore.activeListIndex]?.title);
    } else {
      todoStore.setTodos([]);
      todoStore.setTitle('');
    }
  }, [todoStore.activeListIndex, todoStore.todoLists]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const updatedTodos = arrayMove(
        todoStore.todos,
        todoStore.todos.findIndex((todo) => todo.id === active.id),
        todoStore.todos.findIndex((todo) => todo.id === over.id)
      );
      todoStore.setTodos(updatedTodos);
      await todoStore.reorderTodos(updatedTodos.map((todo) => todo.id));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <StyledTodoListWrapper>
      <StyledTodoListContainer>
        <TodoListTitle />
        {todoStore.todoLists.length === 0 ? (
          <div>
            <p>No todos available. Please add a new todo list.</p>
          </div>
        ) : (
          !todoStore.isMinimized && (
            <>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={todoStore.todos} strategy={verticalListSortingStrategy}>
                  <div className="todo-items">
                    {todoStore.todos.map((todo) => (
                      <TodoItem key={todo.id} id={todo.id} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <StyledTodoInputContainer isEditingTitle={todoStore.isEditingTitle}>
                <TodoInput />
              </StyledTodoInputContainer>
            </>
          )
        )}
      </StyledTodoListContainer>
    </StyledTodoListWrapper>
  );
});

export default TodoList;
