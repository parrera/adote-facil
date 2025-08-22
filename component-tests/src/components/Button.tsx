
const Button = ({ children, onClick, disabled }: any) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;