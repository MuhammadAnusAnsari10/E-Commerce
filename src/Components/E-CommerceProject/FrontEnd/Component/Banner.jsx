import React from "react";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

// Import images directly
import groceryImage from "/assets/images/grocery.webp";
import cardImg1 from "/assets/images/card-img-1.webp";
import cardImg2 from "/assets/images/card-img-2.webp";
import cardImg3 from "/assets/images/card-img-3.webp";

export default function Banner() {
  // const BackgroundImage = styled("div")({
  //   backgroundImage: `url(${groceryImage})`,
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "fixed",
  //   backgroundSize: "cover",
  //   width: "100%",
  //   height: "100vh",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundPositionY: "-50px",
  // });

  const SearchBarField = styled("input")({
    padding: "15px",
    width: "57%",
    borderRadius: "15px 0 0 15px",
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
    backgroundColor: "#019376",
    boxShadow: "0 0 20px #eee",
    borderRadius: "0 15px 15px 0",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <>
      {/* <BackgroundImage>
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
            </Grid>

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
          </Grid>
        </Box>
      </BackgroundImage> */}

      <div
        style={{
          backgroundImage: `url(${groceryImage})`,
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
        }}
      >
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
            </Grid>

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
          </Grid>
        </Box>
      </div>

      <Grid container spacing={3} marginTop="1%">
        <Grid item sm={12} md={4} lg={4}>
          <img src={cardImg1} width="100%" alt="Card 1" />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <img src={cardImg2} width="100%" alt="Card 2" />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <img src={cardImg3} width="100%" alt="Card 3" />
        </Grid>
      </Grid>
    </>
  );
}
