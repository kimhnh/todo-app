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
      {/* <span>My TODOs</span> */}
      <Input
        value={todo}
        onChange={setTodo}
      >
        Write a todo...
      </Input>
      <Button>+</Button>
    </form>
  );
}
