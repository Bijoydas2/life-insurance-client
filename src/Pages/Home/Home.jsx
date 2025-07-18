import React from 'react';
import HeroSlider from '../../Components/HeroSlider';
import PopularPolicies from '../../Components/PopularPolicies';
import CustomerReviews from '../../Components/CustomerReviews';
import LatestBlogs from '../../Components/LatestBlogs';


const Home = () => {
    return (
        <div>
            <HeroSlider/>
            <PopularPolicies/>
            <CustomerReviews/>
            <LatestBlogs/>
         
        </div>
    );
};

export default Home;