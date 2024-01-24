import React, { useEffect, useState, useContext } from "react";
import { contextProvider } from "../../../../App";
import { Grid, Typography, Button, Card, Chip } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddIcon from "@mui/icons-material/Add";
export default function ProductCard() {
  const { isProducts, setIsProducts, appActions } = useContext(contextProvider);
  console.log(appActions.selectedCategory);
  const [product, setProduct] = useState([]);

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
