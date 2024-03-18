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
import Checkbox from "@mui/material/Checkbox";

import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListSubheader,
  Grid,
} from "@mui/material";
// firebase code//////////////
import { db } from "../../../FireBase/FireBaseConfig";
import { doc, getDocs, collection } from "firebase/firestore";

export const categoryContextProvider = createContext();

export default function SideBar() {
  const [open, setOpen] = React.useState(true);
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
  const categoriesItems = [
    {
      catName: "Fruits & Vegetables",
      catIcon: <AppleIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Meat & Fish",
      catIcon: <KebabDiningIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Snacks",
      catIcon: <LocalCafeIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Pet Care",
      catIcon: <BentoIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Home & Cleaning",
      catIcon: <SanitizerIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Dairy",
      catIcon: <SendIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Cooking",
      catIcon: <SendIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "BreakFast",
      catIcon: <CakeIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Beverage",
      catIcon: <SendIcon fontSize={iconSize} />,
      catPath: "/",
    },
    {
      catName: "Health & Beauty",
      catIcon: <LocalHospitalIcon fontSize={iconSize} />,
      catPath: "/",
    },
  ];
  return (
    <>
      <categoryContextProvider.Provider
        value={{ categories, setCategories }}
      ></categoryContextProvider.Provider>
      <Grid container>
        <Grid item xs={3}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {categories.map((item) => (
              // <FormGroup key={item.categoryId}>
              //   <FormControlLabel
              //     control={
              //       <Checkbox
              //         onClick={(e) =>
              //           setAppActions((prevState) => ({
              //             ...prevState,
              //             selectedCategory: e.target.innerText,
              //           }))
              //         }
              //       />
              //     }
              //     label={
              //       <Typography variant="body2" component="span">
              //         {item.categoryName}
              //       </Typography>
              //     }
              //   />
              // </FormGroup>
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
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
