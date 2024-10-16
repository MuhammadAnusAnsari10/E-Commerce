import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  TextField,
  Dialog,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";

export const ContactNumber = () => {
  const CircleNumber = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    background-color: #009f7f;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  `;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (number) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={9}
          md={10}
          lg={10}
          sx={{ backgroundColor: "white", fontFamily: "sans-serif" }}
        >
          <Box
            sx={{
              padding: "20px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CircleNumber>1</CircleNumber>
              <span style={{ fontSize: "22px" }}>Contact Number</span>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          lg={2}
          sx={{
            backgroundColor: "white",
          }}
        >
          <Box>
            <Button
              sx={{
                color: "#009F7F",
                marginTop: { xs: 0, sm: "10%" },
                marginLeft: { xs: "4%", sm: 0 },
                marginBottom: { xs: "3%", sm: 0 },
              }}
            >
              <AddIcon />
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: "white", paddingBottom: "1%" }}>
            <PhoneInput
              country={"pk"}
              inputProps={{
                required: true,
                style: {
                  width: "90%",
                },
              }}
              variant="outlined"
              style={{
                marginLeft: "3%",
                marginBottom: "2%",
              }}
              value={phoneNumber}
              onChange={handleChange}
            />
            {!valid && <p>please enter a valid phone Number</p>}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const BillingAddress = () => {
  const CircleNumber = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    background-color: #009f7f;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  `;

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    title: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    streetAddress: "",
  });

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      title: "",
      country: "",
      city: "",
      state: "",
      zip: "",
      streetAddress: "",
    });
    handleClose();
  };

  return (
    <>
      <Grid container sx={{ backgroundColor: "white" }}>
        <Grid item xs={12} sm={9} md={10} lg={10}>
          <Box
            sx={{
              padding: "20px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CircleNumber sx={{ fontFamily: "sans-serif" }}>2</CircleNumber>
              <span style={{ fontSize: "22px", fontFamily: "sans-serif" }}>
                Billing Address{" "}
              </span>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          lg={2}
          sx={{ backgroundColor: "white" }}
        >
          <Box>
            <Button
              sx={{
                color: "#009F7F",
                marginTop: { xs: 0, sm: "10%" },
                marginLeft: { xs: "4%", sm: 0 },
                marginBottom: { xs: "3%", sm: 0 },
              }}
              onClick={handleClickOpen("paper")} // Attach handleClickOpen here
            >
              <AddIcon />
              Add
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} sx={{ margin: "0 0 3% 3%" }}>
          <Box
            sx={{
              border: "1px solid seagreen",
              padding: "11px",
              fontFamily: "sans-serif",
            }}
          >
            <h4>Billing</h4>
            <p style={{ lineHeight: "20px" }}>
              2231 Kidd Avenue, AK, Kipnuk, 99614, US
            </p>
          </Box>
        </Grid>

        {addresses.map((address, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            sx={{ marginLeft: { xs: "0", sm: "3%" }, fontFamilt: "sans-serif" }}
          >
            <Box sx={{ border: "1px solid seagreen", padding: "11px" }}>
              <h4>{address.title}</h4>
              <p>
                {address.streetAddress}, {address.city}, {address.state},{" "}
                {address.zip}, {address.country}
              </p>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* dialog box start */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container sx={{ padding: "15px 40px" }}>
          {/* heading start */}
          <Grid item xs={12}>
            <h3 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
              Add New Address
            </h3>
          </Grid>
          {/* heading end */}

          <Grid container spacing={3} sx={{ marginTop: "1%" }}>
            {/* title start */}
            <Grid item xs={12}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Title
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="title"
                value={newAddress.title}
              />
            </Grid>
            {/* title end */}

            {/* country start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Country
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="country"
                value={newAddress.country}
              />
            </Grid>
            {/* country end */}

            {/* city start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                City
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="city"
                value={newAddress.city}
              />
            </Grid>
            {/* city end */}

            {/* state start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                State
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="state"
                value={newAddress.state}
              />
            </Grid>
            {/* state end */}

            {/* zip start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Zip
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="zip"
                value={newAddress.zip}
              />
            </Grid>
            {/* zip end */}

            {/* street address start */}
            <Grid item xs={12}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Street Address
              </label>
              <textarea
                id="outlined-multiline-flexible"
                multiline
                onChange={handleChange}
                name="streetAddress"
                value={newAddress.streetAddress}
                style={{ width: "100%", height: "13vh", fontSize: "15px" }}
              />
            </Grid>
            {/* street address end */}
          </Grid>

          {/* button start */}
          <Grid item xs={12} sx={{ marginTop: "4%" }}>
            <Button
              sx={{
                width: "100%",
                bgcolor: "#009F7F",
                color: "white",
                "&:hover": {
                  bgcolor: "#009F7F",
                  color: "white",
                },
              }}
              onClick={handleAddAddress}
            >
              Add Address
            </Button>
          </Grid>
          {/* button end */}
        </Grid>
      </Dialog>
      {/* dialog box end */}
    </>
  );
};

export const ShippingAddress = () => {
  const CircleNumber = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    background-color: #009f7f;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  `;

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    title: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    streetAddress: "",
  });

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      title: "",
      country: "",
      city: "",
      state: "",
      zip: "",
      streetAddress: "",
    });
    handleClose();
  };

  return (
    <>
      <Grid container sx={{ backgroundColor: "white" }}>
        <Grid item xs={12} sm={9} md={10} lg={10}>
          <Box
            sx={{
              padding: "20px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CircleNumber sx={{ fontFamily: "sans-serif" }}>3</CircleNumber>
              <span style={{ fontSize: "22px", fontFamily: "sans-serif" }}>
                Shipping Address{" "}
              </span>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          lg={2}
          sx={{ backgroundColor: "white" }}
        >
          <Box>
            <Button
              sx={{
                color: "#009F7F",
                marginTop: { xs: 0, sm: "10%" },
                marginLeft: { xs: "4%", sm: 0 },
                marginBottom: { xs: "3%", sm: 0 },
              }}
              onClick={handleClickOpen("paper")} // Attach handleClickOpen here
            >
              <AddIcon />
              Add
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} sx={{ margin: "0 0 3% 3%" }}>
          <Box
            sx={{
              border: "1px solid seagreen",
              padding: "11px",
              fontFamily: "sans-serif",
            }}
          >
            <h4>Shipping</h4>
            <p style={{ lineHeight: "20px" }}>
              2148 Straford Park, KY, Winchester, 40391, United States
            </p>
          </Box>
        </Grid>

        {addresses.map((address, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            sx={{ marginLeft: { xs: "0", sm: "3%" }, fontFamilt: "sans-serif" }}
          >
            <Box sx={{ border: "1px solid seagreen", padding: "11px" }}>
              <h4>{address.title}</h4>
              <p>
                {address.streetAddress}, {address.city}, {address.state},{" "}
                {address.zip}, {address.country}
              </p>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* dialog box start */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container sx={{ padding: "15px 40px" }}>
          {/* heading start */}
          <Grid item xs={12}>
            <h3 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
              Add New Address
            </h3>
          </Grid>
          {/* heading end */}

          <Grid container spacing={3} sx={{ marginTop: "1%" }}>
            {/* title start */}
            <Grid item xs={12}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Title
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="title"
                value={newAddress.title}
              />
            </Grid>
            {/* title end */}

            {/* country start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Country
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="country"
                value={newAddress.country}
              />
            </Grid>
            {/* country end */}

            {/* city start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                City
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="city"
                value={newAddress.city}
              />
            </Grid>
            {/* city end */}

            {/* state start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                State
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="state"
                value={newAddress.state}
              />
            </Grid>
            {/* state end */}

            {/* zip start */}
            <Grid item xs={12} sm={6}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Zip
              </label>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                onChange={handleChange}
                name="zip"
                value={newAddress.zip}
              />
            </Grid>
            {/* zip end */}

            {/* street address start */}
            <Grid item xs={12}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Street Address
              </label>
              <textarea
                id="outlined-multiline-flexible"
                multiline
                onChange={handleChange}
                name="streetAddress"
                value={newAddress.streetAddress}
                style={{ width: "100%", height: "13vh", fontSize: "15px" }}
              />
            </Grid>
            {/* street address end */}
          </Grid>

          {/* button start */}
          <Grid item xs={12} sx={{ marginTop: "4%" }}>
            <Button
              sx={{
                width: "100%",
                bgcolor: "#009F7F",
                color: "white",
                "&:hover": {
                  bgcolor: "#009F7F",
                  color: "white",
                },
              }}
              onClick={handleAddAddress}
            >
              Add Address
            </Button>
          </Grid>
          {/* button end */}
        </Grid>
      </Dialog>
      {/* dialog box end */}
    </>
  );
};

export const DeliverySchedule = () => {
  const CircleNumber = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    background-color: #009f7f;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  `;

  return (
    <>
      <Grid
        container
        sx={{ backgroundColor: "white", fontFamily: "sans-serif" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box
            sx={{
              padding: "20px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CircleNumber>4</CircleNumber>
              <span style={{ fontSize: "22px" }}>Delivery Schedule </span>
            </Box>
          </Box>
        </Grid>

        <Grid container spacing={4} sx={{ padding: "0  3%" }}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: "#F3F4F6",
                "&:hover": {
                  border: "1px solid seagreen",
                  backgroundColor: "white",
                  transition: "0.2s",
                },
              }}
            >
              <h5>Express Delivery</h5>
              <p>90 min express delivery</p>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: "#F3F4F6",
                "&:hover": {
                  border: "1px solid seagreen",
                  backgroundColor: "white",
                  transition: "0.2s",
                },
              }}
            >
              <h5>Morning</h5>
              <p>8.00 AM - 11.00 AM</p>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: "#F3F4F6",
                "&:hover": {
                  border: "1px solid seagreen",
                  backgroundColor: "white",
                  transition: "0.2s",
                },
              }}
            >
              <h5>Noon</h5>
              <p>11.00 AM - 2.00 PM</p>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginBottom: "2%" }}>
            <Box
              sx={{
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: "#F3F4F6",
                "&:hover": {
                  border: "1px solid seagreen",
                  backgroundColor: "white",
                  transition: "0.2s",
                },
              }}
            >
              <h5>Afternoon</h5>
              <p>2.00 PM - 5.00 PM</p>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginBottom: "2%" }}>
            <Box
              sx={{
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: "#F3F4F6",
                "&:hover": {
                  border: "1px solid seagreen",
                  backgroundColor: "white",
                  transition: "0.2s",
                },
              }}
            >
              <h5>Evening</h5>
              <p>5.00 PM - 8.00 PM</p>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const OrderNote = () => {
  const CircleNumber = styled.span`
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    background-color: #009f7f;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  `;

  return (
    <>
      <Grid
        container
        sx={{ backgroundColor: "white", fontFamily: "sans-serif" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box
            sx={{
              padding: "20px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CircleNumber>5</CircleNumber>
              <span style={{ fontSize: "22px" }}>Order Note </span>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ padding: "2% 4%" }}>
          <textarea
            style={{
              width: "90%",
              height: "20vh",
              fontSize: "16px",
              fontFamily: "sans-serif",
            }}
          ></textarea>
        </Grid>
      </Grid>
    </>
  );
};

export default function CheckOut() {
  return (
    <>
      <Grid container sx={{ backgroundColor: "#F3F4F6" }}>
        <Grid item lg={8} sx={{ marginLeft: "6%", marginTop: "4%" }}>
          <ContactNumber />
          <br />
          <BillingAddress />
          <br />
          <ShippingAddress />
          <br />
          <DeliverySchedule />
          <br />
          <OrderNote />
        </Grid>
      </Grid>
    </>
  );
}
