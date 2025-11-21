import React from 'react';
import Banner from './Banner/Banner';
import WorkState from './WorkState/WorkState';
import OurServices from './OurServices/OurServices';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';

const reviewPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
    return (
        <div>
            <Banner />
            <WorkState />
            <Brands/>
            <OurServices></OurServices>
            <Reviews reviewPromise={reviewPromise}></Reviews>
        </div>
    );
};

export default Home;