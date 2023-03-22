import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Addproduct(props: any) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    stock: 0,
    size: "",
    price: 0,
    category: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    props.saveProduct(product);
    setProduct({
      name: "",
      brand: "",
      stock: 0,
      size: "",
      price: 0,
      category: "",
    });
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ margin: 10, fontSize: "20px" }}
        variant="outlined"
        size="large"
        onClick={handleClickOpen}
      >
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Brand"
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Size"
            type="text"
            name="size"
            value={product.size}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addProduct}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
