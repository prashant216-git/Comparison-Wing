import './App.css'
import { BrowserRouter, Routes, Route ,Outlet} from 'react-router-dom';

  // humne ye samjhaya hai ki / wale page pr ye component dikhaega or about wale page pr second wale component banaega
                                                                    //ese hi jitne page honge utne routes bana sakta hu

import Login from "./Pages/login"    
import Signup from "./Pages/SignUp" 
import LandingPage from "./Pages/LandingPage" 
import OtpVerification from './Pages/OtpVerification'   /*   yaha hmne login page import kia hai  */
import Homepage from './Pages/homepage'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />                  { /* yaha humne login page ko use kia hai */}
        <Route path="/signup"  element={<Signup/>} />  
        <Route path="/verification"  element={<OtpVerification/>}/>  
        <Route path="/homepage"       element={<Homepage/>}/>
        <Route path="/OtpVerification" element={<OtpVerification/>}/>
      
                 
        <Route path="/about" element={<h1 className='bg-red-100'>About Page</h1>} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
