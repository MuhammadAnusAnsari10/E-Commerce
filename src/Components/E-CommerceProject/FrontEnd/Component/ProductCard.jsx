// import React, { useEffect, useState, useContext } from "react";
// import { contextProvider } from "../../../../App";
// import { Link, useParams } from "react-router-dom";
// import { Grid, Typography, Button, Card, Chip } from "@mui/material";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import AddIcon from "@mui/icons-material/Add";

// // ---------------
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// export default function ProductCard() {
//   const { isProducts, setIsProducts, appActions } = useContext(contextProvider);
//   const [product, setProduct] = useState([]);
//   const [cardId, setCardId] = useState();
//   // const { productId } = useParams();
//   // console.log(productId);

//   // ----------------
//   const [open, setOpen] = React.useState(false);
//   const [scroll, setScroll] = React.useState("paper");

//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const descriptionElementRef = React.useRef(null);
//   React.useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} scroll={scroll} maxWidth>
//         <Grid container>
//           <Grid item xs={6}>
//             {}
//           </Grid>
//         </Grid>
//       </Dialog>

//       <Grid container spacing={3}>
//         {isProducts
//           .filter(
//             (item) =>
//               item.productCategory === appActions.selectedCategory ||
//               appActions.selectedCategory == ""
//           )
//           .map((item) => (
//             <Grid item xs={4} key={item.productId}>
//               <Card
//                 sx={{ position: "relative" }}
//                 // component={Link}
//                 // to={`singleproduct`}
//                 onClick={handleClickOpen("body")}
//               >
//                 <Chip
//                   label="20%"
//                   size="small"
//                   sx={{
//                     position: "absolute",
//                     top: "2%",
//                     right: "2%",
//                     zIndex: 1,
//                     bgcolor: "seagreen",
//                     color: "white",
//                   }}
//                 />

//                 <CardMedia
//                   sx={{ height: "200px" }}
//                   image={item.imageurl}
//                   title={item.productTitle}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h6" component="div">
//                     ${item.productPrice}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.productTitle}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     fullWidth
//                     sx={{
//                       bgcolor: "#F3F4F6",
//                       color: "black",
//                       "&:hover": { bgcolor: "seagreen", color: "white" },
//                     }}
//                   >
//                     Add
//                     <AddIcon />
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>
//     </>
//   );
// }
///////////////////////////
// import React, { useEffect, useState, useContext } from "react";
// import { contextProvider } from "../../../../App";
// import { Link, useParams } from "react-router-dom";
// import { Grid, Typography, Button, Card, Chip } from "@mui/material";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import AddIcon from "@mui/icons-material/Add";

// // ---------------
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// export default function ProductCard() {
//   const { isProducts, setIsProducts, appActions } = useContext(contextProvider);
//   // console.log(appActions.selectedCategory);
//   const [product, setProduct] = useState([]);
//   const [isCardId, setIsCardId] = useState(null);
//   // const { productId } = useParams();
//   // console.log(productId);

//   // ----------------
//   const [open, setOpen] = React.useState(false);
//   const [scroll, setScroll] = React.useState("body");

//   // const handleClickOpen = (scrollType) => () => {
//   //   setOpen(true);
//   //   setScroll(scrollType);
//   // };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const descriptionElementRef = React.useRef(null);
//   React.useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   // ----------------------------

//   return (
//     <>
//       {isProducts
//         ? isProducts
//             .filter((product) => product.productId == isCardId)
//             .map((item) => (
//               <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 scroll={scroll}
//                 aria-labelledby="scroll-dialog-title"
//                 aria-describedby="scroll-dialog-description"
//                 sx={{ margin: "50px", maxWidth: "1000px !important" }}
//                 fullScreen={true}
//               >
//                 {/* <DialogContent dividers={scroll === "body"}> */}
//                 <Typography>
//                   lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry. Lorem Ipsum has been the industry's
//                   standard dummy text ever since the 1500s, when an unknown
//                   printer took a galley of type and scrambled it to make a type
//                   specimen book. It has survived not only five centuries, but
//                   also the leap into electronic typesetting, remaining
//                   essentially unchanged. It was popularised in the 1960s with
//                   the release of Letraset sheets containing Lorem Ipsum
//                   passages, and more recently with desktop publishing software
//                   like Aldus PageMaker including versions of Lorem Ipsum.
//                 </Typography>
//                 <Grid container sx={{ maxWidth: "100%" }} key={item.productId}>
//                   <Grid item xs="6" sx={{ maxWidth: "100%" }}>
//                     <Card
//                     // sx={{ position: "relative" }}
//                     // component={Link}
//                     // to={`singleproduct`}
//                     // onClick={handleClickOpen("body")}
//                     // onClick={() => {
//                     //   setOpen(true), setIsCardId(item.productId);
//                     // }}
//                     >
//                       <Chip
//                         label="20%"
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: "2%",
//                           right: "2%",
//                           zIndex: 1,
//                           bgcolor: "seagreen",
//                           color: "white",
//                         }}
//                       />

