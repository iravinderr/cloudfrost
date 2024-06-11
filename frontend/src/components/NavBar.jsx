import React from 'react';
import Button from './Button';
import { AshGray, ElectricIndigo, Magnolia, RaisinBlack, SlateBlue } from '../constants/CustomColors';

function NavBar({ loginClick }) {
  return (
    <div className='w-full h-20 flex justify-evenly items-center bg-black text-white'>
      <div className='w-1/3 flex justify-center'>
        MyCloud
      </div>
      
      <div className='w-1/3'>

      </div>

      <div className='w-1/3 flex justify-center gap-8'>
        <Button onClick={loginClick} borderWidth={2} borderColor={Magnolia} bgColor={ElectricIndigo} text={"Login"} textColor={Magnolia} textSize={"20"}></Button>

        <Button onClick={loginClick} borderWidth={2} borderColor={"white"} bgColor={"black"} text={"Sign Up"} textSize={"20"}></Button>
        
      </div>
    </div>
  );
}

export default NavBar;
