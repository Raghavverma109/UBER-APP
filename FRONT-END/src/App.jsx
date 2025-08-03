import React, { use } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { UserDataContext } from './context/UserContext'
import Start from './pages/Start'
import UserProtectWapper from './pages/UserProtectWapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWapper from './pages/CaptainProtectWapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {

  const ans = use(UserDataContext);
  console.log(ans);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainsignup" element={<CaptainSignup />} />
        
        <Route path="/home" element={
          <UserProtectWapper>
            <Home />
          </UserProtectWapper>
        } />
        <Route path="/user/logout" element={
          <UserProtectWapper>
            <UserLogout />
          </UserProtectWapper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectWapper>
            <CaptainHome />
          </CaptainProtectWapper>
        } />

      </Routes >
    </div >
  )
}

export default App

