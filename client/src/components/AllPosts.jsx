
import { Link } from "react-router-dom"

const MAX_LENGTH = 250;

const AllPosts = ({ entry }) => {

    return (
        <div>
            <div className="flex flex-row max-sm:flex-col items-center justify-center max-w-full max-h-full my-4">
               
                    <img className="w-1/2 mb-4 pl-4 max-sm:w-full max-sm:px-4" src={entry.image} alt="" />
        
                <div className="p-4 w-1/2 flex items-start justify-center flex-col max-sm:w-full">
                    <h2 className="text-[2rem] font-semibold mb-2">{entry.title}</h2>
                    <h4 className="mb-4 font-light text-[1rem]"><span className="underline">Posted by:</span> <span className="font-semibold">{entry.author}</span> on <span className="font-semibold">{entry.date}</span></h4>
                    <p className="w-full">{entry.description.substring(0, MAX_LENGTH)}...</p>
                   
                    <Link to={`/entry/${entry._id}`} className="block rounded-md bg-[#2ECC40] py-2 px-3 text-sm font-[400] text-white shadow-md hover:bg-[#259a56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC40] mt-4 no-underline" onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}>
                        Read More
                    </Link>
                
                </div>
            </div>
        </div>
    )
}

export default AllPosts

