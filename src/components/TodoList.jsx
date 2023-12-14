import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  workingItem,
  editItem,
  onWorkingItem,
  onDeleteItem,
  onEditInput,
  onUpdateItem,
}) {
  return (
    <ul>
      {todos.map((i) => (
        <TodoItem
          key={i.id}
          item={i}
          workingItem={workingItem}
          editItem={editItem}
          onWorkingItem={onWorkingItem}
          onDeleteItem={onDeleteItem}
          onEditInput={onEditInput}
          onUpdateItem={onUpdateItem}
        />
      ))}
    </ul>
  );
}
