import { TextField, Grid, Button } from "@mui/material";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../FireBase/FireBaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { v4 } from "uuid";
export default function Category() {
  const [category, setCategory] = useState("");

  const addCategory = async () => {
    try {
      const docRef = await addDoc(collection(db, `Category`), {
        categoryName: category,
        categoryId: v4(),
      });
      console.log("Document added with ID: ", docRef.id);
      setCategory("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <TextField
            fullWidth
            margin="dense"
            label="Category:"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Button
            variant="outlined"
            color="error"
            sx={{ marginTop: "3%", backgroundColor: "black" }}
            onClick={addCategory}
          >
            Add Category
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
