import React, { useContext, useEffect, useState } from 'react'
import Usercontext from '../context/Usercontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Checkbal = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(Usercontext)
    // api
    const API_URL = process.env.REACT_APP_BASE_URL;

    const initialBalance = localStorage.getItem('balance') || 0;
    const [balance, setBalance] = useState(Number(initialBalance));

    const checkUserLog = localStorage.getItem("transafera_username")
    if(!checkUserLog){
        navigate("/")
    }

    const getBalance = async () => {
        const heaederToken = localStorage.getItem('transafera');
        try {
        const response = await axios.get(`${API_URL}/api/user/getbalance/${user}`, {
            headers: {
            'Content-Type': 'application/json',
            token: heaederToken,
            },
        });
        const newBalance = response.data?.balance;
        setBalance(newBalance);

        // Store the new balance in localStorage
        localStorage.setItem('balance', newBalance);
        } catch (error) {
        console.log(error);
        }
    };


    useEffect(() => {
        console.log(user)
        getBalance()
    }, [])
    

  return (
    <>
        <div id="container" className="bg-[#dad7cd] w-full h-[100vh] pt-4 flex-col" style={{ fontFamily:'Playfair Display' }}>
            <p className='text-center text-xs px-2 mx-2 my-2'>If the Balance is not updated. Kindly move back a page and re-enter this one</p>
            <div id="card" className='border  p-3 mx-3  bg-[#2f3e46] text-[#dad7cd]'>
                <div className='text-center py-3'>Account Balance for {user}</div>
                <hr className='pb-3'/>
                Available Balance : {balance}
            </div>
            <hr className='my-5 border border-[#2f3e46]'/>
            <div className='text-center my-2 font-semibold'>Explore more</div>
            <div id="checkBalanceTile" className='border py-3 px-3 my-1 mx-3 bg-[#2f3e46] text-[#cad2c5] rounded'>
                Transfer
            </div>
            <div id="checkBalanceTile" className='border py-3 px-3 my-1 mx-3 bg-[#2f3e46] text-[#cad2c5] rounded'>
                Your Profile
            </div>
        </div>
    </>
  )
}

export default Checkbal