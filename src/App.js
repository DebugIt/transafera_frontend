import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Usercontext from "./context/Usercontext";
import Home from "./pages/Home";
import Checkbal from "./pages/Checkbal";
import Transfer from "./pages/Transfer";
import NotFound from "./pages/NotFound";
import AdminAuth from "./pages/AdminAuth";


function App() {
  const [user, setUser] = useState()
  const [admin, setAdmin] = useState()
  
  return (
    <>
      <Usercontext.Provider value={{ user, setUser, admin, setAdmin }}>
        <Router>
          <Navbar />
            <Routes>
              <Route path="/" element={<Auth />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/checkbal" element={<Checkbal />}/>
              <Route path="/transfer" element={<Transfer />}/>
              {/* Admin */}
              <Route path="/admin/auth" element={<AdminAuth />}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
        </Router>
        
        
      </Usercontext.Provider>
    </>
  );
}

export default App;
