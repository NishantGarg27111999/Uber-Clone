import uberLogo from '../assets/Uber_logo_black.png'
import map from '../assets/map.gif';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';



function Home() {
    const [vehicleImage,setVehicleImage]=useState("");
    const [rideData, setRideData] = useState({ pickUp: '', destination: '' });
    const locationRef = useRef(null);
    const vehicleRef = useRef(null);
    const confirmRideRef=useRef(null);
    const lookingForDriverRef=useRef(null);
    const waitingForDriverRef=useRef(null);
    // const rideFindRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const downArrow = useRef(null);
    const [toggle, setToggle] = useState(true);

    function PanelOpenClose(panelRef) {
        panelRef.current.classList.toggle("translate-y-full");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("hello");
        console.log(rideData);
        if (rideData.pickUp && rideData.destination) {

            PanelOpenClose(vehicleRef);
            locationRef.current.classList.toggle("grow-1");
            locationRef.current.classList.toggle("py-4");
            downArrow.current.classList.toggle("hidden");
            setToggle(true);
        }




        setRideData({ pickUp: "", destination: "" });
    }


    return (
        <div className='h-screen relative overflow-hidden'>
            <img src={uberLogo} alt="uberLogo" className='w-18 absolute top-5 left-5 ' />
            <div className='h-full w-full'>

                <img src={map} alt="map" className='h-full w-full' />
            </div>
            <div className='absolute bottom-0 h-screen w-full gap-0  flex flex-col  justify-end sm:w-[40%] sm:right-0 overflow-hidden '>
                <div className='    '>
                    <form className='  relative bg-white px-6 py-4' onSubmit={submitHandler}>

                        <h1 className='font-semibold text-2xl mb-5 '>Find a Trip</h1>
                        <span ref={downArrow} className='hidden'>
                            <FontAwesomeIcon icon={faAngleDown} className='text-2xl absolute top-4 right-4' onClick={() => {
                                locationRef.current.classList.toggle("grow-1");
                                locationRef.current.classList.toggle("py-4");
                                downArrow.current.classList.toggle("hidden");
                                setToggle(true);
                            }} />
                        </span>

                        <input type="text" required name="pickup-location" id="pickup-location" placeholder='Enter pick-up location' className='py-2 px-7 pl-10 text-lg outline-gray-600 bg-[#eee] w-full rounded-md mb-3' value={rideData.pickUp} onChange={(e) => setRideData((prevState) => ({ ...prevState, pickUp: e.target.value }))} onClick={() => {
                            if (toggle) {
                                locationRef.current.classList.toggle("grow-1");
                                locationRef.current.classList.toggle("py-4");
                                downArrow.current.classList.toggle("hidden");
                                setToggle(false);
                            }

                        }} />
                        <div className='relative '>
                            <div className='w-2 h-16 bg-black absolute -top-9 left-4 rounded-full animate-bounce'></div>
                        </div>

                        <input type="text" required name="destination-location" id="destination-location" placeholder='Enter destination location' className='py-2 px-7 pl-10 text-lg outline-gray-600 bg-[#eee] w-full rounded-md mb-2' value={rideData.destination} onChange={(e) => setRideData((prevState) => ({ ...prevState, destination: e.target.value }))} onClick={() => {

                            if (toggle) {
                                locationRef.current.classList.toggle("grow-1");
                                locationRef.current.classList.toggle("py-4");
                                downArrow.current.classList.toggle("hidden");
                                setToggle(false);
                            }

                        }} />
                        <button className='bg-black text-white rounded-lg w-full p-2 text-xl font-semibold mt-4'>Ok</button>

                    </form>
                </div>


                <LocationSearchPanel locationRef={locationRef} />



            </div>


            <VehiclePanel vehicleRef={vehicleRef} confirmRideRef={confirmRideRef} PanelOpenClose={PanelOpenClose} setVehicleImage={setVehicleImage}/>
            <ConfirmRide confirmRideRef={confirmRideRef} lookingForDriverRef={lookingForDriverRef}  PanelOpenClose={PanelOpenClose} vehicleImage={vehicleImage}/>
            <LookingForDriver  lookingForDriverRef={lookingForDriverRef} waitingForDriverRef={waitingForDriverRef} PanelOpenClose={PanelOpenClose} vehicleImage={vehicleImage}/>
            <WaitingForDriver  waitingForDriverRef={waitingForDriverRef} PanelOpenClose={PanelOpenClose} />
            




        </div>
    )
}
export default Home;