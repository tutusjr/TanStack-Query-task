import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { ProductContext } from "../../context/Product/productcontext";
const usePostData = () => {
  const { setProducts } = useContext(ProductContext) || {
    setProducts: () => {},
  };

  const addProduct = async (newProduct: {
    title: string;
    price: number;
    category: string;
  }) => {
    const res = await axios.post(
      "https://dummyjson.com/products/add",
      newProduct,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  };
  return useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    },
  });
};

export default usePostData;
