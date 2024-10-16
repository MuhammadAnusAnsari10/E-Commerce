// import React, { useContext, useEffect, useState } from "react";
// import {
//   Button,
//   Grid,
//   Box,
//   Drawer,
//   Divider,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { contextProvider } from "../../../../App";
// import { styled } from "@mui/system";
// import CloseIcon from "@mui/icons-material/Close";
// import { Link } from "react-router-dom";

// export default function Cart() {
//   const { cartItem, setCartItem } = useContext(contextProvider);
//   const [open, setOpen] = React.useState(false);
//   const [cartTotalPrice, setCartTotalPrice] = useState(0);

//   // for increase quantity
//   const handleIncrease = (selectedCartItem) => {
//     const updatedCart = cartItem.map((item) => {
//       if (selectedCartItem === item.productId) {
//         return {
//           ...item,
//           productQuantity: item.productQuantity + 1,
//         };
//       }
//       return item;
//     });

//     setCartItem(updatedCart);
//   };

//   // for decrease quantity
//   const handleDecrease = (selectedCartItem) => {
//     const updatedCart = cartItem
//       .map((item) => {
//         if (selectedCartItem === item.productId && item.productQuantity > 0) {
//           return {
//             ...item,
//             productQuantity: item.productQuantity - 1,
//           };
//         }
//         return item;
//       })
//       .filter((item) => item.productQuantity > 0); // Filter out items with quantity 0

//     setCartItem(updatedCart);
//   };

