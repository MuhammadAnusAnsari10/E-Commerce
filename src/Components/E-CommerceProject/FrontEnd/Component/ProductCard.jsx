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
export default function ProductCard() {
  const { isProducts, setIsProducts, appActions } = useContext(contextProvider);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const [cardId, setCardId] = useState();

  // ---------------- Dialog Box///////////
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType, product) => () => {
    setClickedProduct(product);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setClickedProduct(null);
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Grid container spacing={3}>
        {isProducts
          .filter(
            (item) =>
              item.productCategory === appActions.selectedCategory ||
              appActions.selectedCategory == ""
          )
          .map((item) => (
            <Grid item xs={4} key={item.productId}>
              <Card
                sx={{ position: "relative" }}
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
              {/* /////////////////////// dialog box start////////////////////////////// */}
              <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                {clickedProduct && (
                  <>
                    <DialogContent dividers={scroll === "paper"}>
                      <Grid container spacing={2}>
                        <Grid item xs={7}>
                          <img
                            src={clickedProduct.imageurl}
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Grid>
                        <Grid item xs={5}>
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
                            }}
                          >
                            {clickedProduct.productTitle}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ margin: "10% 0  " }}
                          >
                            {clickedProduct.productDescription}
                          </Typography>
                          <Typography
                            variant="div"
                            sx={{
                              color: "#009F7F",
                              fontSize: "30px",
                            }}
                          >
                            ${clickedProduct.productPrice}
                          </Typography>
                          <Button
                            sx={{
                              bgcolor: "#009F7F",
                              color: "white",
                              padding: "12px",
                              margin: "10% 0 0 0 ",
                              "&:hover": {
                                bgcolor: "#009F7F",
                                color: "white",
                              },
                            }}
                          >
                            Add To Shopping Cart
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </>
                )}
              </Dialog>
              {/* /////////////////////// dialog box end////////////////////////////// */}
            </Grid>
          ))}
      </Grid>
    </>
  );
}
