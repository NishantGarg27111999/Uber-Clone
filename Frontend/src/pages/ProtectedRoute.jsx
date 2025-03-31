import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../contexts/UserContext";
import { captainDataContext } from "../contexts/CaptainContext";
import axios from "axios";

function ProtectedRoute({children,navigateRoute,isCaptain}){
    console.log(isCaptain);
    const navigate=useNavigate();
    const {setUser}=useContext(userDataContext);
    const {setCaptain}=useContext(captainDataContext);
    const token=localStorage.getItem('token');
    console.log(token);
    console.log('hello');

    useEffect(()=>{
        if(!token){
            
            navigate(navigateRoute);
        }
    },[token])


    

    isCaptain
    ?
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        console.log('captain');
        if(response.status==200){
            setCaptain(response.data.captain);

        }
    })
    .catch(err=>{
        console.log('captain');
        console.log(err);
        localStorage.removeItem('token');
        navigate('/captain-login');
    })
    :
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        console.log('user');
        if(response.status==200){
            setUser(response.data.user);

        }
    })
    .catch(err=>{
        console.log('user');
        console.log(err);
        localStorage.removeItem('token');
        navigate('/captain-login');
    })

    

   
    return(
        children
        )
}

export default ProtectedRoute;