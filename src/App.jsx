import { useState } from 'react'
import {Route , Routes , Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Customers from './pages/Customers.jsx';
import SideBar from './components/SideBar.jsx';
import CustomerDetails from './pages/CustomerDetails.jsx';
import Bills from './pages/Bills.jsx';
import Login from './pages/Login.jsx'

const Layout = () => {
    return (
        <div className="w-full min-h-screen flex">
            <SideBar />

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};


function App() {

  return (
      <>
          <Routes>

      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/bills" element={<Bills />} />
      </Route>

    </Routes>
      </>
  )
}

export default App
