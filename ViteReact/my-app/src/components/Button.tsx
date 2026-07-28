type ButtonProps = {
  value: string;
  onClick: () => void;
};

function Button({ value, onClick }: ButtonProps) {
  return (
    <button className="calc-btn" onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;