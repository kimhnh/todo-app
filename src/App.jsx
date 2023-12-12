import { useState } from 'react';

// Dummy TODO List
const todoList = [
  { id: 1, todo: 'wash dishes', status: false },
  { id: 2, todo: 'go to the bank', status: false },
  { id: 3, todo: 'clean bathroom', status: false },
];

// Dummy Notes List
const notesList = [
  { id: 1, note: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, deleniti.' },
  {
    id: 2,
    note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta obcaecati nihil veniam asperiores quaerat repellat eligendi officia, modi voluptatem corporis molestiae fugiat cupiditate libero nisi, autem atque. Magni, quasi sint.',
  },
  { id: 3, note: 'Lorem ipsum dolor sit amet.' },
];

export default function App() {
  const [list, setList] = useState(todoList);
  const [toggleStatus, setToggleStatus] = useState(null);

  // Add new item (obj) to array via spread
  function handleAddItem(item) {
    setList((list) => [...list, item]);
  }

  // Update via map + spread
  function handleToggle(item) {
    setList((list) => list.map((i) => (i.id === item.id ? { ...i, status: !i.status } : i)));
    setToggleStatus((s) => (s?.id === item.id ? null : item));
  }

  // Delete via filter
  function handleDeleteItem(item) {
    setList((list) => list.filter((i) => item.id !== i.id));
    setToggleStatus((s) => s.id === item.id && null);
  }

  return (
    <>
      <Header />
      <main>
        <div className="todo-list">
          <TodoForm onAddItem={handleAddItem} />
          <TodoList
            todos={list}
            onToggleStatus={handleToggle}
            onDeleteItem={handleDeleteItem}
            toggleStatus={toggleStatus}
          />
        </div>
        <div className="notes">
          <NotesForm />
          <NoteList />
        </div>
      </main>
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>TODO LIST</h1>
    </header>
  );
}

function TodoForm({ onAddItem }) {
  const [todo, setTodo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // guard clause
    if (!todo) return;
    const newItem = { id: crypto.randomUUID(), todo, status: false };
    onAddItem(newItem);
    setTodo('');
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>+</button>
    </form>
  );
}

function TodoList({ todos, onToggleStatus, onDeleteItem, toggleStatus }) {
  return (
    <ul>
      {todos.map((i) => (
        <TodoItem
          key={i.id}
          item={i}
          onToggleStatus={onToggleStatus}
          onDeleteItem={onDeleteItem}
          toggleStatus={toggleStatus}
        ></TodoItem>
      ))}
    </ul>
  );
}

function TodoItem({ item, onToggleStatus, onDeleteItem, toggleStatus }) {
  const isWorking = toggleStatus?.id === item.id;
  return (
    <li>
      {isWorking ? <p className="working-on">👉{item.todo}👈</p> : <p>{item.todo}</p>}
      <button onClick={() => onToggleStatus(item)}>Working on it</button>
      <button onClick={() => onDeleteItem(item)}>X</button>
    </li>
  );
}

// Re-use Form Component with children?
function NotesForm({}) {
  return (
    <form action="">
      <input
        type="text"
        placeholder="Notes..."
      />
      <button>+</button>
    </form>
  );
}

// Re-use List Component?
function NoteList() {
  return (
    <ul>
      <li>placeholder</li>
    </ul>
  );
}