//                       <CardMedia
//                         sx={{ height: "200px" }}
//                         image={item.imageurl}
//                         title="green iguana"
//                       />
//                       <CardContent>
//                         <Typography gutterBottom variant="h6" component="div">
//                           ${item.productPrice}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {item.productTitle}
//                         </Typography>
//                       </CardContent>
//                       <CardActions>
//                         <Button
//                           fullWidth
//                           sx={{
//                             bgcolor: "#F3F4F6",
//                             color: "black",
//                             "&:hover": {
//                               bgcolor: "seagreen",
//                               color: "white",
//                             },
//                           }}
//                         >
//                           Add
//                           <AddIcon />
//                         </Button>
//                       </CardActions>
//                     </Card>
//                   </Grid>
//                   <Grid item xs="6">
//                     {/* <Typography>Hi</Typography> */}
//                   </Grid>
//                 </Grid>
//               </Dialog>
//             ))
//         : null}
//       {/* </DialogContent> */}

//       <Grid container spacing={3}>
//         {isProducts
//           .filter(
//             (item) =>
//               item.productCategory === appActions.selectedCategory ||
//               appActions.selectedCategory == ""
//           )
//           .map((item) => (
//             <Grid item xs={4} key={item.productId}>
//               <Card
//                 sx={{ position: "relative" }}
//                 // component={Link}
//                 // to={`singleproduct`}

//                 onClick={() => {
//                   setOpen(true), setIsCardId(item.productId);
//                 }}
//               >
//                 <Chip
//                   label="20%"
//                   size="small"
//                   sx={{
//                     position: "absolute",
//                     top: "2%",
//                     right: "2%",
//                     zIndex: 1,
//                     bgcolor: "seagreen",
//                     color: "white",
//                   }}
//                 />

//                 <CardMedia
//                   sx={{ height: "200px" }}
//                   image={item.imageurl}
//                   title="green iguana"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h6" component="div">
//                     ${item.productPrice}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.productTitle}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     fullWidth
//                     sx={{
//                       bgcolor: "#F3F4F6",
//                       color: "black",
//                       "&:hover": { bgcolor: "seagreen", color: "white" },
//                     }}
//                   >
//                     Add
//                     <AddIcon />
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>
//     </>
//   );
// }

import React, { useEffect, useState, useContext } from "react";
import { contextProvider } from "../../../../App";
import { Grid, Typography, Button, Card, Chip } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export default function ProductCard() {
  const { isProducts, setIsProducts, appActions } = useContext(contextProvider);
  const [isCardId, setIsCardId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (productId) => {
    setOpen(true);
    setIsCardId(productId);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ margin: "50px", maxWidth: "1000px !important" }}
        fullScreen={true}
      >
        <DialogContent dividers={true}>
          {isProducts
            .filter((product) => product.productId === isCardId)
            .map((item) => (
              <div key={item.productId}>
                <Typography variant="h4">{item.productTitle}</Typography>
                <Typography variant="body1">
                  {item.productDescription}
                </Typography>
                <Typography variant="h6">
                  Price: ${item.productPrice}
                </Typography>
                {/* Add more details as needed */}
              </div>
            ))}
        </DialogContent>
      </Dialog>

      <Grid container spacing={3}>
        {isProducts
          .filter(
            (item) =>
              item.productCategory === appActions.selectedCategory ||
              appActions.selectedCategory === ""
          )
          .map((item) => (
            <Grid item xs={4} key={item.productId}>
              <Card
                sx={{ position: "relative" }}
                onClick={() => handleClickOpen(item.productId)}
              >
                <Chip
                  label="20%"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: "2%",
                    right: "2%",
                    zIndex: 1,
                    bgcolor: "seagreen",
                    color: "white",
                  }}
                />
                <CardMedia
                  sx={{ height: "200px" }}
                  image={item.imageurl}
                  title={item.productTitle}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    ${item.productPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.productTitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    sx={{
                      bgcolor: "#F3F4F6",
                      color: "black",
                      "&:hover": { bgcolor: "seagreen", color: "white" },
                    }}
                  >
                    Add
                    <AddIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
