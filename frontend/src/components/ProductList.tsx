import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Addproduct from "./AddProduct";

interface Product {
  id: number;
  name: string;
  brand: string;
  stock: number;
  size: string;
  price: number;
  category: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const URL = "http://localhost:8080/products";
  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:8080/products/${id}`, { method: "DELETE" })
        .then((response) => fetchData())
        .catch((err) => console.error(err));
      alert("Customer is deleted!");
    } else {
      alert("Nothing deleted.");
    }
  };
  const saveProduct = (product: any) => {
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "stock", headerName: "Stock", type: "number", width: 100 },
    { field: "size", headerName: "Size", width: 100 },
    { field: "price", headerName: "Price", type: "number", width: 120 },
    { field: "category", headerName: "Category", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          {" "}
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 800, width: "100%", justifyContent: "center" }}>
      <h1>INVENTORY</h1>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        pageSizeOptions={[5]}
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: "#1f1f14",
        }}
      />
      <Addproduct saveProduct={saveProduct} />
    </div>
  );
};

export default ProductList;
