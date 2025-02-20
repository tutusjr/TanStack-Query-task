import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  website: string;
}

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
