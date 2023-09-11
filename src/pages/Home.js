import React, { useState } from 'react'
// snackbar
import Snackbar from "@mui/material/Snackbar";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const checkUserLog = localStorage.getItem("transafera_username")
    if(!checkUserLog){
        navigate("/")
    }
  return (
    <>
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(!open)}
            message="Under Development will be out soon!"
        />
        <div className="bg-[#dad7cd] w-full h-[100vh] py-5 px-3 " style={{ fontFamily:'Playfair Display' }}>
            <div className='md:flex flex-wrap'>
                <div id="checkBalanceTile" className='border py-3 px-3 my-1 mx-1 bg-[#2f3e46] text-[#cad2c5] rounded'>
                    <Link to={"/checkbal"}>
                        Check your balance
                    </Link>
                </div>
                <div id="checkBalanceTile" className='border py-3 px-3 my-1 mx-1 bg-[#2f3e46] text-[#cad2c5] rounded'>
                    <Link to={"/transfer"}>
                        Transfer
                    </Link>
                </div>
                <div id="checkBalanceTile" className='border py-3 px-3 my-1 mx-1 bg-[#2f3e46] text-[#cad2c5] rounded' onClick={() => setOpen(!open)}>
                    Request
                </div>
            </div>
        </div>
    </>
  )
}

export default Home