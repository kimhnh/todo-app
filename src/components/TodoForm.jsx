import { useState } from 'react';
import Button from './Button';
import Input from './Input';

export default function TodoForm({ onAddItem }) {
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
      <h3>My TODOs</h3>
      <Input
        value={todo}
        onChange={setTodo}
      >
        Todo...
      </Input>
      <Button>+</Button>
    </form>
  );
}
