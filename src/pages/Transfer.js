import React, { useState } from 'react'

// snackbar
import Snackbar from "@mui/material/Snackbar";

// icons
import { BsFillPersonFill, BsFillPersonVcardFill } from "react-icons/bs"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { BiTransferAlt } from "react-icons/bi"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {

  const [currentuser, setCurrentUser] = useState(localStorage.getItem("transafera_username"))
  const [amount, setAmount] = useState(0)
  const [receiver, setReciever] = useState("")

  const [snackField, setSnackField] = useState(false)

  const [anyfield, setAnyField] = useState(false)
  const [anyfieldMsg, setAnyFieldMsg] = useState("")

  const navigate = useNavigate()
  const checkUserLog = localStorage.getItem("transafera_username")
  if(!checkUserLog){
    navigate("/")
  }

  // api
  const API_URL = process.env.REACT_APP_BASE_URL;

  const initiateTransfer = async () => {
    if(currentuser === "" || receiver === ""  || (amount <= 0 )){
      setSnackField(!snackField)
    }
    else{
      try {
        const inputs = {
          amount,
          currentuser,
          receiver
        }
        const response = await axios.put(`${API_URL}/api/user/transfer`, inputs, {
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



  return (
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
            <div id="currentuser" className='flex w-full border-[#a3b18a] border-b-2 py-1 px-1 my-1 text-black bg-[#dad7cd] outline-none'>
              <BsFillPersonFill size={25} className='mt-1 mx-2 text-[#344e41]'/>
              <input type="text" value={currentuser} onChange={(e) => setCurrentUser(e.target.value)} placeholder='Enter Your Id' disabled className='w-full py-1 px-1 cursor-not-allowed text-black bg-[#dad7cd] outline-none'/>
            </div>

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
  )
}

export default Transfer