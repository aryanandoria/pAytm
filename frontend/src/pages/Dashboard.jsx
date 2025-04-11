import Appbar from "../components/Appbar";
import { Balance } from "../components/Balance";
import Users from "../components/Users";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";


const Dashboard = ()=>{

    // const navigate = useNavigate();
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {    
    //         alert("Unauthorized! Please log in.");
    //         navigate("/"); // Redirect to login if token is missing
    //     }
    // }, [navigate]);


    return(
        <>
           <Appbar></Appbar>
           <div className="mt-8">
               <Balance></Balance>
               <Users></Users>
           </div>
        </>
    )
}

export default Dashboard;