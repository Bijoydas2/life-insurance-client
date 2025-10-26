import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUserTie } from 'react-icons/fa6';
import Loading from './Loading';
import UseAxios from '../hooks/UseAxios';
import { ThemeContext } from '../Context/ThemeContext'; 
import AOS from 'aos'; 
import 'aos/dist/aos.css';

const MeetOurAgents = () => {
  const axiosInstance = UseAxios();
  const { theme } = useContext(ThemeContext); 
  const dark = theme === 'dark';

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await axiosInstance.get('/agents/top');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section 
      className={`py-12 transition-colors duration-300 ${
        dark ? 'bg-[#0f172a]' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 
          className={`text-4xl font-bold text-center mb-10 ${
            dark ? 'text-white' : 'text-[#27445D]'
          }`}
          data-aos="fade-down"
        >
          Meet Our Expert Agents 🤝
        </h2>
        
      
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {agents.map((agent, index) => (
            <div 
              key={agent._id} 
              className={`p-6 rounded-xl shadow-lg border hover:shadow-2xl transition-all duration-300 ${
                dark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-100'
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 150} 
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={agent.photoURL || 'https://i.ibb.co/FhH6Yns/agent-placeholder.jpg'}
                  alt={agent.name}
                  className="w-28 h-28 object-cover rounded-full border-4 border-primary mb-4 shadow-md"
                />
                <h3 className="text-xl text-primary font-bold">{agent.name}</h3>
                <p 
                  className={`text-sm mt-1 ${
                    dark ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {agent.specialty || 'Life Insurance Specialist'}
                </p>
                <div className="mt-3 text-secondary">
                  <FaUserTie size={30} className="text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurAgents;