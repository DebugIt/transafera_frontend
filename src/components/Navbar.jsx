import React, { useContext, useState } from 'react'

// icons
import { HiOutlineMenuAlt1 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { BsBank } from "react-icons/bs"

// drawer
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Usercontext from '../context/Usercontext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, setUser } = useContext(Usercontext)
    const checkUserLog = localStorage.getItem("transafera_username")
    
    const usr = localStorage.getItem("transafera_username")
    setUser(usr)

    const [open, setOpen] = useState(false);
    const list = (anchor) => (
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
          role="presentation"
          className="bg-[#cad2c5] h-[100vh]"
          style={{ fontFamily:'Playfair Display' }}
        >
          <List>
              <ListItem  disablePadding>
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ListItemIcon>
                    <AiOutlineClose size={25} className="relative top-2 left-48"/>
                  </ListItemIcon>
                  <ListItemText  />
                </ListItemButton>
              </ListItem>
              <ListItem className=''>
                {user}
              </ListItem>
          </List>
          
          <ListItem className='text-lg font-serif flex'>
            <div className='w-[85%]'>
                <Link to={"/"}>
                    Login / Signup
                </Link>
            </div>
            <div className='w-[15%] absolute right-1'>
                <BsBank size={20}/>
            </div>
          </ListItem>
          <Divider />
          <ListItem>
            <Link to={(checkUserLog === false) ? "/" : "/checkbal"}>
                Check your Balance
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link to={(checkUserLog === false) ? "/" : "/transfer"}>
                Transfer
            </Link>
          </ListItem>
          <Divider />
          <ListItem>
            <Link to={"/"} onClick={() => {localStorage.removeItem("transafera_username"); localStorage.removeItem("transafera"); localStorage.removeItem("balance")}}>
                Logout
            </Link>
          </ListItem>
          <Divider />
          
          
        </Box>
    );







  return (
    <>
        <div style={{ fontFamily:'Playfair Display' }}>
            <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
            {list()}
            </Drawer>
        </div>
        <div id="container" style={{ fontFamily:'Playfair Display' }} className='p-3 w-full sticky flex justify-end shadow-md bg-[#dad7cd] z-10'>
            <div id="menubar" className='absolute top-6 left-4' onClick={() => setOpen(!open)}>
                <HiOutlineMenuAlt1 size={25} className='text-[#354f52]'/>
            </div>
            <div id="name" className='text-4xl font-bold text-[#354f52]'>
                Transafera
            </div>
        </div>
    </>
  )
}

export default Navbar