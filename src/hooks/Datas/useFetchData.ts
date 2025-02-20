import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { ProductContext } from "../../context/Product/productcontext";

export const useFetchData = () => {
  const { setProducts } = useContext(ProductContext) || {
    setProducts: () => {},
  };

  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products");
      const data = await res.data.products;
      setProducts(data);
      return data;
    },
  });
};
