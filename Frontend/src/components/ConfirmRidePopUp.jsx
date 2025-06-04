import { faAngleDown, faLocationDot, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user from '../assets/user.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";

function ConfirmRidePopUp({ confirmRidePopUpPanelRef, ridePopUpRef, PanelOpenClose }) {
    const [OTP,setOTP]=useState(null);
    function submitHandler(e){
        console.log("hello");
        e.preventDefault();
        console.log(OTP);
    }

    return (
        <div ref={confirmRidePopUpPanelRef} className='h-screen absolute bottom-0 w-screen py-5   px-4   transition-all duration-1500 ease-in-out overflow-hidden bg-white rounded-xl translate-y-full'>

            <h2 className="text-xl font-medium mb-6 mt-4">Confirm to Start Ride!</h2>
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-between w-full py-3 bg-yellow-400 rounded-lg p-2">
                    <div className="flex gap-3 items-center justify-between">
                        <img src={user} className="h-10 w-10 rounded-full object-cover " />
                        <div className="text-lg font-semibold">Harsh Patel</div>
                    </div>
                    <div className="font-semibold">2.2KM</div>


                </div>
                <div className="w-full text-lg font-medium p-2 flex items-center gap-4 border-b-2 border-b-gray-300"><FontAwesomeIcon icon={faLocationDot} className='  text-green-700 text-xl' /><div>,gn;kja;g</div> </div>
                <div className="w-full text-lg font-medium p-2 flex items-center gap-4 border-b-2 border-b-gray-300"> <FontAwesomeIcon icon={faLocationDot} className=' text-red-700 text-xl' /><div>,gn;kja;g</div></div>
                <div className="w-full text-lg font-medium p-2 flex items-center gap-4"> <FontAwesomeIcon icon={faWallet} className=' ' /><div>₹ 298</div></div>


                <form onSubmit={submitHandler} className="w-full mt-6">

                    <input value={OTP} onChange={(e)=>{
                        setOTP(e.target.value);
                    }} type="number" name="otp" id="otp" placeholder="Enter OTP" className='font-mono py-2 px-4  text-lg outline-gray-600 bg-[#eee] w-full rounded-md mb-3'/>
                    <div className="flex  w-full justify-between items-center mt-2">
                        <button className="w-1/3 rounded-lg bg-red-600 text-white p-2 mt-4 font-medium text-lg mb-5" onClick={() => {
                            PanelOpenClose(ridePopUpRef);
                            PanelOpenClose(confirmRidePopUpPanelRef);
                        }}>Cancel</button>
                        <Link to='/captain-riding' className="w-1/3 rounded-lg flex justify-center items-center bg-green-600 text-white p-2 mt-4 font-medium text-lg mb-5" onClick={() => {

                        }}>Confirm</Link>
                    </div>
                </form>



            </div>
        </div>
    )
}

export default ConfirmRidePopUp;