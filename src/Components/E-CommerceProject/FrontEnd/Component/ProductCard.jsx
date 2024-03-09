import React, { useEffect, useState, useContext } from "react";
import { contextProvider } from "../../../../App";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography, Button, Card, Chip } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Skeleton } from "@mui/material";
export default function ProductCard() {
  const { isProducts, setIsProducts, appActions, isLoading } =
    useContext(contextProvider);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const [cardId, setCardId] = useState();

  // ---------------- Dialog Box///////////
  const [open, setOpen] = useState(
    localStorage.getItem("dialogOpen") === "true"
  );
  const [scroll, setScroll] = React.useState("paper");
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (open) {
      localStorage.setItem("dialogOpen", "true");
    }
  }, [open]);

  const handleClickOpen = (scrollType, product) => () => {
    setClickedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    localStorage.setItem("products", JSON.stringify(isProducts));

    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setClickedProduct(null);
    setOpen(false);
    localStorage.setItem("dialogOpen", "false");
  };
  const data = localStorage.getItem("selectedProduct");
  const allPro = localStorage.getItem("products");

  const allProducts = JSON.parse(allPro);
  const getProduct = JSON.parse(data);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  ////////////////////////////////////////////////////////

  return (
    <>
      {/* /////////////////////// dialog box start////////////////////////////// */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        {getProduct && (
          <>
            <DialogContent dividers={scroll === "paper"}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <img
                    src={getProduct.imageurl}
                    style={{
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{
                      "&:hover": {
                        color: "seagreen",
                        cursor: "pointer",
                        transition: "0.6s",
                      },
                      marginTop: "5%",
                    }}
                  >
                    {getProduct.productTitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ margin: "5% 0", lineHeight: "25px" }}
                  >
                    {readMore
                      ? getProduct.productDescription
                      : getProduct.productDescription.slice(0, 100)}
                    {getProduct.productDescription.length > 130 && (
                      <Typography
                        component="small"
                        color="primary"
                        sx={{ color: "#009f7f", cursor: "pointer" }}
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? " Read Less" : " Read More"}
                      </Typography>
                    )}
                  </Typography>

                  <Typography
                    variant="div"
                    sx={{
                      color: "#009F7F",
                      fontSize: "30px",
                    }}
                  >
                    $ {getProduct.productPrice}
                  </Typography>
                  <br />
                  <Button
                    sx={{
                      bgcolor: "#009F7F",
                      color: "white",
                      padding: "12px",
                      margin: "5% 0",
                      "&:hover": {
                        bgcolor: "#009F7F",
                        color: "white",
                      },
                    }}
                  >
                    Add To Shopping Cart
                  </Button>
                </Grid>

                {/* related products cards  start */}
                <Grid item xs={12}>
                  <h4>Related Products</h4>
                </Grid>
                {allProducts &&
                  allProducts
                    .filter(
                      (product) =>
                        product.productCategory ===
                          getProduct.productCategory &&
                        product.productId !== getProduct.productId
                    )
                    .map((item) => (
                      <Grid item xs={12} sm={6} md={3} key={item.productId}>
                        <Card
                          sx={{
                            position: "relative",
                            transition: "0.8s",
                            "&:hover": {
                              transform: "translateY(-15px)",
                              transition: "0.8s",
                            },
                          }}
                          // component={Link}
                          // to={`singleproduct`}
                          onClick={handleClickOpen("body", item)}
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
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
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
                                "&:hover": {
                                  bgcolor: "seagreen",
                                  color: "white",
                                },
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
            {/* related products cards  end */}
          </>
        )}
      </Dialog>
      {/* /////////////////////// dialog box end////////////////////////////// */}

      <Grid container spacing={3}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <Skeleton variant="rectangular" width={345} height={140} />
                  <Skeleton variant="text" width={210} height={60} />
                  <Skeleton variant="text" width={210} height={60} />
                  <Skeleton variant="text" width={40} height={20} />
                  <Typography
                    variant="span"
                    sx={{ padding: "0 10px 10px 10px" }}
                  ></Typography>
                </Card>
              </Grid>
            ))
          : isProducts
              .filter(
                (item) =>
                  item.productCategory === appActions.selectedCategory ||
                  appActions.selectedCategory === ""
              )
              .map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item.productId}>
                  <Card
                    sx={{
                      position: "relative",
                      transition: "0.8s",
                      "&:hover": {
                        transform: "translateY(-15px)",
                        transition: "0.8s",
                      },
                    }}
                    onClick={handleClickOpen("body", item)}
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
