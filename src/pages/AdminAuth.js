import React, { useContext, useState } from "react";
import axios from "axios";

// spinner
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// icons
import { RiUser4Line } from "react-icons/ri";
import { FiUnlock } from "react-icons/fi";
// icons
import { BsFillPersonFill, BsFillPersonVcardFill } from "react-icons/bs"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { BiTransferAlt } from "react-icons/bi"

// snackbar
import Snackbar from "@mui/material/Snackbar";
import Usercontext from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
    // context
    const { user, setUser, admin, setAdmin } = useContext(Usercontext)
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

    // admin authed
    const [showcontent, setShowContent] = useState(false);
    const [showTransferToggle, setShowTransferToggle] = useState(false);
    // admin transfers
    const [amount, setAmount] = useState(0)
    const [receiver, setReciever] = useState("")

    const [snackField, setSnackField] = useState(false)

    const [anyfield, setAnyField] = useState(false)
    const [anyfieldMsg, setAnyFieldMsg] = useState("")

    const initiateTransfer = async () => {
        if(receiver === ""  || (amount <= 0 )){
            setSnackField(!snackField)
        }
        else{
        try {
            const inputs = {
            amount,
            receiver
            }
            const response = await axios.put(`${API_URL}/api/admin/transfer`, inputs, {
            headers: {
                'token': localStorage.getItem('transafera')
            }
            });

            setAmount(0);
            setReciever("");

            
            setAnyField(!anyfield);
            setAnyFieldMsg(response.data.message)
        } catch (error) {
            
            setAnyField(!anyfield);
            setAnyFieldMsg(error.response?.data.message);
        }
        }
    }
        

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
                `${API_URL}/api/admin/login`,
                creds
            );
        

            setAdmin(localStorage.getItem("transafera_admin"))
            setAllState(!allstate);
            setAllStateMsg(response.data?.message);
            setUsername("")
            setPassword("")
        
            setLoad(false);
            // FIXME:
            setShowContent(!showcontent);

            localStorage.setItem("transafera", response.data.admin?.token);
            localStorage.setItem("transafera_admin", response.data.admin?.username);
            localStorage.removeItem("transafera_username");
                

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
                `${API_URL}/api/admin/signup`,
                creds
                );
        
                console.log(response.data?.message);
                setAllState(!allstate);
                setAllStateMsg(response.data?.message);
                setUsername("")
                setPassword("")
        
                setLoad(false);
                localStorage.setItem("transafera", response.data.admin?.token);
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
      {/* signup container */}
      {
        !showcontent ? (
            <>
                <div
                    id="container"
                    className="bg-[#dad7cd] w-full h-[100vh] flex flex-col justify-center items-center"
                    style={{ fontFamily:'Playfair Display' }}
                >
                    <div id="form" className="p-3 -mt-24">
                        <p className="text-3xl text-center">Admin</p>
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
        ) : (
            <>
                <div id="checkBalanceTile" onClick={() => setShowTransferToggle(!showTransferToggle)} className='border py-3 px-3 my-1 mx-1 bg-[#2f3e46] text-[#cad2c5] rounded'>
                    Transfer
                </div>

                {
                    showTransferToggle ? (
                        <>
                            <Snackbar
                                open={snackField}
                                autoHideDuration={4000}
                                onClose={() => setSnackField(!snackField)}
                                message="Please Fill all the fields"
                            />

                            <Snackbar
                                open={anyfield}
                                autoHideDuration={4000}
                                onClose={() => setAnyField(!anyfield)}
                                message={anyfieldMsg}
                            />
                            <div id="container" className="bg-[#dad7cd] w-full h-[100vh] pt-4 flex flex-col items-center" style={{ fontFamily:'Playfair Display' }}>
                                <div id="heading" className='text-3xl text-[#344e41] font-semibold text-center '>Transfer</div>
                                <div id="card" className="bg-[#344e41] text-white rounded-lg md:w-[30%] p-2 mt-7 flex justify-center items-center">
                                <div id="inner-card" className='border border-dashed w-full p-5 flex flex-col items-center'>
                                    {/* amount, reciever, sender */}
                                    <div id="reciever" className='flex w-full border-[#a3b18a] border-b-2 py-1 px-1 my-1 text-black bg-[#dad7cd] outline-none'>
                                        <BsFillPersonVcardFill size={25} className='mt-1 mx-2 text-[#344e41]'/>
                                        <input type="text" value={receiver} onChange={(e) => setReciever(e.target.value)} placeholder='Enter Reciever Username' className='w-full py-1 px-1 text-black bg-[#dad7cd] outline-none'/>
                                    </div>

                                    <div id="currentuser" className='flex w-full border-[#a3b18a] border-b-2 py-1 px-1 my-1 text-black bg-[#dad7cd] outline-none'>
                                        <FaMoneyBillTransfer size={25} className='mt-1 mx-2 text-[#344e41]'/>
                                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' className='w-full py-1 px-1 text-black bg-[#dad7cd] outline-none'/>
                                    </div>

                                    <div id="currentuser" onClick={() => initiateTransfer()} className='flex justify-center items-center w-full py-1 px-1 my-1 text-[#344e41] bg-[#a3b18a] outline-none'>
                                        <button >Transfer</button>
                                        <BiTransferAlt size={25} className='mt-1 mx-2 text-[#344e41]'/>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                        </>
                    ) : ("")
                }
            </>
        )
      }
    </>
  );
};

export default AdminAuth;
