import { Typography } from "@mui/material";
import React from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const ChildrenPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");
  return (
    <ShopLayout
      title={"Teslo-Shop - Kids"}
      pageDescription={"Sección de niños"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Sección de Hombres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default ChildrenPage;
