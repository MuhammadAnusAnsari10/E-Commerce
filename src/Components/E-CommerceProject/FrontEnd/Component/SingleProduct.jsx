import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { contextProvider } from "../../../../App";

export default function SingleProduct() {
  const { setAppActions, appActions } = useContext(contextProvider);
  // const singleProduct = isProducts.filter((item) =>)
  console.log(appActions);

  return <></>;
}
