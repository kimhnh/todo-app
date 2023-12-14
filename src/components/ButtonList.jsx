import Button from './Button';

export default function ButtonList({ item, onWorkingItem, onEditInput, onDeleteItem }) {
  return (
    <>
      <Button onAction={() => onWorkingItem(item)}>🎯</Button>
      <Button onAction={() => onEditInput(item)}>✏️</Button>
      <Button onAction={() => onDeleteItem(item)}>❌</Button>
    </>
  );
}
