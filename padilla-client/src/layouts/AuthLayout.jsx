import signinImage from '../assets/images/signin.png';
import signupImage from '../assets/images/signup.png';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();
  const isSignUp = location.pathname.includes('signup');

  const imageSrc = isSignUp ? signupImage : signinImage;

  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-2">

        <div className="hidden lg:block">
          <img
            src={imageSrc}
            alt="Auth visual"
            className="h-full w-full object-cover"
          />
        </div>

        <main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-lg">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;