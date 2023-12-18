import { useState } from 'react';
import ButtonList from './ButtonList';
import Button from './Button';
import Input from './Input';

export default function TodoItem({
  item,
  workingItem,
  editItem,
  onWorkingItem,
  onDeleteItem,
  onEditInput,
  onUpdateItem,
}) {
  const isEditing = editItem?.id === item.id;
  const [editTodo, setEditTodo] = useState(''); // new input

  function handleSubmit(e) {
    e.preventDefault();
    if (!editTodo) return;

    onUpdateItem(editTodo);
    setEditTodo('');
  }

  return (
    <li className={workingItem?.id === item.id ? 'working-on' : ''}>
      <p>{item.todo}</p>

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <Input
            value={editTodo}
            onChange={setEditTodo}
          ></Input>
          <Button>+</Button>
        </form>
      )}

      <ButtonList
        item={item}
        onWorkingItem={onWorkingItem}
        onEditInput={onEditInput}
        onDeleteItem={onDeleteItem}
      />
    </li>
  );
}
