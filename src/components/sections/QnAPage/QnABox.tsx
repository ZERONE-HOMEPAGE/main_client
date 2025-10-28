import UpIcon from "@/assets/icon/UpIcon.png"
import DownIcon from "@/assets/icon/DownIcon.png"

export default function QnA({ Q, A } : { Q : String, A : String }) { 
  if (A === "") A = "야호";
  return (
    <div className="m-2 bg-white shadow-lg flex flex-col justify-center border border-[#E5E5EC] rounded-lg px-8 py-5">
      <div className="flex w-full justify-between items-center mb-4">
        <p className="text-lg font-semibold">{Q}</p>
        <img src={DownIcon} alt="Icon" className="" />
      </div>
      <div>
        <hr className="w-full border-t border-[#E5E5EC] mb-6"/>  
        <p>{A}</p>
      </div>
    </div>
  );
}