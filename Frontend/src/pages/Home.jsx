import uberLogo from '../assets/Uber_logo_black.png'
import map from '../assets/map.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react';



function Home() {
    const locationRef = useRef(null);
    const downArrow = useRef(null);
    return (
        <div className='h-screen relative'>
            <img src={uberLogo} alt="uberLogo" className='w-18 absolute top-5 left-5' />
            <div className='h-full w-full bg-yellow-800'>

                {/* <img src={map} alt="map" className='h-full'/> */}
            </div>
            <div className='absolute top-0 h-screen w-full  overflow-hidden flex flex-col  justify-end '>
                <div className='h-[40%]'>
                    <form className='h-[100%]  relative bg-white px-6 py-4'>

                        <h1 className='font-semibold text-2xl mb-5 '>Find a Trip</h1>
                        <span ref={downArrow} className='hidden'>
                            <FontAwesomeIcon icon={faAngleDown} className='text-2xl absolute top-4 right-4' />
                        </span>

                        <input type="text" name="pickup-location" id="pickup-location" placeholder='Enter pick-up location' className='py-2 px-7 pl-10 text-lg outline-gray-600 bg-[#eee] w-full rounded-md mb-3' onClick={() => {
                            locationRef.current.style.height = '60%'
                            // downArrow.current.style.display='block';
                        }} />
                        <div className='relative '>
                            <div className='w-2 h-16 bg-black absolute -top-9 left-4 rounded-full animate-bounce'></div>
                        </div>

                        <input type="text" name="destination-location" id="destination-location" placeholder='Enter destination location' className='py-2 px-7 pl-10 text-lg outline-gray-600 bg-[#eee] w-full rounded-md mb-2' onClick={() => {
                            locationRef.current.style.display = 'block';

                        }} />
                        <button className='bg-black text-white rounded-lg w-full p-2 text-xl font-semibold mt-4'>Ok</button>

                    </form>
                </div>

                <div ref={locationRef} className='h-[60%] py-4 px-4  bg-white  transition-all duration-1500 
                ease-in-out'>
                    <div className='h-[100%] overflow-scroll'>
                        <div className='py-2 px-4  flex items-center gap-4 bg-gray-300  '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>

                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        <div className='py-2 px-4 flex items-center gap-4 bg-gray-300 rounded-lg '>
                            <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
                            <p className='text-lg overflow-hidden'>;sanv;alskdjgfa;h sd;</p>
                        </div>
                        

                    </div>



                </div>

            </div>
        </div>
    )
}
export default Home;