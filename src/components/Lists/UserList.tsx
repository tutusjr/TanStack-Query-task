import { useState, useContext } from "react";
import { DataGrid, GridColDef, GridActionsCellItem, GridRenderCellParams } from "@mui/x-data-grid";
import { UserContext } from "../../context/Users/usercontext";
import { useFetchUser } from "../../hooks/Users/useFetchUser";
import { useDeleteUser } from "../../hooks/Users/useDeleteUser";
import { useUpdateUser } from "../../hooks/Users/useUpdateUser";
import { Box, Card, CardContent, Typography, TextField } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

interface UserRow {
  id: number;
  name: string;
  username: string;
  website: string;
}

const UserList = () => {
  const { users } = useContext(UserContext) || { users: [] };
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();
  const { isLoading, error } = useFetchUser();

  const [editId, setEditId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState({
    name: "",
    username: "",
    website: "",
  });

  if (error) return <Typography color="error">Datayi yuklerken hata</Typography>;
  const startEditing = (id: number, row: UserRow) => {
    setEditId(id);
    setEditUser({
      name: row.name,
      username: row.username,
      website: row.website,
    });
  };
  const handleUpdate = (id: number) => {
    if (!editUser.name || !editUser.username)
      return alert("Isim ve kullanici adi girmelisiniz");
    updateMutation.mutate({ id, ...editUser });
    setEditId(null);
  };
  const renderEditableCell = (params: GridRenderCellParams<UserRow>, field: keyof typeof editUser) =>
    editId === params.row.id ? (
      <TextField
        size="small"
        value={editUser[field]}
        onChange={(e) =>
          setEditUser((prev) => ({ ...prev, [field]: e.target.value }))
        }
        required={field !== "website"}
      />
    ) : (
      params.value
    );
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Isim",
      width: 200,
      renderCell: (params) => renderEditableCell(params, "name"),
    },
    {
      field: "username",
      headerName: "Kullanici Adi",
      width: 200,
      renderCell: (params) => renderEditableCell(params, "username"),
    },
    {
      field: "website",
      headerName: "Website",
      width: 200,
      renderCell: (params) => renderEditableCell(params, "website"),
    },
    {
      field: "actions",
      headerName: "Islemler",
      width: 150,
      type: "actions",
      getActions: (params) =>
        editId === params.id
          ? [
              <GridActionsCellItem
                icon={<SaveIcon color="success" />}
                label="Save"
                onClick={() => handleUpdate(Number(params.id))}
              />,
              <GridActionsCellItem
                icon={<CancelIcon color="error" />}
                label="Cancel"
                onClick={() => setEditId(null)}
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<EditIcon color="primary" />}
                label="Edit"
                onClick={() => startEditing(Number(params.id), params.row)}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon color="error" />}
                label="Delete"
                onClick={() =>
                  window.confirm("Silmek istediginize emin misiniz?") &&
                  deleteMutation.mutate(Number(params.id))
                }
              />,
            ],
    },
  ];

  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", mt: 4, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Kullanici Listesi
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            loading={isLoading}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserList;
