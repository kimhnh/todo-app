import { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';

export default function TodoItem({ children, editItem, workingItem, onUpdateItem, item }) {
  const isEditing = editItem?.id === item.id;
  const [editTodo, setEditTodo] = useState(''); // new input

  function handleSubmit(e) {
    e.preventDefault();
    if (!editTodo) return;
    onUpdateItem(editTodo);
  }

  return (
    <li className={workingItem?.id === item.id ? 'working-on' : ''}>
      <p>{item.todo}</p>
      {isEditing && (
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
