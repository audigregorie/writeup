import { MdKeyboardArrowLeft } from 'react-icons/md';
import Input from '../../components/Input';
import { AuthProps, LogInFormProps } from '../../utils/types/common';
import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogIn: React.FC<AuthProps> = ({ setSignRequest, setModal }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LogInFormProps>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LogInFormProps>>({});

  const validateForm = () => {
    const formErrors: Partial<LogInFormProps> = {};

    if (!form.email.trim()) {
      formErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = 'Invalid email address';
    }

    if (!form.password.trim()) {
      formErrors.password = 'Please enter your password';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);

      navigate('/');
      setModal(false);
      setLoading(false);
    } catch (err: any) {
      console.error('Error during login:', err);
      toast.error(`Error during login: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-24 flex flex-col gap-6 text-center">
      <h2 className="text-3xl">Log in with email</h2>
      <p className="mx-auto w-full sm:w-[25rem]">Enter the email address associated with your account.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Input form={form} setForm={setForm} type="email" name="email" label="Email" />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <Input form={form} setForm={setForm} type="password" name="password" label="Password" />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>
        <button
          className={`mx-auto mt-4 rounded-full bg-green-700 px-12 py-2 text-sm text-white hover:bg-green-800 ${loading ? 'pointer-events-none opacity-50' : ''}`}>
          Log In
        </button>
      </form>
      <button onClick={() => setSignRequest('')} className="hover:text-greeen-700 mx-auto flex items-center text-sm text-green-600">
        <MdKeyboardArrowLeft /> All login options
      </button>
    </div>
  );
};

export default LogIn;
