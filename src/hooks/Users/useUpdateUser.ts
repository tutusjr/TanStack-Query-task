import { useContext } from "react";
import { UserContext } from "../../context/Users/usercontext";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext)
    throw new Error("UserContext must be used within a provider");

  const { setUsers } = userContext;
  return useMutation({
    mutationFn: async ({
      id,
      name,
      username,
      website,
    }: {
      id: number;
      name: string;
      username: string;
      website: string;
    }) => {
      return { id, name, username, website };
    },
    onSuccess: (updatedUser) => {
      setUsers((prevUser) =>
        prevUser.map((u) =>
          u.id === updatedUser.id
            ? {
                ...u,
                name: updatedUser.name,
                username: updatedUser.username,
                website: updatedUser.website,
              }
            : u
        )
      );
    },
  });
};

//? id: number;
//? name: string;
//? username: string;
//? website: string;
