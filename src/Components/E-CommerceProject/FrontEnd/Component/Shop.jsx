import React, { useContext, useState } from "react";
import {
  Card,
  Grid,
  Chip,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Checkbox,
  TextField,
  Skeleton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddIcon from "@mui/icons-material/Add";
import { contextProvider } from "../../../../App";
import productBannerImage from "../../../../../public/assets/images/shop-banner-img.webp";

// background image component start
export const BgImg = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `URL(${productBannerImage})`,
          height: { xs: "hide", sm: "100px", md: "200px", lg: "350px" },
          width: "100%",
          backgroundSize: "100%",
          borderRadius: "10px",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
    </>
  );
};
// background image component end

// ShopSideBar Start
export const ShopSideBar = ({
  checkCategory,
  setCheckCategory,
  searchProduct,
  setSearchProduct,
}) => {
  const productCategories = localStorage.getItem("productCategories");
  const filteredCategories = JSON.parse(productCategories);

  return (
    <>
      <Grid
        container
        sx={{
          fontWeight: "bold",
        }}
      >
        <Grid item xs={12}>
          <TextField
            id="filled-basic"
            label="Search By Caregories"
            variant="filled"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Categories :</Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <Grid sx={12}>
            {filteredCategories.map((item) => (
              <>
                <div key={item.categoryId}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => {
                            if (checkCategory.includes(item.categoryName)) {
                              // If category is already selected, remove it
                              setCheckCategory((prev) =>
                                prev.filter(
                                  (category) => category !== item.categoryName
                                )
                              );
                            } else {
                              // If category is not selected, add it
                              setCheckCategory((prev) => [
                                ...prev,
                                item.categoryName,
                              ]);
                            }
                          }}
                        />
                      }
                      label={item.categoryName}
                    />
                  </FormGroup>
                </div>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
// ShopSideBar end

export default function Shop() {
  const { isProducts, isLoading, checkCategory, setCheckCategory } =
    useContext(contextProvider);
  const [searchProduct, setSearchProduct] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

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

  return (
    <>
      <Grid container sx={{ marginTop: "3%" }}>
        <Grid item xs={3}>
          <ShopSideBar
            checkCategory={checkCategory}
            setCheckCategory={setCheckCategory}
            searchProduct={searchProduct}
            setSearchProduct={setSearchProduct}
          />
        </Grid>

        {/* ///////////////////// dialog box */}
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
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

        {/*////////////////// dialog box */}
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <BgImg />
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <Skeleton
                        variant="rectangular"
                        width={345}
                        height={140}
                      />
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
                  .filter((item) =>
                    item.productCategory
                      .toLowerCase()
                      .includes(searchProduct.toLowerCase())
                  )

                  .filter(
                    (item) =>
                      checkCategory.length == 0 ||
                      checkCategory.includes(item.productCategory)
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
        </Grid>
      </Grid>
    </>
  );
}
