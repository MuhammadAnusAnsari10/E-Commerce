import React, { useState, useEffect } from "react";
import { storage } from "../Components/FireBase/FireBaseConfig";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function Images() {
  const [isFile, setIsFile] = useState(null);
  const [imageURLS, setImageURLs] = useState([]);

  const uploadImageHandler = async () => {
    if (!isFile) {
      alert("Please select an image to upload.");
      return;
    }

    const imageRef = ref(storage, `Images/${v4()}${isFile.name}`);

    await uploadBytes(imageRef, isFile);
    await updateImageURLs(); // Refresh image URL list after upload
  };

  const updateImageURLs = async () => {
    const listResult = await listAll(ref(storage, "Images"));
    const urls = await Promise.all(
      listResult.items.map((itemRef) => getDownloadURL(itemRef))
    );
    setImageURLs(urls);
  };

  useEffect(() => {
    updateImageURLs(); // Fetch image URLs on component mount
  }, []);

  return (
    <>
      <input
        multiple
        type="file"
        onChange={(e) => setIsFile(e.target.files[0])}
      />
      <button onClick={uploadImageHandler}>upload image</button>
      {imageURLS.length > 0 && (
        <div>
          {imageURLS.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded Image ${index + 1}`}
              width={400}
            />
          ))}
        </div>
      )}
    </>
  );
}
