import { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';

export default function TodoItem({
  children,
  item,
  isWorking,
  showInput,
  setShowInput,
  onUpdateItem,
}) {
  const [editTodo, setEditTodo] = useState(''); // update a todo

  function handleSubmit(e) {
    e.preventDefault();
    if (!editTodo) return;
    onUpdateItem(editTodo);
    setEditTodo('');
    setShowInput(null);
  }

  return (
    <li className={isWorking ? 'working-on' : ''}>
      <p>{item.todo}</p>
      {showInput?.id === item.id && (
        <Form onSubmit={handleSubmit}>
          <Input
            value={editTodo}
            onChange={setEditTodo}
          />
          <Button>+</Button>
        </Form>
      )}
      {children}
    </li>
  );
}
