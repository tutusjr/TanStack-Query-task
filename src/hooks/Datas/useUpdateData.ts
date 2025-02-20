import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ProductContext } from "../../context/Product/productcontext";
//import axios from "axios";

const useUpdateData = () => {
  const { setProducts } = useContext(ProductContext) || {
    setProducts: () => {},
  };

  // const updateProduct = async ({
  //   id,
  //   title,
  // }: {
  //   id: number;
  //   title: string;
  // }) => {
  //   const res = await axios.put(`https://dummyjson.com/products/${id}`, {
  //     title,
  //   });
  //   return res.data;
  // };

  return useMutation({
    mutationFn: async ({
      id,
      title,
      price,
      category,
    }: {
      id: number;
      title: string;
      price: number;
      category: string;
    }) => {
      return { id, title, price, category };
    },
    onSuccess: (updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id
            ? {
                ...p,
                title: updatedProduct.title,
                price: updatedProduct.price,
                category: updatedProduct.category,
              }
            : p
        )
      );
    },
  });
};

export default useUpdateData;
