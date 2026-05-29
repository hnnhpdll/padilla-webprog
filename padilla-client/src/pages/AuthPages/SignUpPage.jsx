import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('+639');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.includes(' ')) {
      newErrors.username = 'No spaces allowed';
    }

    if (!age || isNaN(age)) {
      newErrors.age = 'Age must be a number';
    }

    if (!gender.trim()) {
      newErrors.gender = 'Gender is required';
    }

    if (!contactNumber || !/^\+639\d{9}$/.test(contactNumber)) {
      newErrors.contactNumber =
        'Must be a valid Philippine number';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!password || password.length < 8) {
      newErrors.password =
        'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SIGNUP ----------------
  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');

    if (!validateForm()) return;

    try {
      await createUser({
        firstName,
        lastName,
        username,
        age: Number(age),
        gender,
        contactNumber,
        address,
        email,
        password,
        type: 'viewer',
      });

      setFirstName('');
      setLastName('');
      setUsername('');
      setAge('');
      setGender('');
      setContactNumber('+639');
      setAddress('');
      setEmail('');
      setPassword('');

      navigate('/auth/signin');
    } catch (err) {
      console.log(
        'SIGNUP ERROR:',
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message || 'Signup failed'
      );
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Sign Up</h1>

      <form className="mt-8 space-y-5" onSubmit={handleSignup}>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div>
          <label>First Name</label>

          <input
            type="text"
            className={inputClasses}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label>Last Name</label>

          <input
            type="text"
            className={inputClasses}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label>Username</label>

          <input
            type="text"
            className={inputClasses}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label>Age</label>

          <input
            type="number"
            className={inputClasses}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          {errors.age && (
            <p className="mt-1 text-sm text-red-500">
              {errors.age}
            </p>
          )}
        </div>

        <div>
  <label>Gender</label>

  <select
    className={`${inputClasses} appearance-none`}
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

  {errors.gender && (
    <p className="mt-1 text-sm text-red-500">
      {errors.gender}
    </p>
  )}
</div>

        <div>
          <label>Contact Number</label>

          <input
            type="text"
            className={inputClasses}
            value={contactNumber}
            onChange={(e) => {
              let value = e.target.value;

              // Always keep +639
              if (!value.startsWith('+639')) {
                value = '+639';
              }

              // Numbers only after +639
              const digitsOnly =
                '+639' + value.slice(4).replace(/\D/g, '');

              // Limit to 13 characters total
              setContactNumber(digitsOnly.slice(0, 13));
            }}
            placeholder="+639123456789"
          />

          {errors.contactNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.contactNumber}
            </p>
          )}
        </div>

        <div>
          <label>Address</label>

          <input
            type="text"
            className={inputClasses}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          CREATE ACCOUNT
        </Button>
      </form>

      <div className="mt-6 text-sm">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-medium underline"
        >
          Log in
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;