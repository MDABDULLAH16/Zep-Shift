import React from 'react';
import Banner from './Banner/Banner';
import WorkState from './WorkState/WorkState';
import OurServices from './OurServices/OurServices';
import Brands from './Brands/Brands';

const Home = () => {
    return (
        <div>
            <Banner />
            <WorkState />
            <Brands/>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;