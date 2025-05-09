import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in Successfull")
      navigate('/');
    } catch {
      toast.success('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 w-full" />
      <button type="submit" className="login-form-btn">Login</button>
    </form>
  );
};

export default Login;