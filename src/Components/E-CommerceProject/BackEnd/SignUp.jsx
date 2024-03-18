import { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase/FireBaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

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

const defaultTheme = createTheme();

export default function SignUp() {
  const [userData, setUserData] = useState({
    userAuthId: "",
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    profilePic:
      "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserData((prev) => {
            return { ...prev, userAuthId: user.uid };
          });

          // Save the data in Firestore database
          const saveDataInFirebase = async () => {
            const docRef = await addDoc(collection(db, "User"), {
              userAuthId: "",
              userDocId: "",
              FirstName: userData.FirstName,
              LastName: userData.LastName,
              email: userData.email,
              password: userData.password,
              profilePic: userData.profilePic,
              userRoll: "1",
              address: "",
              gender: "",
              DOB: "",
              country: "",
              state: "",
            });

            const updatedData = doc(db, "User", docRef.id);
            await updateDoc(updatedData, {
              userAuthId: user.uid,
              userDocId: docRef.id,
            });
          };

          saveDataInFirebase();
          console.log(userData);
          navigate("/signin");
        })
        .catch((error) => {
          const errorCode = error.code;
        });

      // const updatedData = doc(db, "User", docRef.id);
      // await updateDoc(updatedData, {
      //   userDocId: docRef.id,
      // });
      // localStorage.setItem("currentUser", JSON.stringify(userData));

      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // useEffect(() => {
  // localStorage.setItem("currentUser", JSON.stringify(userData));
  // localStorage.setItem('currentUserDocId',JSON.stringify(userDocId))
  // }, [userData]);

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={userData.FirstName}
                  onChange={(e) =>
                    setUserData({ ...userData, FirstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userData.LastName}
                  onChange={(e) =>
                    setUserData({ ...userData, LastName: e.target.value })
                  }
                />
              </Grid>
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
              Sign Up
            </Button>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item>
                <Link to="/signin">
                  <Button>Already have an account? Sign in</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
