import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUserTie } from "react-icons/fa6";
import Loading from "./Loading";

const MeetOurAgents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agents');
      return res.data;
    }
  });

  if (isLoading) return <Loading/>;

  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Meet Our Agents</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {agents.map(agent => (
            <div key={agent._id} className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition">
              <div className="flex flex-col items-center text-center">
                <img
                  src={agent.photoURL || "https://i.ibb.co/FhH6Yns/agent-placeholder.jpg"}
                  alt={agent.name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-primary mb-4"
                />
                <h3 className="text-lg text-primary font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-500">{agent.specialty || "Life Insurance Specialist"}</p>
                <div className="mt-2 text-secondary">
                  <FaUserTie size={24} />
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
