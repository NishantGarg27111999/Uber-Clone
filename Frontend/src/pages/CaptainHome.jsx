import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uberDriver from '../assets/uberDriver.png';
import { faClock, faGaugeSimpleHigh, faHome, faLocationDot, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import map from '../assets/map.gif';
import user from '../assets/user.jpg'
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useRef } from 'react';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';



function CaptainHome() {

    function PanelOpenClose(panelRef) {
        panelRef.current.classList.toggle("translate-y-full");
    }

    const ridePopUpRef=useRef(null);
    const confirmRidePopUpPanelRef=useRef(null);

    return (
        <div className='h-screen overflow-hidden '>
            <div className='fixed top-0 p-2 flex items-center justify-between w-screen'>
                <img src={uberDriver} alt="driverLogo" className='w-16' />
                <Link to='/home' className='  bg-white h-10 w-10 rounded-full flex items-center justify-center '>
                    <FontAwesomeIcon icon={faHome} className=' ' />
                </Link>
            </div>

            <div className='h-2/3'>
                <img src={map} alt="map" className='h-full w-full object-cover' />
            </div>
            <CaptainDetails/>
            <RidePopUp ridePopUpRef={ridePopUpRef} confirmRidePopUpPanelRef={confirmRidePopUpPanelRef} PanelOpenClose={PanelOpenClose}/>
            <ConfirmRidePopUp confirmRidePopUpPanelRef={confirmRidePopUpPanelRef} ridePopUpRef={ridePopUpRef} PanelOpenClose={PanelOpenClose}/>


        </div>
    )
}

export default CaptainHome;