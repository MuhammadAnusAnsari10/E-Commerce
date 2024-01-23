import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
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
import { Typography } from "@mui/material";
// firebase code//////////////
import { db } from "../../../FireBase/FireBaseConfig";
import { doc, getDocs, collection } from "firebase/firestore";
export default function SideBar() {
  const [open, setOpen] = React.useState(true);
  const [categories, setCategories] = useState([]);
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
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {categories.map((item) => (
          <ListItemButton key={item.categoryId}>
            <ListItemIcon
              sx={{
                minWidth: "35px",
              }}
            >
              {item.catIcon}
            </ListItemIcon>
            <Typography fontSize="small" component="small">
              {item.categoryName}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
