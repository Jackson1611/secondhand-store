import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Product {
  id: number;
  name: string;
  brand: string;
  stock: number;
  size: string;
  price: number;
  category: {
    categoryid: number;
    name: string;
  };
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        setProducts(data);
        console.log(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "stock", headerName: "Stock", type: "number", width: 100 },
    { field: "size", headerName: "Size", width: 100 },
    { field: "price", headerName: "Price", type: "number", width: 120 },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      valueGetter: (params) => params.row.category.name,
    },
  ];

  return (
    <div style={{ height: 800, width: "1200px" }}>
      <h1>INVENTORY</h1>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        pageSizeOptions={[5]}
      />
    </div>
  );
};

export default ProductList;
