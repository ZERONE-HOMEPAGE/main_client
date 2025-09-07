import Button from "@/components/ui/Button";
import logo from "@/assets/icon/logo.png";
import ScrollDownBtn from "@/components/ui/ScrollDownBtn";

export default function MobileHero(){
    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-evenly text-white">
            <div>
                <img src={logo} alt="ZERONE" className="" />
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-2xl text-gray-400 text-[20px]">한양대학교 ERICA 소프트웨어융합대학</p>
                    <h1 className="text-4xl text-white font-bold">알고리즘학회 영과일</h1>
                    <Button className="text-black" variant="primary" onClick={() => window.open('https://forms.gle/tM5VeU42QsDkQ7cz7', '_blank')}>가입하기 →</Button>
                </div>
            </div>
            <div></div>
            <ScrollDownBtn />
        </div>
    );
}