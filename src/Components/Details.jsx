import React from 'react';
import { FaTimes } from "react-icons/fa";

const Details = ({ selected, closeDetail }) => {
    return (
        <div className="detail container p-4">
            <div className="content block w-full h-screen fixed top-0 left-0 p-8 bg-slate-100 dark:bg-[#120e16] text-[#120e16] dark:text-slate-100 overflow-y-scroll">
                <h2 className="text-4xl sm:text-5xl p-8 pt-0 pb-2 font-semibold">
                    {selected.Title}
                </h2>
                <span className="text-xl sm:text-2xl font-light ml-8 mb-12">
                    {selected.Year} 
                    </span>
                
                
                <p className="rating text-xl sm:text-2xl font-light ml-8 mt-4 mb-8">
                    Rating: {selected.imdbRating}
                </p>

                <div className="w-full sm:w-1/2 lg:w-[60%] mt-8 sm:mt-0">
                    <p className="text-xl sm:text-2xl font-light">{selected.Plot}</p>
                </div>
            </div>
            
            <button 
                className="absolute top-2 right-2 flex justify-center items-center float-right text-xl font-bold m-auto border-none outline-none appearance-none cursor-pointer"
                onClick={closeDetail}
            >
                <FaTimes
                    className="text-[#120e16] dark:text-slate-100"
                    size={24}
                    style={{
                        '@media (min-width: 640px)': {
                            fontSize: '32px'
                        }
                    }} 
                />
            </button>
        </div>
    );
}

export default Details;
