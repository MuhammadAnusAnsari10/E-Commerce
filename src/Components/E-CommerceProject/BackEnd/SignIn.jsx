import { useEffect, useState, useContext } from "react";
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../FireBase/FireBaseConfig";
import { useNavigate } from "react-router-dom";
import Home from "../FrontEnd/Component/Home";
import { contextProvider } from "../../../App";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const { setIsLogin } = useContext(contextProvider);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setIsLogin(true);

        // console.log(allUsers);
        const currentUser = allUsers.filter(
          (singleUser) => singleUser.userAuthId === user.uid
        );
        localStorage.setItem("currentUser", JSON.stringify(currentUser[0]));
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const UsersCollection = collection(db, "User");
        const UsersSnapshot = await getDocs(UsersCollection);
        const UsersData = UsersSnapshot.docs.map((doc) => doc.data());
        setAllUsers(UsersData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchUsers();
  }, []);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SignIn
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SignIn
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
