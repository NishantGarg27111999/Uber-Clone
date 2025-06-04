import { faClock, faGaugeSimpleHigh, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import user from '../assets/user.jpg'

function CaptainDetails(){
    return (
        <div className='p-4 h-1/3'>
                <div className="flex items-center justify-between mb-6">
                    <div className='flex items-center gap-1'>
                        <img src={user} className=" h-14 w-14 object-cover rounded-full " />
                        <div className="text-lg font-medium">Harsh Patel</div>

                    </div>
                    <div className='text-right'>
                        <div className='text-xl font-semibold'>₹295</div>
                        <div className='text-sm font-light text-gray-500'>Earned</div>
                    </div>
                </div>

                <div className='flex justify-evenly bg-yellow-400 p-4 rounded-lg'>
                    <div className='flex flex-col justify-center items-center'>
                        <FontAwesomeIcon icon={faClock} className='text-xl ' />
                        <div className=' font-medium'>10.2</div>
                        <div className='text-xs '>Hours Online</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                    <FontAwesomeIcon icon={faGaugeSimpleHigh} className='text-xl ' />
                        <div className='text-lg font-medium'>10.2</div>
                        <div  className='text-xs '>Hours Online</div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                    <FontAwesomeIcon icon={faWallet} className='text-xl ' />
                        <div className='text-lg font-medium'>10.2</div>
                        <div  className='text-xs '>Hours Online</div>
                    </div>
                </div>

            </div>
    )
}

export default CaptainDetails;