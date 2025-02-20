import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/Users/usercontext";

export const usePostUser = () => {
  const { setUsers } = useContext(UserContext) || { setUsers: () => {} };

  const addUser = async (newUser: {
    name: string;
    username: string;
    website: string;
  }) => {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  };
  return useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      setUsers((prev) => [...prev, newUser]);
    },
  });
};
