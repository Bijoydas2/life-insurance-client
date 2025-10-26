import React from 'react';
import PopularPolicies from '../../Components/PopularPolicies';
import CustomerReviews from '../../Components/CustomerReviews';
import LatestBlogs from '../../Components/LatestBlogs';
import NewsletterForm from '../../Components/NewsletterForm';
import MeetOurAgents from '../../Components/MeetOurAgents';
import RecentPolicies from '../../Components/RecentPolicies';
import FAQSection from '../../Components/FAQSection';
import LandingPage from '../../Components/LandingPage';



const Home = () => {
    return (
        <div>
            <title>Life Secure</title>
            <LandingPage/>
            <PopularPolicies/>
            <RecentPolicies />
            <CustomerReviews/>
            <FAQSection />
            <LatestBlogs/>
            <NewsletterForm/>
            <MeetOurAgents/>
            
         
        </div>
    );
};

export default Home;