// import React, { useContext, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import { Link } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../../FireBase/FireBaseConfig";
// import { contextProvider } from "../../../../App";

// const pages = ["Dashboard", "Shop", "Products"];
// const settings = [
//   {
//     text: "Profile",
//     path: "profile",
//   },
//   {
//     text: "Account",
//     path: "account",
//   },
//   {
//     text: "Dashboard",
//     path: "dashboard",
//   },
//   {
//     text: "Logout",
//     path: "logout",
//   },
// ];

// function Navigation() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const { isLogin, setIsLogin } = useContext(contextProvider);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setIsLogin(true);
//     } else {
//       console.log("user not logged in");
//     }
//   });
//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#eee", color: "black" }}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AddShoppingCartIcon
//             sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
//           />
//           {/* logo start */}
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             PickBazar
//           </Typography>
//           {/* logo end */}

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", md: "flex", textAlign: "center" },
//               justifyContent: "center",
//             }}
//           >
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{
//                   my: 2,
//                   color: "black",
//                   display: "block",
//                 }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>
//           {isLogin == true ? (
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="a" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: "45px" }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 {settings.map(({ text, path }, index) => (
//                   <MenuItem key={index} onClick={handleCloseUserMenu}>
//                     <Typography textAlign="center" to={path} component={Link}>
//                       {text}
//                     </Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           ) : (
//             <Link to="/signup">
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "seagreen",
//                   marginRight: "1%",
//                   "&:hover": {
//                     backgroundColor: "seagreen",
//                   },
//                 }}
//               >
//                 Join
//               </Button>
//             </Link>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default Navigation;

import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../FireBase/FireBaseConfig";
import { contextProvider } from "../../../../App";
import UserInfo from "./UserInfo"; // Import UserInfo component

const pages = ["Dashboard", "Shop", "Products"];
const settings = [
  {
    text: "Profile",
    path: "profile",
  },
  {
    text: "Account",
    path: "account",
  },
  {
    text: "Dashboard",
    path: "dashboard",
  },
  {
    text: "Logout",
    path: "logout",
  },
];

function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLogin, setIsLogin } = useContext(contextProvider);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (event.currentTarget.id === "account") {
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      console.log("user not logged in");
    }
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: "#eee", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddShoppingCartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          {/* logo start */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PickBazar
          </Typography>
          {/* logo end */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", textAlign: "center" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isLogin == true ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="a" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ text, path }, index) => (
                  <MenuItem key={index} id={path} onClick={handleOpenUserMenu}>
                    <Typography textAlign="center" to={path} component={Link}>
                      {text}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Link to="/signup">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "seagreen",
                  marginRight: "1%",
                  "&:hover": {
                    backgroundColor: "seagreen",
                  },
                }}
              >
                Join
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;
