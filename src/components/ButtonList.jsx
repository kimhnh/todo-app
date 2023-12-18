import Button from './Button';

export default function ButtonList({ item, onWorkingItem, onEditInput, onDeleteItem }) {
  return (
    <div className="button-list">
      <Button onAction={() => onDeleteItem(item)}>❌</Button>
      <Button onAction={() => onEditInput(item)}>✏️</Button>
      <Button onAction={() => onWorkingItem(item)}>🎯</Button>
    </div>
  );
}
