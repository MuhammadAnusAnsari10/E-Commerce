import React, { useEffect, useState } from "react";
import {
  Grid,
  Select,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Box from "@mui/material/Box";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../FireBase/FireBaseConfig";
export default function UserInfo() {
  const [generalInfo, setGenaralInfo] = useState({
    userAuthId: "",
    UserDocId: "",
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    profilePic: "",
    userRoll: "1",
    address: "",
    gender: "",
    DOB: {},
    country: "",
    state: "",
  });

  useEffect(() => {
    const getData = localStorage.getItem("currentUser");
    const {
      userDocId,
      FirstName,
      LastName,
      email,
      password,
      profilePic,
      DOB,
      country,
      state,
      address,
      gender,
    } = JSON.parse(getData);
    setGenaralInfo((prevState) => {
      return {
        ...prevState,
        UserDocId: userDocId,
        FirstName: FirstName,
        LastName: LastName,
        email: email,
        password: password,
        profilePic: profilePic,
        address: address,
        gender: gender,
        DOB: DOB,
        country: country,
        state: state,
      };
    });
  }, []);

  const handleInputChanges = (event) => {
    setGenaralInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const updateHandler = async () => {
    const updateRef = doc(db, "User", generalInfo.UserDocId);

    await updateDoc(updateRef, {
      FirstName: generalInfo.FirstName,
      LastName: generalInfo.LastName,
      email: generalInfo.email,
      password: generalInfo.password,
      address: generalInfo.address,
      gender: generalInfo.gender,
      DOB: generalInfo.DOB,
      country: generalInfo.country,
      state: generalInfo.state,
    });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...generalInfo,
        DOB: generalInfo.DOB,
        address: generalInfo.address,
        gender: generalInfo.gender,
        country: generalInfo.country,
        state: generalInfo.state,
      })
    );
  };

  const handleDateChange = (e) => {
    console.log(e);

    setGenaralInfo((prev) => ({
      ...prev,
      DOB: e.target.value,
    }));
  };

  console.log(generalInfo);

  return (
    <>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <h2>General Information:</h2>
          <Grid container>
            {/* first and last name  start*/}
            <Grid item xs={12}>
              <TextField
                placeholder="First Name"
                name="FirstName"
                value={generalInfo.FirstName}
                sx={{ width: "30%", marginRight: "3%" }}
                onChange={handleInputChanges}
              ></TextField>
              <TextField
                placeholder="Last Name"
                name="LastName"
                value={generalInfo.LastName}
                sx={{ width: "30%" }}
                onChange={handleInputChanges}
              ></TextField>
            </Grid>
            {/* first and last name  end*/}

            {/* email and password  start*/}
            <Grid item xs={12} sx={{ marginTop: "1%" }}>
              <TextField
                placeholder="Enter Your Email"
                sx={{ width: "30%", marginRight: "3%" }}
                name="email"
                value={generalInfo.email}
                onChange={handleInputChanges}
              ></TextField>
              <TextField
                placeholder="Enter Your Password"
                sx={{ width: "30%" }}
                name="password"
                value={generalInfo.password}
                onChange={handleInputChanges}
              ></TextField>
            </Grid>
            {/* email and password  end*/}

            {/* D.O.B and gender  start*/}
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1%",
                }}
              >
                <FormControl
                  style={{ width: "150px", marginRight: "1%", marginTop: "1%" }}
                >
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={generalInfo.gender}
                    label="Gender"
                    onChange={handleInputChanges}
                    name="gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DateField"]}
                    sx={{ width: "31%" }}
                  >
                    <input
                      type="date"
                      value={generalInfo.DOB}
                      onChange={handleDateChange}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "16px",
                        // width: "100%",
                        fontSize: "16px",
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </Grid>
            {/* D.O.B and gender end*/}

            {/* address start  */}
            <Grid item xs={12}>
              <h2>Address:</h2>
              <TextField
                placeholder="Enter Your Address"
                sx={{ width: "65%" }}
                name="address"
                value={generalInfo.address}
                onChange={handleInputChanges}
              ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "1%" }}>
              <TextField
                placeholder="Enter Your Country"
                sx={{ width: "30%", marginRight: "3%" }}
                name="country"
                value={generalInfo.country}
                onChange={handleInputChanges}
              ></TextField>
              <TextField
                placeholder="Enter Your State"
                sx={{ width: "30%" }}
                name="state"
                onChange={handleInputChanges}
                value={generalInfo.state}
              ></TextField>
            </Grid>
            {/* address end  */}
          </Grid>

          {/* update button start */}
          <Button
            variant="contained"
            sx={{ marginTop: "1%" }}
            onClick={updateHandler}
          >
            Update Info
          </Button>
          {/* update button end */}
        </Grid>
      </Grid>
    </>
  );
}
