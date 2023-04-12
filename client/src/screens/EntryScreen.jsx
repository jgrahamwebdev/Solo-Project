import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import entries from "../entries";
import { listEntryDetails } from "../actions/entryActions";

const EntryScreen = ({ match }) => {
    const dispatch = useDispatch()
    const entryDetails = useSelector(state => state.entryDetails)
    const { loading, error, entry } = entryDetails
    const { id } = useParams();

    //LIKES
    const [counter, setCounter] = useState(0);
    const incrementCounter = () => setCounter(counter + 1);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(listEntryDetails(id))
    }, [dispatch, id])

    return (
        <div>
            <div className="flex items-center justify-center flex-col max-w-full max-h-full my-4">
               
               <img className="w-3/4 mb-4" src={entry.image} alt="" />
   
           <div className="p-4 w-3/4 flex items-start justify-center flex-col">
               <h2 className="text-[2rem] font-semibold mb-2">{entry.title}</h2>
               <h4 className="mb-4 font-light text-[1rem]"><span className="underline">Posted by:</span> <span className="font-semibold">{entry.author}</span> on <span className="font-semibold">{entry.date}</span></h4>

                {userInfo ? (
                    <div className="flex items-center justify-between w-[10rem]">
                        <p className="cursor-pointer text-[1.2rem]" onClick={incrementCounter}>👍 ({counter})</p>
                        <p className="cursor-pointer text-[1.2rem]">📌 <span className="text-[10px]">(Pin to profile)</span></p>
                    </div>
                ) : (
                    <div className="flex items-center justify-between w-[10rem]">
                        <Link to={`/login`} className="no-underline text-black"><p className="cursor-pointer text-[1.2rem]" >👍 (0)</p></Link>
                        <Link to={`/login`} className="no-underline text-black"><p className="cursor-pointer text-[1.2rem]">📌 <span className="text-[10px]">(Pin to profile)</span></p></Link>
                    </div>
                )}

                <p className="w-full">{entry.description}</p>   

                <Link to={`/`} className="block rounded-md bg-[#2ECC40] py-2 px-3 text-sm text-white shadow-sm hover:bg-[#259a56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC40] mt-4 no-underline">
                    &larr; Home
                </Link>   
           </div>

           {/* <div className="w-3/4 h-[11rem] border-4 border-black mt-[2rem] p-4">
                <h3 className="underline">(0) Comments:</h3>
                <div className="mb-[2rem]">
                    <input placeholder="Write comment..." className="border-[1px] border-black w-[70%] h-[2.4rem] pl-2 mr-2"/>
                    <button className="rounded-md bg-[#2ECC40] py-2 px-3 text-white hover:bg-[#259a56]">Comment</button>
                </div>

                <div>**COMMENTS WILL GO HERE!**</div>
           </div> */}
       </div>
        </div>
    )
}

export default EntryScreen
