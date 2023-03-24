import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarQuickFilter,
  GridLogicOperator,
} from "@mui/x-data-grid";
import Addproduct from "./AddProduct";
import Editproduct from "./EditProduct";
import Box from "@mui/material/Box";

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

  //fetch the data from API
  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  };

  //delete product
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

  //update product
  const updateProduct = (product: any, id: number) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };

  //save product
  const saveProduct = (product: any) => {
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
  };

  //get the total value of the inventory
  const getTotalInventoryPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.stock;
    });
    return total.toFixed(2);
  };

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
          display: "flex",
          justifyContent: "flex-start",
          padding: "10px",
        }}
      >
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput: string) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />
      </Box>
    );
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "brand", headerName: "Brand", width: 150, editable: true },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 100,
      editable: true,
    },
    { field: "size", headerName: "Size", width: 100, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 120,
      editable: true,
    },
    { field: "category", headerName: "Category", width: 120, editable: true },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          {" "}
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <div>
          <Editproduct updateProduct={updateProduct} product={params.row} />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        height: 650,
        width: "100%",
        justifyContent: "center",
        marginTop: -300,
      }}
    >
      <h1>INVENTORY</h1>
      <h2>Total value: ${getTotalInventoryPrice()}</h2>
      <DataGrid
        slots={{
          toolbar: () => (
            <React.Fragment>
              <QuickSearchToolbar />
              <GridToolbar />
            </React.Fragment>
          ),
        }}
        rows={products}
        columns={columns}
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        autoHeight
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: "#1f1f14",
          "& .MuiDataGrid-main": {
            overflow: "hidden",
          },
        }}
      />

      <Addproduct saveProduct={saveProduct} />
    </div>
  );
};

export default ProductList;
