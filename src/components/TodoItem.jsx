import { useState } from 'react';

export default function TodoItem({ children, editItem, workingItem, onUpdateItem, item }) {
  const isEditing = editItem?.id === item.id;
  const [editTodo, setEditTodo] = useState(''); // new input

  function handleEditSubmit(e) {
    e.preventDefault();
    if (!editTodo) return;

    onUpdateItem(editTodo);
    setEditTodo('');
  }
  return (
    <li className={workingItem?.id === item.id ? 'working-on' : ''}>
      <p>{item.todo}</p>
      {isEditing && (
        <Form onSubmit={handleEditSubmit}>
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
