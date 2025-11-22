 
import { Outlet } from 'react-router';
import Logo from './../../components/Logo/Logo';

const AuthLayout = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 bg-white">
        <Logo></Logo>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default AuthLayout;