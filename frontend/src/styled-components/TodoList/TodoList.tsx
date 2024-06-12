import styled from 'styled-components';

export const StyledTodoListWrapper = styled.div`
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 10; /* Ensure it appears above other elements */

  @media (max-width: 1600px) {
    bottom: 0.75rem;
    right: 0.75rem; /* Adjust position for smaller screens */
  }
`;

export const StyledTodoListContainer = styled.div`
  width: 25rem;
  max-height: 35rem;
  overflow: hidden; /* Prevent overflow for the entire container */
  margin: 1.25rem auto;
  text-align: center;
  border: 0.5px solid none;
  border-radius: 10px;
  background-color: var(--widget-background-color);
  color: inherit;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--widget-box-shadow);
  display: flex;
  flex-direction: column; /* Ensure children are arranged vertically */

  .todo-items {
    overflow-y: auto;
    flex-grow: 1; /* Take up remaining space */
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: var(--widget-background-color);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-color);
    border-radius: 10px;
    border: 1px solid var(--widget-background-color);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover-color);
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb-color) var(--widget-background-color);

  /* For IE and older versions of Edge */
  -ms-overflow-style: -ms-autohiding-scrollbar;

  @media (max-width: 1600px) {
    width: 22rem;
    max-height: 30rem; /* Adjust size for smaller screens */
  }
`;
