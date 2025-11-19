 import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex pl-8 '>
            <img src={logo} alt="" />
            <h3 className='font-urbanist text-[32px] flex items-end   font-bold -ms-3 mt-2.5'>ZapShift</h3>
        </div>
    );
};

export default Logo;