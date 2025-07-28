import React from 'react';
import PopularPolicies from '../../Components/PopularPolicies';
import CustomerReviews from '../../Components/CustomerReviews';
import LatestBlogs from '../../Components/LatestBlogs';
import NewsletterForm from '../../Components/NewsletterForm';
import MeetOurAgents from '../../Components/MeetOurAgents';
import HeroCarousel from '../../Components/HeroCarousel';


const Home = () => {
    return (
        <div>
            <title>Life Secure</title>
            <HeroCarousel/>
            <PopularPolicies/>
            <CustomerReviews/>
            <LatestBlogs/>
            <NewsletterForm/>
            <MeetOurAgents/>
            
         
        </div>
    );
};

export default Home;