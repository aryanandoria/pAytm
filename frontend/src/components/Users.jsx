import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const  Users = ()=>{
  const[users,setUsers] = useState([])
  const[filter,setfilter] = useState("");

  useEffect(()=>{
    axios.get(`http://localhost:5000/user/bulk?filter=${filter}`)
    .then(response=>{
      setUsers(response.data.users);
    })
  },[filter])

    return(
        <>
            <div className="ml-10 mt-5 text-xl font-bold flex flex-col">
                <div>
                  Users
                </div>
                <div className="pt-5 pr-10">
                  <input onChange={(e)=>{setfilter(e.target.value)}} type="text" placeholder="Search Users" className="p-2 border-1 border-slate-300 w-full font-normal rounded-md"/>
                </div>
            </div>
            {/* <div className="font-bold text-lg mt-6 ml-10">
              Users
            </div>
            <div className="my-2">
              <input type="text" placeholder="Search Users..." className="w-full px-1 py-2  border rounded-md border-slate-200" />
            </div> */}

            <div className="mt-8 ml-10 mr-9 ">
            {users.map((user) => (
              <User key={user._id} user={user} />
            ))}
            </div>

        </>
    )
}

function User({user}) {
  const navigate = useNavigate();

  return <div className="flex justify-between py-3">
      <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                  {user.firstname[0]}
              </div>
          </div>
          <div className="flex flex-col justify-center h-ful">
              <div>
                  {user.firstname} {user.lastname}
              </div>
          </div>
      </div>

      <div className="flex flex-col justify-center h-full ">
        <button onClick={()=>{
           navigate("/send?id=" + user._id + "&name=" + user.firstname);
        }}
        className="bg-slate-800 text-md py-3 px-5 border rounded-md cursor-pointer text-white">
          Send Money
        </button>
      </div>
  </div>
}
export default Users;