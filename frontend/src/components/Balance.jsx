import { useEffect, useState } from "react"
import axios from "axios"

export const Balance = ({ value }) => {
    // useEffect = async()=>{
    //     const response = await axios.get("http://localhost:5000/account/balance");
    //     setBalance(response.data.balance)

    // }
    const[balance,setBalance] = useState(0);
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");    
                const response = await axios.get("http://localhost:5000/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                });
                console.log(response.data);
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
    
        fetchBalance();
    }, []);
    return(
     <div className="flex ml-10">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
           Rs {balance || 23854.65}
        </div>
    </div>
)}