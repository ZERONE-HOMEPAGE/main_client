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
    <div onClick={() => setOpen((prev) => !prev)} className="w-full m-2 bg-white shadow-lg flex flex-col justify-center border border-[#E5E5EC] rounded-lg px-8 py-5 cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:bg-[#F4F0FF]">
      <div className="flex w-full justify-between items-center flex-1 break-keep">
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
        className={`grid transition-[grid-template-rows,gap] duration-100 ease-linear ${
          open ? "grid-rows-[auto_1fr] gap-4" : "grid-rows-[auto_0fr] gap-0"
      }`}>
        <div className="overflow-hidden transition-opacity duration-700 ease-linear">
          {open && (
            <>
              <hr className="w-full border-t border-[#E5E5EC] my-4" />
              <p className="leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: A }}></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}