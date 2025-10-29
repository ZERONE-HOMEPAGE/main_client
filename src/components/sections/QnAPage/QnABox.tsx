import UpIcon from "@/assets/icon/UpIcon.png"
import DownIcon from "@/assets/icon/DownIcon.png"
import { useState } from "react";

interface QnAProps {
  Q: string;
  A: string;
}

export default function QnA({ Q, A } : QnAProps ) { 
  const [open, setOpen] = useState(false);
  if (A === "") A = "야호"; // 테스트

  return (
    <div onClick={() => setOpen((prev) => !prev)} className="m-2 bg-white shadow-lg flex flex-col justify-center border border-[#E5E5EC] rounded-lg px-8 py-5 cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:bg-[#F4F0FF]">
      <div className="flex w-full justify-between items-center mb-4">
        <p className="text-lg font-semibold">{Q}</p>
        <img
          src={DownIcon}
          alt=""
          className={`w-5 h-5 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows,gap] duration-300 ease-in-out ${
          open ? "grid-rows-[auto_1fr] gap-4" : "grid-rows-[auto_0fr] gap-0"
        }`}
      >
        <div className="overflow-hidden transition-opacity duration-300 text-gray-700">
          {open && (
            <>
              <hr className="w-full border-t border-[#E5E5EC] mb-4" />
              <p className="leading-relaxed">{A}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}