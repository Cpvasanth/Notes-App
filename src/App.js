import React, { useEffect } from 'react';
import './App.css';

const data = [
  { todoItem: 'Buy milk', isChecked: true },
  { todoItem: 'Buy eggs', isChecked: false },
  { todoItem: 'Buy bread', isChecked: false },
];

function App() {
  const [toDo, setTodo] = React.useState(() => {
    // Initialize state from localStorage or use default data
    const savedTodos = localStorage.getItem('toDoList');
    return savedTodos ? JSON.parse(savedTodos) : data;
  });

  // Save to-do list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDo));
  }, [toDo]);

  // Toggle checkbox state
  function handleCheck(index) {
    const updatedTodo = [...toDo];
    updatedTodo[index].isChecked = !updatedTodo[index].isChecked;
    setTodo(updatedTodo);
  }

  // Add a new task with duplicate handling and normalization
  function handleAdd() {
    const fieldValue = document.getElementById('inputToDo').value
      .toLowerCase() // Normalize to lowercase
      .replace(/\s+/g, ' ') // Replace multiple spaces with one
      .trim(); // Trim leading/trailing spaces

    if (!fieldValue) {
      alert('Task cannot be empty');
      return;
    }

    // Check for duplicates
    const isDuplicate = toDo.some(
      (item) => item.todoItem.toLowerCase() === fieldValue
    );

    if (isDuplicate) {
      alert('Task already exists in the list');
      return;
    }

    const newToDo = { todoItem: fieldValue, isChecked: false };
    setTodo([...toDo, newToDo]);

    document.getElementById('inputToDo').value = '';
  }

  // Delete a task
  function handleDelete(index) {
    const updatedTodo = toDo.filter((_, i) => i !== index);
    setTodo(updatedTodo);
  }

  const todolist = toDo.map((item, index) => {
    return (
      <section key={index} className="toDoBox">
        <input
          type="checkbox"
          checked={item.isChecked}
          onChange={() => handleCheck(index)}
        />
        <span
          style={{ textDecoration: item.isChecked ? 'line-through' : 'none' }}
        >
          <label>{item.todoItem}</label>
        </span>
        <button onClick={() => handleDelete(index)} className="trashBtn">
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </section>
    );
  });

  return (
    <div className="App">
      <section className="navBar">
        <i className="fa-regular fa-calendar-plus"></i>
        <h1>To-Do list</h1>
      </section>
      <section className="inputContainer">
        <input
          type="text"
          placeholder="Enter task"
          id="inputToDo"
          className="inputBox"
        />
        <button onClick={handleAdd} className="inputBoxBtn">
          Add
        </button>
      </section>

      {todolist}
    </div>
  );
}

export default App;
