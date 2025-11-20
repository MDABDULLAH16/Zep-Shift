import React from 'react';
import Banner from './Banner/Banner';
import WorkState from './WorkState/WorkState';
import OurServices from './OurServices/OurServices';

const Home = () => {
    return (
        <div>
            <Banner />
            <WorkState />
            <OurServices></OurServices>
        </div>
    );
};

export default Home;