import { Grid } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";
import ProductCard from "./ProductCard";
import Banner from "./Banner";
import Cart from "./Cart";
export default function Home() {
  return (
    <>
      {/* banner start */}
      <Grid container>
        <Grid item>
          <Banner />
        </Grid>
        {/* banner end */}
      </Grid>
      <Grid container>
        {/* sidebar start */}
        <Grid item xs={12} sm={3} md={2} lg={2} sx={{ marginTop: "1.5%" }}>
          <SideBar />
        </Grid>
        {/* sidebar end */}
        {/*  product card start */}
        <Grid
          item
          xs={12}
          sm={9}
          lg={10}
          md={10}
          sx={{
            bgcolor: "#eee",
            padding: "40px",
            marginTop: "2%",
            width: "100%",
          }}
        >
          <ProductCard />
          <Cart />
        </Grid>
        {/* product card end */}
      </Grid>
    </>
  );
}
