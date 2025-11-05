import Card from "@/components/ui/Card"
import hanyangLogo from "@/assets/icon/hanyangLogo.svg"
import googleLogo from "@/assets/icon/googleLogo.svg"

export default function LoginPage(){
    const handleLogin = ()=>{
        alert("로그인 로직 아직없음")
    }
    return(
        <div className="flex flex-col justify-center items-center w-full bg-[#f9f7ff] min-h-[calc(100vh-4rem)] px-4">
            <Card className="p-12 space-y-6">
                <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 md:justify-between items-center">
                    <img src={hanyangLogo} alt="냥대로고" className="w-16 h-16 md:w-20 md:h-20" />
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-xl md:text-2xl font-bold mb-2">영과일 회원가입</h1>
                        <p className="text-sm md:text-base text-gray-600">hanyang.ac.kr 도메인의 이메일만 사용 가능합니다.</p>
                    </div>
                </div>
                <button onClick={handleLogin} className="flex flex-row justify-center gap-4 w-full text-center bg-[#f9f7ff] p-3 rounded border">
                    <img src={googleLogo} alt="구글" />
                    <div className="flex flex-row items-center gap-1">
                        <p>Google 계정으로</p>
                        <p className="text-blue-500 font-bold">로그인</p>
                    </div>
                </button>
            </Card>
            <hr className="m-6 w-[30%]"/>
            <p>구글 로그인을 통한 회원가입 시,</p>
            <p>
            영과일의 <a href="https://www.notion.so/0-1-2a2387bfdae48023a155fe4fe55fe729?source=copy_link" className="text-blue-600">개인정보 수집 및 이용</a>에 동의하는 것으로 처리됩니다.
            </p>
        </div>
    )
}