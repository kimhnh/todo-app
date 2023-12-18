import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import Box from './components/Box';
import Form from './components/Form';
import Input from './components/Input';
import Button from './components/Button';
import ButtonList from './components/ButtonList';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';

const tempTodoData = [
  { id: crypto.randomUUID(), todo: 'water plants', status: false },
  { id: crypto.randomUUID(), todo: 'make coffee', status: false },
  { id: crypto.randomUUID(), todo: 'buy ingredients for dinner', status: false },
];

const tempNotesData = [
  { id: 1, note: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, deleniti.' },
  {
    id: 2,
    note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta obcaecati nihil veniam asperiores quaerat repellat eligendi officia, modi voluptatem corporis molestiae fugiat cupiditate libero nisi, autem atque. Magni, quasi sint.',
  },
  { id: 3, note: 'Lorem ipsum dolor sit amet.' },
];

/* TODO :: HIDE EDIT INPUT AFTER SUBMIT */

export default function App() {
  const [list, setList] = useState(tempTodoData);
  const [workingItem, setWorkingItem] = useState(null); // highlight working item
  const [editItem, setEditItem] = useState(null); // select editing item

  const [todo, setTodo] = useState(''); // add new todo

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

  function handleTodoSubmit(e) {
    e.preventDefault();

    if (!todo) return;
    const newItem = { id: crypto.randomUUID(), todo, status: false };
    handleAddItem(newItem);
    setTodo('');
  }

  return (
    <>
      <Header />

      <Container>
        <Box>
          <Form onSubmit={handleTodoSubmit}>
            <Input
              value={todo}
              onChange={setTodo}
            >
              Add a new todo
            </Input>
            <Button>+</Button>
          </Form>
          <TodoList list={list}>
            {list.map((i) => (
              <TodoItem
                key={i.id}
                item={i}
                editItem={editItem}
                workingItem={workingItem}
                onUpdateItem={handleUpdateItem}
              >
                <ButtonList>
                  <Button onClick={() => handleDeleteItem(i)}>❌</Button>
                  <Button onClick={() => handleEditInput(i)}>✏️</Button>
                  <Button onClick={() => handleWorkingItem(i)}>🎯</Button>
                </ButtonList>
              </TodoItem>
            ))}
          </TodoList>
        </Box>

        <Box>
          <Form>
            <Input>Add a new note</Input>
            <Button>+</Button>
          </Form>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
