const Input = ({ type, title }: { type: string; title: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm capitalize">{title}</label>
      <input type={type} name={title} className="border-b border-black text-center outline-none" />
    </div>
  );
};

export default Input;
