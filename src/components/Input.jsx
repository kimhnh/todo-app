export default function Input({ children, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={children}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
