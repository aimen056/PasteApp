import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/features/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); //search parameters
  const pasteId = searchParams.get("pasteId"); //queryparameter pasteid
  const allPaste = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };


    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams("");
  }

  return (
    <div className="w-full p-2">
      <div className="w-full flex flex-col sm:flex-row sm:space-x-2 mt-6">
        <input
          className="p-3 bg-[#0d0d0d] rounded-lg  w-full sm:w-[70%]"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="p-3 rounded-lg  bg-gray-600 w-full sm:w-[30%]"
          onClick={createPaste}
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className="w-full mt-4">
        <textarea
          id="paste-text"
          onChange={(e) => setValue(e.target.value)}
          rows={15}
          value={value}
          placeholder="Enter text here"
          className="bg-[#0d0d0d] p-2 w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default Home;
