import UserList from "../components/Lists/UserList";
import AddUser from "../components/addOperations/AddUser";
import { Typography } from "@mui/material";

export const UsersPage = () => {
  return (
    <div>
      <Typography  variant="h4" mt={4} align="center" gutterBottom>
        Kullanıcılar
      </Typography>
      <UserList />
      <AddUser />
    </div>
  );
};
