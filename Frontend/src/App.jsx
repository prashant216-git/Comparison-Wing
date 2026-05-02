import './App.css'
import { BrowserRouter, Routes, Route ,Outlet} from 'react-router-dom';

import Login from "./Pages/login"    
import Signup from "./Pages/SignUp" 
import LandingPage from "./Pages/LandingPage" 
import OtpVerification from './Pages/OtpVerification'
import Homepage from './Pages/homepage'
import Reactflow from './components/Reactflow'

import ProtectedRoute from './components/ProtectedRoute';
import CartPage from "./Pages/CartPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup"  element={<Signup/>} />  
        <Route path="/verification"  element={<OtpVerification/>}/>  

        <Route path="/homepage" element={
          <ProtectedRoute>
            <Homepage/>
          </ProtectedRoute>
        }/>
         <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route path="/OtpVerification" element={<OtpVerification/>}/>

        <Route path="/Reactflow" element={
          <ProtectedRoute>
            <Reactflow/>
          </ProtectedRoute>
        }/>

        <Route path="/LandingPage" element={<LandingPage/>}/>
                 
        <Route path="/about" element={<h1 className='bg-red-100'>About Page</h1>} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;