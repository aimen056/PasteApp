import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/features/pasteSlice";
import { NavLink } from "react-router-dom";
import {
  AiFillEdit,
  AiFillEye,
  AiFillDelete,
  AiFillCopy,
  AiOutlineShareAlt,
  AiFillCalendar 

} from "react-icons/ai";
import toast from "react-hot-toast";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div className="w-full p-5">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem] overflow-y-auto max-h-[500px]">
          <h3 className="px-4 text-xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h3>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-4">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div key={paste?._id}>
                  {/* Heading and Description */}
                  <div className="flex flex-col space-y-3 text-left border-b-2 border-[rgba(128,121,121,0.3)]">
                    <p className="text-3xl font-semibold">{paste?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-full sm:max-w-[80%] text-[#707070]">
                      {paste?.content}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row  justify-evenly sm:w-full">
                      {/* Edit Button */}
                      <NavLink className="bg-black justify-center text-[#646cff] py-2 px-4 flex items-center space-x-2 rounded-lg" to={`/?pasteId=${paste?._id}`}>
                        <AiFillEdit />
                        <span className="inline">Edit</span>
                      
                      </NavLink>

                      {/* View Button */}
                      <NavLink className="bg-black justify-center text-[#646cff] py-2 px-4 flex items-center space-x-2 rounded-lg" to={`/pastes/${paste?._id}`}>

                      
                        <AiFillEye />
                        <span className="inline">View</span>
                     
                      </NavLink>

                      {/* Delete Button */}
                      <button
                        className="bg-black justify-center text-[#646cff] py-2 px-4 flex items-center space-x-2"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <AiFillDelete />
                        <span className="inline">Delete</span>
                      </button>

                      {/* Copy Button */}
                      <button
                        className="bg-black justify-center text-[#646cff] py-2 px-4 flex items-center space-x-2"
                        onClick={() => {
                          navigator.clipboard.writeText(paste.content);
                          toast.success("Copied Successfully");
                        }}
                      >
                        <AiFillCopy />
                        <span className="inline">Copy</span>
                      </button>

                      {/* Share Button */}
                      <button
                        className="bg-black justify-center text-[#646cff] py-2 px-4 flex items-center space-x-2"
                        onClick={() => {
                          const shareableURL = `https://paste-app-theta-seven.vercel.app/pastes/${paste?._id}`;
                          navigator.clipboard
                            .writeText(shareableURL)
                            .then(() =>
                              toast.success(
                                "Shareable URL copied to clipboard! 🎉"
                              )
                            )
                            .catch(() =>
                              toast.error("Failed to copy the URL. 😞")
                            );
                        }}
                      >
                        <AiOutlineShareAlt />
                        <span className="inline">Share</span>
                      </button>
                    </div>

                    <div className="gap-x-2 flex justify-center">
                    <AiFillCalendar />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-red-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
