import React, { useContext, useState } from "react";
import axios from "axios";

// spinner
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// icons
import { RiUser4Line } from "react-icons/ri";
import { FiUnlock } from "react-icons/fi";

// snackbar
import Snackbar from "@mui/material/Snackbar";
import Usercontext from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    // context
    const { user, setUser } = useContext(Usercontext)
    const navigate = useNavigate()
  // api
  const API_URL = process.env.REACT_APP_BASE_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [load, setLoad] = useState(false);

  // error
  const [errorState, setErrorState] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  // anything
  const [allstate, setAllState] = useState(false);
  const [allstateMsg, setAllStateMsg] = useState("");

  // login
  const handleLogin = async () => {
    if(username === "" || password === ""){
        setErrorState(!errorState);
        setErrormsg("Please fill all the fields");
    }else{
        try {
          console.log("Loading...");
          setLoad(true); // Set loading state to true
      
          const creds = { username, password };
          const response = await axios.post(
            `${API_URL}/api/user/login`,
            creds
          );
      

          setUser(localStorage.getItem("transafera_username"))
          setAllState(!allstate);
          setAllStateMsg(response.data?.message);
          setUsername("")
          setPassword("")
      
          setLoad(false);
          navigate("/home")

          localStorage.setItem("transafera", response.data.user?.token);
          localStorage.setItem("transafera_username", response.data.user?.username);
          localStorage.removeItem("transafera_admin");
            

        }catch (error) {
          setLoad(true);
          console.log(error.response?.data.message);
          setErrorState(!errorState);
          setErrormsg(error.response?.data.message);
          setLoad(false);
        }
    }
  };

  // signup
  const handleSignup = async () => {
    if(username === "" || password === ""){
        setErrorState(!errorState);
        setErrormsg("Please fill all the fields");
    }else{
        try {
            console.log("Loading...");
            setLoad(true); // Set loading state to true
      
            const creds = { username, password };
            const response = await axios.post(
              `${API_URL}/api/user/signup`,
              creds
            );
      
            console.log(response.data?.message);
            setAllState(!allstate);
            setAllStateMsg(response.data?.message);
            setUsername("")
            setPassword("")
      
            setLoad(false);
            localStorage.setItem("transafera", response.data.user?.token);
        } catch (error) {
            setLoad(true);
            console.log(error.response?.data.message);
            setErrorState(!errorState);
            setErrormsg(error.response?.data.message);
            setLoad(false);
        }
    }
  };

  return (
    <>
    {/* spinner */}
    {load && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 bg-gray-300">
            <CircularProgress />
        </div>
    )}
    {/* error snack */}
      <Snackbar
        open={errorState}
        autoHideDuration={4000}
        onClose={() => setErrorState(!errorState)}
        message={errormsg}
      />
    {/* message snack */}
      <Snackbar
        open={allstate}
        autoHideDuration={4000}
        onClose={() => setAllState(!allstate)}
        message={allstateMsg}
      />
      <div
        id="container"
        className="bg-[#dad7cd] w-full h-[100vh] flex justify-center items-center"
        style={{ fontFamily:'Playfair Display' }}
      >
        <div id="form" className="p-3 -mt-24">
          <div
            id="field1"
            className="flex border-[#2f3e46] border-b-2 my-4 pb-2"
          >
            <RiUser4Line size={20} className="mt-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-1 px-3 text-[#2f3e46] outline-none bg-transparent"
              placeholder="Enter Username"
            />
          </div>
          <div
            id="field1"
            className="flex border-[#2f3e46] border-b-2 my-4 pb-2"
          >
            <FiUnlock size={20} className="mt-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-1 px-3 text-[#2f3e46] outline-none bg-transparent"
              placeholder="Enter Password"
            />
          </div>
          <div id="buttons" className="flex w-full">
            <div
              className="border py-2 px-3 mx-[2px] bg-[#2f3e46] text-white rounded-sm w-full text-center"
              onClick={() => handleLogin()}
            >
              Login
            </div>
            <div
              className="border py-2 px-3 mx-[2px] bg-[#2f3e46] text-white rounded-sm w-full text-center"
              onClick={() => handleSignup()}
            >
              Signup
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
