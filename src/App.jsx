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
  { id: crypto.randomUUID(), todo: 'water plants', isWorking: false },
  { id: crypto.randomUUID(), todo: 'make coffee', isWorking: false },
  { id: crypto.randomUUID(), todo: 'buy ingredients for dinner', isWorking: false },
];

const tempNotesData = [
  { id: 1, note: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, deleniti.' },
  {
    id: 2,
    note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta obcaecati nihil veniam asperiores quaerat repellat eligendi officia, modi voluptatem corporis molestiae fugiat cupiditate libero nisi, autem atque. Magni, quasi sint.',
  },
  { id: 3, note: 'Lorem ipsum dolor sit amet.' },
];

export default function App() {
  // State
  const [list, setList] = useState(tempTodoData);
  const [todo, setTodo] = useState(''); // add new todo
  const [showInput, setShowInput] = useState(null);

  // Update (Add)
  function handleAddItem(item) {
    setList((list) => [...list, item]);
  }

  function handleNewSubmit(e) {
    e.preventDefault();

    if (!todo) return;
    const newItem = { id: crypto.randomUUID(), todo, isWorking: false };
    handleAddItem(newItem);
    setTodo('');
  }

  // Update (Edit)
  function handleUpdateItem(editTodo) {
    setList((list) => list.map((i) => (i.id === showInput.id ? { ...i, todo: editTodo } : i)));
  }

  function handleShowInput(item) {
    setShowInput((s) => (s?.id === item.id ? null : item));
  }

  // Toggle isWorking
  function handleIsWorking(item) {
    setList((list) => list.map((i) => (i.id === item.id ? { ...i, isWorking: !i.isWorking } : i)));
  }

  // Delete
  function handleDeleteItem(item) {
    setList((list) => list.filter((i) => item.id !== i.id));
  }

  return (
    <>
      <Header />

      <Container>
        <Box>
          <Form onSubmit={handleNewSubmit}>
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
                isWorking={i.isWorking}
                showInput={showInput}
                setShowInput={setShowInput}
                onUpdateItem={handleUpdateItem}
              >
                <ButtonList>
                  <Button onClick={() => handleDeleteItem(i)}>❌</Button>
                  <Button onClick={() => handleShowInput(i)}>✏️</Button>
                  <Button onClick={() => handleIsWorking(i)}>🎯</Button>
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
