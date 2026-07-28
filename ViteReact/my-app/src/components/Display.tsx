type DisplayProps = {
  value: string;
};

function Display({ value }: DisplayProps) {
  return <div className="display">{value}</div>;
}

export default Display;