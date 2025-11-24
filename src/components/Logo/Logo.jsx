 import { Link } from 'react-router';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <Link to='/' className='flex pl-8 '>
            <img src={logo} alt="" />
            <h3 className='font-urbanist text-[32px] flex items-end   font-bold -ms-3 mt-2.5'>ZapShift</h3>
        </Link>
    );
};

export default Logo;