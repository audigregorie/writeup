import { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Input from '../../components/Input';
import { AuthProps, SignUpFormProps } from '../../utils/types/common';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC<AuthProps> = ({ setSignRequest, setModal }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignUpFormProps>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignUpFormProps>>({});

  const validateForm = () => {
    const formErrors: Partial<SignUpFormProps> = {};

    if (!form.username.trim()) {
      formErrors.username = 'Please enter a username';
    } else if (form.username.length < 3) {
      formErrors.username = 'Username must be at least 3 characters long';
    }

    if (!form.email.trim()) {
      formErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    if (!form.password.trim() && form.username.length >= 3 && form.email.length >= 3) {
      formErrors.password = 'Please enter a password of at least 6 characters';
    } else if (form.password.length < 6 && form.username.length >= 3 && form.email.length >= 3) {
      formErrors.password = 'Password must be at least 6 characters long';
    }

    if (!form.confirmPassword.trim() && form.password.length >= 6) {
      formErrors.confirmPassword = 'Please confirm password';
    } else if (form.confirmPassword !== form.password) {
      formErrors.confirmPassword = 'Password confirmation does not match';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(user, { displayName: form.username });

      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);

      if (!userDoc.exists()) {
        await setDoc(docRef, {
          userId: user.uid,
          username: form.username,
          email: form.email,
          userImg: '',
          bio: ''
        });
      } else {
        toast.error('User already exisits');
      }

      navigate('/');
      setModal(false);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error('Error during sign up:', err);
      toast.error(`Error during sign up: ${err.message}`);
    }
  };

  return (
    <div className="container mt-24 flex flex-col gap-6 text-center">
      <h2 className="text-3xl">Sign up with email</h2>
      <p className="mx-auto w-full sm:w-[25rem]">Enter the email address associated with your account, and we'll send a magic link to your inbox.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Input form={form} setForm={setForm} type="text" name="username" label="Username" />
          {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
        </div>
        <div>
          <Input form={form} setForm={setForm} type="email" name="email" label="Email" />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <Input form={form} setForm={setForm} type="password" name="password" label="Password" />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>
        <div>
          <Input form={form} setForm={setForm} type="password" name="confirmPassword" label="Confirm Password" />
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
        <button
          className={`mx-auto mt-4 rounded-full bg-green-700 px-12 py-2 text-sm text-white hover:bg-green-800 ${loading ? 'pointer-events-none opacity-50' : ''}`}>
          Sign Up
        </button>
      </form>
      <button onClick={() => setSignRequest('')} className="hover:text-greeen-700 mx-auto flex items-center text-sm text-green-600">
        <MdKeyboardArrowLeft /> All sign up options
      </button>
    </div>
  );
};

export default Signup;
