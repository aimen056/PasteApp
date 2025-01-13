import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const ViewPaste = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.filter((p) => p._id === id);
  console.log(paste);
    useEffect(() => {
      if (id) {
        const paste = allPaste.find((p) => p._id === id);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [id]);
  return (
    <div>
      <div className="w-full">
        <div>
            <span className="p-8">Title:</span>
          <input
            className="p-3 mt-8 bg-[#0d0d0d] rounded-lg w-96 "
            type="text"
            placeholder="Enter Title Here"
            value={title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            disabled
            id="paste-text"
            onChange={(e) => setValue(e.target.value)}
            rows={10}
            type="text"
            value={value}
            placeholder="Enter text here"
            className=" bg-[#0d0d0d] p-3 mt-8  w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
