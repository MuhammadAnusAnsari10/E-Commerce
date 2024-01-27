import React, { useEffect, useContext } from "react";
import { auth } from "../../FireBase/FireBaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { contextProvider } from "../../../App";
export default function LogOut() {
  const { setIsLogin } = useContext(contextProvider);
  const navigate = useNavigate();
  useEffect(() => {
    signOut(auth).then(() => {
      setIsLogin(false);
      navigate("/");
    });
  }, []);
  return (
    <>
      <h1>Log Out</h1>
    </>
  );
}
