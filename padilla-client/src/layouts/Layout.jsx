import { Outlet } from 'react-router-dom'; 
import NavBar from '../components/Navbar';
import Footer from '../components/Footer'; // 

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 text-zinc-900">
      
      <NavBar />

      <main className="flex-grow pb-16 pt-20">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default Layout;