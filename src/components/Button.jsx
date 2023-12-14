// Re-usable Button Component
export default function Button({ children, onAction }) {
  return (
    <button
      className="button"
      onClick={onAction}
    >
      {children}
    </button>
  );
}
