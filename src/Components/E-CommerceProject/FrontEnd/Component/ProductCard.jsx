import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import { db, storage } from "../../../FireBase/FireBaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDocs, collection } from "firebase/firestore";
import { v4 } from "uuid";

export default function ProductCard() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const productCollection = collection(db, "Products");
        const productSnapshot = await getDocs(productCollection);
        const productData = productSnapshot.docs.map((doc) => doc.data());
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {product.map((item) => (
          <Grid item xs={4} key={item.productId}>
            <Card sx={{ position: "relative" }}>
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
                title="green iguana"
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
