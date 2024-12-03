import { InputProps } from '../utils/types/common';

const Input: React.FC<InputProps> = ({ type, name, label, form, setForm }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input onChange={handleChange} type={type} id={name} name={name} className="border-b border-black text-center outline-none" />
    </div>
  );
};

export default Input;
