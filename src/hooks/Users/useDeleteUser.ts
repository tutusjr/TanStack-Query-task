import { useContext } from "react";
import { UserContext } from "../../context/Users/usercontext";
import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

export const useDeleteUser = () => {
  const { setUsers } = useContext(UserContext) || { setUsers: () => {} };

  return useMutation({
    mutationFn: async (id: number) => {
      return id;
    },
    onSuccess: (deletedId) => {
      setUsers((prevUser) => prevUser.filter((u) => u.id !== deletedId));
    },
  });
};
