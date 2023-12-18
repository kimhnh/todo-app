import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import { NotesForm, NoteList } from './NotesForm'; // WIP

// Dummy TODO List
const todoList = [
  { id: crypto.randomUUID(), todo: 'water plants', status: false },
  { id: crypto.randomUUID(), todo: 'make coffee', status: false },
  { id: crypto.randomUUID(), todo: 'buy ingredients for dinner', status: false },
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
  const [list, setList] = useState(todoList); // notes array
  const [workingItem, setWorkingItem] = useState(null); // select working-on item
  const [editItem, setEditItem] = useState(null); // select editing item

  // Form Handler Functions
  // [UPDATE_ ARRAY] :: SPREAD
  function handleAddItem(item) {
    setList((list) => [...list, item]);
  }

  // [UPDATE_ ITEM (TODO)] :: MAP + SPREAD
  function handleUpdateItem(editTodo) {
    setList((list) => list.map((i) => (i.id === editItem.id ? { ...i, todo: editTodo } : i)));
  }

  // Button Handler Functions
  // [UPDATE_ ITEM (STATUS)] :: MAP + SREAD
  function handleWorkingItem(item) {
    setList((list) => list.map((i) => (i.id === item.id ? { ...i, status: !i.status } : i)));
    setWorkingItem((s) => (s?.id === item.id ? null : item));
  }

  // [UPDATE_ ITEM] :: SELECT ITEM TO UPDATE
  function handleEditInput(item) {
    // setShowInput((s) => !s);
    setEditItem((e) => (e?.id === item.id ? null : item));
  }

  // [DELETE_ ITEM] :: FILTER
  function handleDeleteItem(item) {
    setList((list) => list.filter((i) => item.id !== i.id));
    setWorkingItem((s) => s?.id === item.id && null);
  }

  return (
    <div className="container">
      <Header />
      <main>
        <div className="todo">
          <TodoForm onAddItem={handleAddItem} />
          <TodoList
            todos={list}
            workingItem={workingItem}
            editItem={editItem}
            onWorkingItem={handleWorkingItem}
            onDeleteItem={handleDeleteItem}
            onEditInput={handleEditInput}
            onUpdateItem={handleUpdateItem}
          />
        </div>
        {/* <div className="notes">
          <NotesForm />
          <NoteList />
        </div> */}
      </main>
      <Footer />
    </div>
  );
}
