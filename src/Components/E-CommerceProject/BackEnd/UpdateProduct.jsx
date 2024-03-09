import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Button,
  colors,
  Select,
  TextField,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { doc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../FireBase/FireBaseConfig";
import { collection, addDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProduct() {
  const [productInfo, setProductInfo] = useState({
    productTitle: "",
    productDescription: "",
    productPrice: "",
    productImageName: "",
    userRoll: 1,
  });
  const [categories, setCategories] = useState([]);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const editProduct = localStorage.getItem("currentEditProduct");
  const edibtn = JSON.parse(editProduct);
  console.log(edibtn);
  useEffect(() => {
    if (edibtn) {
      setProductInfo({
        ...productInfo,
        productId: edibtn.productId,
        productTitle: edibtn.productTitle,
        productDescription: edibtn.productDescription,
        productPrice: edibtn.productPrice,
        productCategory: edibtn.productCategory,
        userRoll: 1,
      });
    }
  }, []);
  console.log(productInfo);

  // Product State//////////////

  // update Data To fireStore///////////
  //   const addProductData = async () => {
  //     // add data to fire store
  //     let docID;
  //     try {
  //       const currentDate = new Date();
  //       const year = currentDate.getFullYear();
  //       const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  //       const day = currentDate.getDate();
  //       const formattedDate = `${day.toString().padStart(2, "0")}-${month
  //         .toString()
  //         .padStart(2, "0")}-${year}`;

  //       const docRef = await addDoc(collection(db, "Products"), {
  //         productTitle: productInfo.productTitle,
  //         productDescription: productInfo.productDescription,
  //         productPrice: productInfo.productPrice,
  //         productImageName: productInfo.productImageName.name,
  //         productId: v4(),
  //         userRoll: 1,
  //         productCategory: selectedCategory,
  //         dateCreated: formattedDate,
  //       });
  //       docID = docRef.id;

  //       setProductInfo({
  //         productTitle: "",
  //         productDescription: "",
  //         productPrice: "",
  //         productImageName: "",
  //         userRoll: 1,
  //       });
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }

  //     // /////////add image to stoage//////////////////////////

  //     const collectionRef = doc(db, "Products", `${docID}`);
  //     const file = productInfo.productImageName;
  //     if (!file) return;
  //     const storageRef = ref(storage, `images/${file.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         console.log(snapshot);
  //       },
  //       (error) => {
  //         alert(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           await updateDoc(collectionRef, {
  //             imageurl: downloadURL,
  //           });
  //         });
  //       }
  //     );
  //   };

  const UpdateProducts = async () => {
    const updateRef = doc(db, "Products", productInfo.productId);

    await updateDoc(updateRef, {
      productTitle: productInfo.productTitle,
      productDescription: productInfo.productDescription,
      productPrice: productInfo.productPrice,
      // imageurl: productInfo.productImageName,
      productCategory: selectedCategory,
    });
    console.log(productInfo.productImageName);

    const storageRef = ref(
      storage,
      `images/${productInfo.productImageName.name}`
    );
    const uploadTask = uploadBytes(storageRef, productInfo.productImageName);

    try {
      await uploadTask;
      const url = await getDownloadURL(storageRef);
      const updatedImage = doc(db, "Products", productInfo.productId);
      await updateDoc(updatedImage, {
        imageurl: url,
      });
      console.log("Image URL:", url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    localStorage.clear();
  };

  // for select option////////////////
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // fetch Data////////////////////
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
  return (
    <>
      <ToastContainer />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            label="Product Title :"
            id="fullWidth"
            margin="dense"
            value={productInfo.productTitle}
            onChange={(e) =>
              setProductInfo({ ...productInfo, productTitle: e.target.value })
            }
          />
          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Product Short Description :"
            id="fullWidth"
            margin="dense"
            value={productInfo.productDescription}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                productDescription: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="dense"
            label="$ Price :"
            value={productInfo.productPrice}
            onChange={(e) =>
              setProductInfo({ ...productInfo, productPrice: e.target.value })
            }
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {productInfo.productCategory}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.categoryId}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              marginTop: "2%",
              backgroundColor: "#009f7f",
              color: "white",
              "&:hover": { backgroundColor: "#009f7f", color: "white" },
            }}
          >
            Product Image
            <VisuallyHiddenInput
              type="file"
              required
              onChange={(e) =>
                setProductInfo({
                  ...productInfo,
                  productImageName: e.target.files[0],
                })
              }
            />
          </Button>
          <br />

          <Button
            variant="outlined"
            color="error"
            sx={{
              marginTop: "3%",
              backgroundColor: "#009f7f",
              color: "white",
              "&:hover": {
                backgroundColor: "#009f7f",
                color: "white",
              },
            }}
            onClick={UpdateProducts}
          >
            Update Product
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
