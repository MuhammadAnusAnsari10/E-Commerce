import { Grid } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";
import ProductCard from "./ProductCard";
import Banner from "./Banner";

import Navigation from "./Navigation";
export default function Home() {
  return (
    <>
      <Grid container>
        <Grid item>
          <Banner />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={2} sx={{ marginTop: "1.5%" }}>
          <SideBar />
        </Grid>
        <Grid
          item
          lg={10}
          sx={{ bgcolor: "#eee", padding: "40px", marginTop: "2%" }}
        >
          <ProductCard />
        </Grid>
      </Grid>
    </>
  );
}
