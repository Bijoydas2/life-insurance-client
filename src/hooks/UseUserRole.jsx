import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";





const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  console.log(user)
  const axiosSecure = useAxiosSecure();

  const {
    data: role = 'customer',
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: !!user?.email && !authLoading, 
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role || "customer"; 
    },
  });

  return {
    role,
    isLoading: isLoading || authLoading, 
    isError,
    refetch,
  };
};

export default useUserRole;
