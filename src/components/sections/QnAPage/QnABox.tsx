import UpIcon from "@/assets/icon/UpIcon.png"
import DownIcon from "@/assets/icon/DownIcon.png"

export default function QnA({ Q, A = "야호" } : { Q : String, A : String }) { 
  return (
    <div className="m-2 bg-white shadow flex flex-col justify-center items-center rounded-lg border-2 border-[#D9D9D9] px-8 py-5">
      <div className="flex w-full justify-between items-center">
        <p className="text-lg font-semibold">{Q}</p>
        <img src={DownIcon} alt="Icon" className="" />
      </div>
      <p>{A}</p>
    </div>
  );
}