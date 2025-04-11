const Appbar = ()=>{
    return(
    <div className=" shadow-lg h-14 flex justify-between rounded-md m-3 bg-sky-300">
        <div className="ml-4 flex flex-col justify-center">
            Paytm App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className=" flex items-center justify-center w-full">
                    U
                </div>
            </div>
        </div>
    </div>
    )
}
export default Appbar;