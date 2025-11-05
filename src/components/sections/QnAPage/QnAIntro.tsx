interface textProps {
  className_F?: String;
  className_Q?: String;
  className_t?: String;
}

export default function QnAIntro({ className_F = "text-7xl", className_Q = "text-8xl", className_t = "text-xl" }: textProps ) {
  return (
    <div className="flex flex-col justify-center items-start m-10">
      <p data-aos="fade-down" className={` font-semibold my-4 ${className_F}`}>Frequently Asked</p>
      <p data-aos="fade-up" className={` font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#60A5FA] my-4 -mt-1 ${className_Q}`}>Questions</p>
      <p data-aos="fade-right" className={` font-base text-[#6B6B6B] ${className_t}`}>영과일의 활동에 대한 자주 묻는 질문들을 모아둔 공간입니다 <br/> 이곳에서 여러분의 궁금증을 빠르게 해결해보세요</p>
    </div>
  );
}