import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/Users/usercontext";

export const useFetchUser = () => {
  const { setUsers } = useContext(UserContext) || { setUsers: () => {} };

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const data = res.data;
      setUsers(data);
      return data;
    },
  });
};
