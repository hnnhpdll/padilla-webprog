import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      console.log("LOGIN RESPONSE:", data);

      // ✅ FIXED PATHS
      const token = data.token;
      const firstName = data.user.firstName;
      const type = data.user.type;

      localStorage.setItem('token', token);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('type', type);

      navigate('/dashboard', {
        state: {
          firstName,
          type,
        },
      });

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Log In</h1>

      <form className="mt-8 space-y-5" onSubmit={handleLogin}>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label>Email</label>
          <input
            type="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Log In
        </Button>
      </form>

      <div className="mt-6">
        No account yet? <Link to="/auth/signup">Sign up</Link>
      </div>
    </>
  );
};

export default SignInPage;