//   //for  remove quantity
//   const handleRemoveItem = (productIdToRemove) => {
//     const updatedCartItems = cartItem.filter(
//       (item) => item.productId !== productIdToRemove
//     );
//     setCartItem(updatedCartItems);
//     localStorage.setItem("cartProducts", JSON.stringify(updatedCartItems));
//   };

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const CartQtyControlers = styled("ul")({
//     listStyle: "none",
//     fontSize: "17px",
//     // fontWeight: "bold",
//     color: "gray",
//     backgroundColor: "#eee",
//     width: "40px",
//     height: "100px",
//     textAlign: "center",
//     lineHeight: "32px",
//     borderRadius: "20px",
//     padding: "10px 0px",
//     fontFamily: "sans-serif",
//   });

//   useEffect(() => {
//     const cartProduct = localStorage.getItem("cartProducts");
//     setCartItem(JSON.parse(cartProduct));
//   }, []);

//   const DrawerList = (
//     <Box sx={{ width: 400, padding: "20px" }} role="presentation">
//       <Grid container>
//         <Grid item xs={11} sm={11} md={11} lg={11}>
//           <ShoppingBagIcon fontSize="large" style={{ color: "#019376" }} />
//           <Typography component="span" sx={{ fontSize: "15px" }}>
//             {cartItem.length} items
//           </Typography>
//         </Grid>
//         <Grid item xs={1} sm={1} md={1} lg={1}>
//           <IconButton
//             onClick={toggleDrawer(false)}
//             sx={{
//               backgroundColor: "transparent",
//               "&:hover": {
//                 backgroundColor: "#019376",
//                 transition: "0.3s",
//                 color: "white",
//                 "& svg": {
//                   transform: "rotate(90deg)",
//                   transition: "transform 0.3s",
//                 },
//               },
//             }}
//           >
//             <CloseIcon sx={{ transition: "0.3s", fontSize: "20px" }} />
//           </IconButton>
//         </Grid>

//         {cartItem?.map((item) => (
//           <Grid item xs={12} key={item.productId}>
//             <Grid container spacing={4} sx={{ alignItems: "center" }}>
//               <Grid item xs={2}>
//                 <CartQtyControlers>
//                   <IconButton
//                     onClick={() => handleIncrease(item.productId)}
//                     disableRipple
//                   >
//                     <AddIcon fontSize="small" />
//                   </IconButton>
//                   <li>{item.productQuantity}</li>
//                   <IconButton
//                     onClick={() => handleDecrease(item.productId)}
//                     disableRipple
//                   >
//                     <RemoveIcon />
//                   </IconButton>
//                 </CartQtyControlers>
//               </Grid>
//               <Grid item xs={2}>
//                 <img src={item.imageurl} style={{ width: "100%" }} />
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography sx={{ fontWeight: "bold" }}>
//                   {item.productTitle}
//                 </Typography>
//                 <Typography component="small" sx={{ color: "#019376" }}>
//                   $ {item.productPrice}
//                 </Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <IconButton
//                   onClick={() => handleRemoveItem(item.productId)}
//                   disableRipple
//                   sx={{
//                     "&:hover": {
//                       transition: "0.3s",
//                       color: "red",
//                     },
//                   }}
//                 >
//                   <CloseIcon
//                     sx={{
//                       fontSize: "15px",
//                     }}
//                   />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </Grid>
//         ))}
//       </Grid>
//       <br />
//       <Divider />
//     </Box>
//   );

//   const priceHandler = () => {
//     let price = 0;
//     cartItem.map((item) => (price += Number(item.productPrice)));
//     return price;
//   };

//   const CustomButton = styled(Button)(({ theme }) => ({
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "8px 16px",
//     borderRadius: "50px",
//     backgroundColor: "#009688",
//     color: "#fff",
//     minWidth: "400px", // Adjust this based on your design
//     "&:hover": {
//       backgroundColor: "#00796b",
//     },
//   }));

//   const PriceBox = styled(Box)(({ theme }) => ({
//     backgroundColor: "#fff",
//     color: "#009688",
//     padding: "8px 16px",
//     borderRadius: "50px",
//   }));

//   return (
//     <div>
//       <Button
//         onClick={toggleDrawer(true)}
//         sx={{
//           position: "fixed",
//           zIndex: 1,
//           top: "50%",
//           right: "0",
//           backgroundColor: "#019376",
//           color: "white",
//           padding: "0 18px",
//           "&:hover": {
//             bgcolor: "#019376",
//             color: "white",
//           },
//         }}
//       >
//         <ul style={{ padding: "0", listStyle: "none" }}>
//           <li>
//             <ShoppingBagIcon fontSize="small" />
//             <small>{cartItem.length} items</small>
//           </li>
//           <li
//             style={{
//               backgroundColor: "white",
//               color: "#019376",
//               marginTop: "2%",
//               borderRadius: "5px",
//               padding: "5px 0",
//             }}
//           >
//             $ {priceHandler()}
//           </li>
//         </ul>
//       </Button>
//       <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}

//         <Grid container>
//           <Grid
//             item
//             xs={12}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Link to="/checkout">
//               <CustomButton
//                 sx={{
//                   position: "fixed",
//                   bottom: "2%",
//                   left: "67%",
//                 }}
//               >
//                 Checkout
//                 <PriceBox>$ {priceHandler()}</PriceBox>
//               </CustomButton>
//             </Link>
//           </Grid>
//         </Grid>
//       </Drawer>
//     </div>
//   );
// }
// ///////////////////////////////////////////////////////////////////

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
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  // for increase quantity
  const handleIncrease = (selectedCartItem) => {
    const updatedCart = cartItem.map((item) => {
      if (selectedCartItem === item.productId) {
        return {
          ...item,
          productQuantity: item.productQuantity + 1,
        };
      }
      return item;
    });

    setCartItem(updatedCart);
  };

  // for decrease quantity
  const handleDecrease = (selectedCartItem) => {
    const updatedCart = cartItem
      .map((item) => {
        if (selectedCartItem === item.productId && item.productQuantity > 0) {
          return {
            ...item,
            productQuantity: item.productQuantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.productQuantity > 0); // Filter out items with quantity 0

    setCartItem(updatedCart);
  };

  // for remove item
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

  const CartQtyControlers = styled("ul")({
    listStyle: "none",
    fontSize: "17px",
    color: "gray",
    backgroundColor: "#eee",
    width: "40px",
    height: "100px",
    textAlign: "center",
    lineHeight: "32px",
    borderRadius: "20px",
    padding: "10px 0px",
    fontFamily: "sans-serif",
  });

  // UseEffect to load cart items from localStorage
  useEffect(() => {
    const cartProduct = localStorage.getItem("cartProducts");
    setCartItem(JSON.parse(cartProduct) || []); // Provide an empty array as fallback
  }, []);

  const DrawerList = (
    <Box sx={{ width: 400, padding: "20px" }} role="presentation">
      <Grid container>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <ShoppingBagIcon fontSize="large" style={{ color: "#019376" }} />
          <Typography component="span" sx={{ fontSize: "15px" }}>
            {cartItem?.length} items
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
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

        {cartItem?.map((item) => (
          <Grid item xs={12} key={item.productId}>
            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              <Grid item xs={2}>
                <CartQtyControlers>
                  <IconButton
                    onClick={() => handleIncrease(item.productId)}
                    disableRipple
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <li>{item.productQuantity}</li>
                  <IconButton
                    onClick={() => handleDecrease(item.productId)}
                    disableRipple
                  >
                    <RemoveIcon />
                  </IconButton>
                </CartQtyControlers>
              </Grid>
              <Grid item xs={2}>
                <img src={item.imageurl} style={{ width: "100%" }} />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.productTitle}
                </Typography>
                <Typography component="small" sx={{ color: "#019376" }}>
                  $ {item.productPrice}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => handleRemoveItem(item.productId)}
                  disableRipple
                  sx={{
                    "&:hover": {
                      transition: "0.3s",
                      color: "red",
                    },
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: "15px",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <br />
      <Divider />
    </Box>
  );

  const priceHandler = () => {
    let price = 0;
    cartItem?.forEach((item) => (price += Number(item.productPrice)));
    return price;
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "50px",
    backgroundColor: "#009688",
    color: "#fff",
    minWidth: "400px", // Adjust this based on your design
    "&:hover": {
      backgroundColor: "#00796b",
    },
  }));

  const PriceBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    color: "#009688",
    padding: "8px 16px",
    borderRadius: "50px",
  }));

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          zIndex: 1,
          top: "50%",
          right: "0",
          backgroundColor: "#019376",
          color: "white",
          padding: "0 18px",
          "&:hover": {
            bgcolor: "#019376",
            color: "white",
          },
        }}
      >
        <ul style={{ padding: "0", listStyle: "none" }}>
          <li>
            <ShoppingBagIcon fontSize="small" />
            <small>{cartItem?.length} items</small>
          </li>
          <li
            style={{
              backgroundColor: "white",
              color: "#019376",
              marginTop: "2%",
              borderRadius: "5px",
              padding: "5px 0",
            }}
          >
            $ {priceHandler()}
          </li>
        </ul>
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}

        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/checkout">
              <CustomButton
                sx={{
                  position: "fixed",
                  bottom: "2%",
                  left: "67%",
                }}
              >
                Checkout
                <PriceBox>$ {priceHandler()}</PriceBox>
              </CustomButton>
            </Link>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
