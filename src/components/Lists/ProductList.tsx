import { useState, useContext } from "react";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { ProductContext } from "../../context/Product/productcontext";
import { useFetchData } from "../../hooks/Datas/useFetchData";
import useDeleteData from "../../hooks/Datas/useDeleteData";
import useUpdateData from "../../hooks/Datas/useUpdateData";
import { Box, Card, CardContent, Typography, TextField } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

interface ProductRow {
  id: number;
  title: string;
  price: number;
  category: string;
}

const ProductList = () => {
  const { products } = useContext(ProductContext) || { products: [] };
  const deleteMutation = useDeleteData();
  const updateMutation = useUpdateData();
  const { isLoading, error } = useFetchData();

  const [editId, setEditId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: 0,
    category: "",
  });

  if (error) return <Typography color="error">Error loading data</Typography>;
  const startEditing = (id: number, row: ProductRow) => {
    setEditId(id);
    setEditProduct({
      title: row.title,
      price: row.price,
      category: row.category,
    });
  };
  const handleUpdate = (id: number) => {
    if (!editProduct.title.trim()) return alert("Urun basligi bos olamaz!");
    if (!editProduct.price) return alert("Fiyatlandirma 0 olamaz!");
    updateMutation.mutate({ id, ...editProduct });
    setEditId(null);
  };
  const renderEditableCell = (
    params: GridRenderCellParams<ProductRow>,
    field: keyof typeof editProduct
  ) =>
    editId === params.row.id ? (
      <TextField
        size="small"
        value={editProduct[field]}
        onChange={(e) => {
          if (field === "price") {
            const value = Number(e.target.value);
            if (value >= 0) {
              setEditProduct({ ...editProduct, price: value });
            }
          } else {
            setEditProduct({ ...editProduct, [field]: e.target.value });
          }
        }}
        type={field === "price" ? "number" : "text"}
        inputProps={field === "price" ? { min: 0 } : {}}
        fullWidth
      />
    ) : (
      params.value
    );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Ürün Adı",
      width: 250,
      renderCell: (params) => renderEditableCell(params, "title"),
    },
    {
      field: "category",
      headerName: "Kategori",
      width: 200,
      renderCell: (params) => renderEditableCell(params, "category"),
    },
    {
      field: "price",
      headerName: "Fiyat",
      width: 100,
      renderCell: (params) => renderEditableCell(params, "price"),
    },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 120,
      type: "actions",
      getActions: (params) =>
        editId === params.row.id
          ? [
              <GridActionsCellItem
                icon={<SaveIcon color="primary" />}
                label="Save"
                onClick={() => handleUpdate(params.row.id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={() => setEditId(null)}
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<EditIcon color="primary" />}
                label="Edit"
                onClick={() => startEditing(params.row.id, params.row)}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon color="error" />}
                label="Delete"
                onClick={() =>
                  window.confirm("Are you sure?") &&
                  deleteMutation.mutate(params.row.id)
                }
              />,
            ],
    },
  ];

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 4, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Urun Listesi
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
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

export default ProductList;
