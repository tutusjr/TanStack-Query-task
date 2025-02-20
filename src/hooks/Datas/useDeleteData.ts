import { useMutation } from "@tanstack/react-query";
//! denenecekse axios import edilmeli
import { useContext } from "react";
import { ProductContext } from "../../context/Product/productcontext";

const useDeleteData = () => {
  const { setProducts } = useContext(ProductContext) || {
    setProducts: () => {},
  };

  //! mockapi oldugu icin ekledigim veri api uzerinden silinemiyor.
  //   const deleteData = async (id: number) => {
  //     await axios.delete(`https://dummyjson.com/products/${id}`);
  //     return id;
  //   };

  return useMutation({
    mutationFn: async (id: number) => {
      return id;
    },
    onSuccess: (deletedId) => {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== deletedId)
      );
    },
  });
};

export default useDeleteData;
