import React, { useEffect, useState, useContext, createContext } from "react";
import { contextProvider } from "../../../../App";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import AppleIcon from "@mui/icons-material/Apple";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import BentoIcon from "@mui/icons-material/Bento";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import CakeIcon from "@mui/icons-material/Cake";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Checkbox,
  useMediaQuery,
  useTheme,
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListSubheader,
  Grid,
  Drawer,
  ListItem,
} from "@mui/material";

// firebase code//////////////
import { db } from "../../../FireBase/FireBaseConfig";
import { doc, getDocs, collection } from "firebase/firestore";

export const categoryContextProvider = createContext();

export default function SideBar() {
  const [open, setOpen] = React.useState(true);
  const [searchProduct, setSearchProduct] = useState("");

  const {
    setAppActions,
    categories,
    setCategories,
    checkCategory,
    setCheckCategory,
  } = useContext(contextProvider);
  const handleClick = () => {
    setOpen(!open);
  };
  const iconSize = "small";
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, "Category");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesData = categoriesSnapshot.docs.map((doc) => doc.data());
        setCategories(categoriesData);
        localStorage.setItem(
          "productCategories",
          JSON.stringify(categoriesData)
        );
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  // const categoriesItems = [
  //   {
  //     catName: "Fruits & Vegetables",
  //     catIcon: <AppleIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Meat & Fish",
  //     catIcon: <KebabDiningIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Snacks",
  //     catIcon: <LocalCafeIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Pet Care",
  //     catIcon: <BentoIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Home & Cleaning",
  //     catIcon: <SanitizerIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Dairy",
  //     catIcon: <SendIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Cooking",
  //     catIcon: <SendIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "BreakFast",
  //     catIcon: <CakeIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Beverage",
  //     catIcon: <SendIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  //   {
  //     catName: "Health & Beauty",
  //     catIcon: <LocalHospitalIcon fontSize={iconSize} />,
  //     catPath: "/",
  //   },
  // ];

  const productCategories = localStorage.getItem("productCategories");
  const filteredCategories = productCategories
    ? JSON.parse(productCategories)
    : [];
  const categoriesList = Array.isArray(filteredCategories)
    ? filteredCategories
    : [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const drawerContent = (
    <Box sx={{ padding: "1rem", width: 250 }}>
      <Typography variant="h6">Categories:</Typography>
      <List>
        {categoriesList.map((item) => (
          <ListItem key={item.categoryId}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkCategory.includes(item.categoryName)}
                  onChange={() => {
                    if (checkCategory.includes(item.categoryName)) {
                      setCheckCategory((prev) =>
                        prev.filter(
                          (category) => category !== item.categoryName
                        )
                      );
                    } else {
                      setCheckCategory((prev) => [...prev, item.categoryName]);
                    }
                  }}
                />
              }
              label={item.categoryName}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        id="filled-basic"
        label="Search By Categories"
        variant="filled"
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        sx={{ marginTop: "1rem" }}
      />
    </Box>
  );

  return (
    <>
      <categoryContextProvider.Provider
        value={{ categories, setCategories }}
      ></categoryContextProvider.Provider>
      <Grid container>
        <Grid item xs={3}>
          {isMobile ? (
            <>
              <Button
                onClick={toggleDrawer}
                sx={{
                  marginBottom: "1rem",
                  bgcolor: "#F3F4F6",
                  color: "white",
                  bgcolor: "seagreen",
                  "&:hover": {
                    bgcolor: "seagreen",
                    color: "white",
                  },
                }}
              >
                <FilterAltIcon />
                Filter
              </Button>
              <Drawer anchor="bottom" open={openDrawer} onClose={toggleDrawer}>
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Box sx={{ fontWeight: "bold" }}>
              <Typography variant="h6">Categories:</Typography>
              <FormGroup>
                {filteredCategories.map((item) => (
                  <FormControlLabel
                    key={item.categoryId}
                    control={
                      <Checkbox
                        checked={checkCategory.includes(item.categoryName)}
                        onChange={() => {
                          if (checkCategory.includes(item.categoryName)) {
                            setCheckCategory((prev) =>
                              prev.filter(
                                (category) => category !== item.categoryName
                              )
                            );
                          } else {
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
                ))}
              </FormGroup>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}
