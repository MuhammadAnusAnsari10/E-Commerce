import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import hoistNonReactStatics from "hoist-non-react-statics";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation } from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showBoxes, setShowBoxes] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = () => {
    setShowBoxes(false); // Hide boxes when a menu item is clicked
  };

  const menuItem = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Add Product",
      icon: <LocalGroceryStoreIcon />,
      path: "product",
    },
    // {
    //   text: "Order",
    //   icon: <EditNoteIcon />,
    //   path: "order",
    // },
    {
      text: "Category",
      icon: <CategoryRoundedIcon />,
      path: "category",
    },
    {
      text: "All Product",
      icon: <CollectionsIcon />,
      path: "allproduct",
    },
    // {
    //   text: "Update Product",
    //   icon: <UpdateIcon />,
    //   path: "updateProduct",
    // },

    // {
    //   text: "Coupan",
    //   icon: <ConfirmationNumberRoundedIcon />,
    //   path: "coupan",
    // },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ backgroundColor: "#009f7f" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "black", fontWeight: "bolder" }}
            >
              React E-Commerce
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItem.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to={path}
                  onClick={handleMenuItemClick} // Hide boxes on click
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        {/* Conditionally Render Shop and Add Product Boxes */}
        {showBoxes && (
          <>
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "4%",
              }}
            >
              {/* shop */}
              <Grid item lg={5} md={6} xs={12}>
                <Box
                  component={Link}
                  to="/shop"
                  onClick={() => setShowBoxes(false)}
                  sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    boxShadow: 2,
                    textDecoration: "none",
                  }}
                >
                  <HomeIcon sx={{ fontSize: 50, color: "#009F7F" }} />
                  <Typography variant="h4" sx={{ mt: 1, color: "black" }}>
                    Shop
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                    Our shop is a place where quality meets affordability.
                  </Typography>
                </Box>
              </Grid>

              {/* add product  */}
              <Grid item lg={5} md={6} xs={12}>
                <Box
                  component={Link}
                  to="product"
                  onClick={() => setShowBoxes(false)}
                  sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    boxShadow: 2,
                    textDecoration: "none",
                  }}
                >
                  <LocalGroceryStoreIcon
                    sx={{ fontSize: 50, color: "#009F7F" }}
                  />
                  <Typography variant="h4" sx={{ mt: 1, color: "black" }}>
                    Add Product
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                    Adding a product to your shop is quick and simple!
                  </Typography>
                </Box>
              </Grid>

              {/* add category */}
              <Grid item lg={5} md={6} xs={12}>
                <Box
                  component={Link}
                  to="category"
                  onClick={() => setShowBoxes(false)}
                  sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    boxShadow: 2,
                    textDecoration: "none",
                  }}
                >
                  <CategoryRoundedIcon
                    sx={{ fontSize: 50, color: "#009F7F" }}
                  />
                  <Typography variant="h4" sx={{ mt: 1, color: "black" }}>
                    Add Category
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                    Organizing your shop just got easier!
                  </Typography>
                </Box>
              </Grid>

              {/* all products */}
              <Grid item lg={5} md={6} xs={12}>
                <Box
                  component={Link}
                  to="allproduct"
                  onClick={() => setShowBoxes(false)}
                  sx={{
                    border: "1px solid #ddd",
                    padding: 2,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    boxShadow: 2,
                    textDecoration: "none",
                  }}
                >
                  <CollectionsIcon sx={{ fontSize: 50, color: "#009F7F" }} />
                  <Typography variant="h4" sx={{ mt: 1, color: "black" }}>
                    All Products
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                    We offer a diverse collection of high-quality products.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
