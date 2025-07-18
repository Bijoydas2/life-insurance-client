import React from 'react';
import HeroSlider from '../../Components/HeroSlider';
import PopularPolicies from '../../Components/PopularPolicies';
import CustomerReviews from '../../Components/CustomerReviews';
import LatestBlogs from '../../Components/LatestBlogs';
import NewsletterForm from '../../Components/NewsletterForm';
import MeetOurAgents from '../../Components/MeetOurAgents';


const Home = () => {
    return (
        <div>
            <HeroSlider/>
            <PopularPolicies/>
            <CustomerReviews/>
            <LatestBlogs/>
            <NewsletterForm/>
            <MeetOurAgents/>
         
        </div>
    );
};

export default Home;