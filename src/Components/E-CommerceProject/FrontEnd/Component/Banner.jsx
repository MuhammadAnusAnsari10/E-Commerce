import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

export default function Banner() {
  const imageURL = "../../../../../public/assets/images/grocery.webp";

  const BackgroundImage = styled("div")({
    backgroundImage: `url(${imageURL})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "fixed",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundPositionY: "-50px",
  });

  // const SearchBarContainer = styled("div")({
  //   display: "flex",
  //   borderRadius: "4px",
  //   padding: "10px",
  //   width: "100%",
  //   boxShadow: " 0 0 5px #dadada",
  // });

  const SearchBarField = styled("input")({
    padding: "15px",
    width: "57%",
    // marginTop: "4%",
    // height: "5vh",
    borderRadius: " 15px 0 0 15px",
    fontSize: "17px",
    boxShadow: "0 0 20px #eee",
    borderStyle: "none",
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 10px green",
    },
  });

  const SearchButton = styled("a")({
    padding: "13px 22px",
    backgroundColor: "seagreen",
    boxShadow: "0 0 20px #eee",
    borderRadius: "0 15px 15px 0",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <>
      <BackgroundImage>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              {/* main heading start */}
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  color: "#1F2937",
                  fontWeight: "bolder",
                }}
              >
                Groceries Delivered in 90 Minutes
              </Typography>
              {/* main heading end */}

              {/* main para start */}

              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: "2%",
                  color: "#1F2937",
                  fontSize: "18px",
                }}
              >
                Get your healthy foods & snacks delivered at your doorsteps all
                day every day
              </Typography>
              {/* main para end */}
            </Grid>

            {/*  button and searchBar start */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              <SearchBarField placeholder="Search Your Product From Here :"></SearchBarField>
              <SearchButton>
                <SearchIcon />
                Search
              </SearchButton>
            </Grid>
            {/*  button and searchBar end */}
          </Grid>
        </Box>
      </BackgroundImage>
      <Grid container spacing={3} marginTop="1%">
        <Grid item sm={12} md={4} lg={4}>
          <img
            src="../../../../../public/assets/images/card-img-1.webp"
            width="100%"
          ></img>
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <img
            src="../../../../../public/assets/images/card-img-2.webp"
            width="100%"
          ></img>
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <img
            src="../../../../../public/assets/images/card-img-3.webp"
            width="100%"
          ></img>
        </Grid>
      </Grid>
    </>
  );
}

{
  /* <Background></Background> */
}
{
  /* <SearchBarContainer>
 
  
</SearchBarContainer> */
}
