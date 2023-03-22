import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Editproduct(props: any) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    stock: 0,
    size: "",
    price: 0,
    category: "",
  });

  const handleClickOpen = () => {
    setId(props.product.id);
    setProduct(props.product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.updateProduct(product, id);
    handleClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <div>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Brand"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Size"
            name="size"
            value={product.size}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
