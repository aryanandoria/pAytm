import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const SendMoney = ()=>{
    const[money,setMoney] = useState(0);
    const[searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    return(
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-200 h-80 w-100 rounded-md shadow-xl">
                <div className="flex justify-center mt-5 font-bold text-2xl">
                   Send Money
                </div>
                <div className="flex flex-col mt-12 ml-12 ">
                    <div className="flex ">
                        <div className="bg-green-400 w-10 h-10 flex justify-center items-center rounded-full text-white">
                           {name[0] || "A"}
                        </div>
                        <div className=" flex justify-center items-center ml-3 text-xl font-medium">
                            {name || "Friend's Name" }
                        </div>
                    </div>
                    <div className="">
                        Amount (in Rs)
                    </div>
                    <div>
                        <input onChange={(e)=>{setMoney(e.target.value)}} type="text" placeholder="Enter amount" className="border-2 rounded-md w-70 mt-2" />
                    </div>
                    <button onClick={()=>{
                         axios.post("http://localhost:5000/account/transfer",{
                            to : id,
                            amount: money
                         },{
                            headers: {
                                Authorization: "Bearer "+ localStorage.getItem("token")
                            }
                         })
                         .then(response => {
                            alert(response.data.message || "Transfer Successful!");
                        })
                        .catch(error => {
                            alert(error.response?.data?.message || "Transfer Failed! Please try again.");
                        });
                    }}
                    className="bg-green-400 mt-5 mr-18 text-white h-10 rounded-lg cursor-pointer">
                        Invite  Transfer
                    </button>
                </div>
            </div>
          </div>
        </>
    )
}

export default SendMoney;