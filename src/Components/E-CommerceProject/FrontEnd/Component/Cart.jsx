import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Box,
  Drawer,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { contextProvider } from "../../../../App";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItem, setCartItem } = useContext(contextProvider);
  const [open, setOpen] = useState(false);

  // increase item
  const handleIncrease = (selectedCartItem) => {
    const updatedCart = cartItem.map((item) => {
      if (selectedCartItem === item.productId) {
        return { ...item, productQuantity: item.productQuantity + 1 };
      }
      return item;
    });
    setCartItem(updatedCart);
  };

  // decrease item
  const handleDecrease = (selectedCartItem) => {
    const updatedCart = cartItem
      .map((item) => {
        if (selectedCartItem === item.productId && item.productQuantity > 0) {
          return { ...item, productQuantity: item.productQuantity - 1 };
        }
        return item;
      })
      .filter((item) => item.productQuantity > 0);
    setCartItem(updatedCart);
  };

  // removeitem
  const handleRemoveItem = (productIdToRemove) => {
    const updatedCartItems = cartItem.filter(
      (item) => item.productId !== productIdToRemove
    );
    setCartItem(updatedCartItems);
    localStorage.setItem("cartProducts", JSON.stringify(updatedCartItems));
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const cartProduct = localStorage.getItem("cartProducts");
    setCartItem(JSON.parse(cartProduct) || []);
  }, []);

  // total price handler
  const priceHandler = () => {
    return cartItem.reduce(
      (total, item) => total + item.productPrice * item.productQuantity,
      0
    );
  };

  return (
    <div>
      {/* Floating Cart Button */}

      <Button
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          zIndex: 1000,
          top: "50%",
          right: "0",
          backgroundColor: "#019376",
          color: "white",
          "&:hover": { bgcolor: "#016f58" },
          display: { xs: "block", md: "block" },
        }}
      >
        <ShoppingBagIcon fontSize="small" />
        <Typography variant="body2">{cartItem.length} items</Typography>
        <Typography variant="body2" sx={{ bgcolor: "white", color: "#019376" }}>
          $ {priceHandler()}
        </Typography>
      </Button>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "80%", md: "400px" },
          },
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <ShoppingBagIcon fontSize="large" sx={{ color: "#019376" }} />
                <Typography>{cartItem.length} items</Typography>
              </Box>
              <IconButton
                onClick={toggleDrawer(false)}
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "#019376",
                    transition: "0.3s",
                    color: "white",
                    "& svg": {
                      transform: "rotate(90deg)",
                      transition: "transform 0.3s",
                    },
                  },
                }}
              >
                <CloseIcon sx={{ transition: "0.3s", fontSize: "20px" }} />
              </IconButton>
            </Grid>

            {cartItem.map((item) => (
              <Grid item xs={12} key={item.productId}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3} sm={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#eee",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    >
                      <IconButton
                        onClick={() => handleIncrease(item.productId)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography>{item.productQuantity}</Typography>
                      <IconButton
                        onClick={() => handleDecrease(item.productId)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  </Grid>

                  <Grid item xs={3} sm={2}>
                    <img
                      src={item.imageurl}
                      alt={item.productTitle}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={6}>
                    <Typography>{item.productTitle}</Typography>
                    <Typography sx={{ color: "#019376" }}>
                      $ {item.productPrice}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => handleRemoveItem(item.productId)}
                      sx={{
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: "red",
                          color: "white",
                          transition: "0.3s",
                          "& svg": {
                            transform: "rotate(90deg)",
                            transition: "transform 0.3s",
                          },
                        },
                      }}
                    >
                      <CloseIcon
                        sx={{
                          transition: "0.3s",
                          fontSize: "20px",
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: "90%", sm: "250px", md: "300px" },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            component={Link}
            to="/checkout"
            sx={{
              borderRadius: "50px",
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#019376", // Set background color
              color: "white",
              "&:hover": {
                backgroundColor: "#019376",
                color: "white",
              },
            }}
          >
            Checkout $ {priceHandler()}
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
