import zeroneCharacter from '@/assets/images/zerone_character.png';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFound(){
    const navigate = useNavigate();
    
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center p-4 gap-4">
            <img className='animate-swing' src={zeroneCharacter} width={200} alt="" />
            <h1 className="text-2xl font-bold mb-4">404 Not Found</h1>
            <div>
                <p className="text-center">죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</p>
                <p className="text-center">페이지가 삭제되었거나, URL이 잘못되었을 수 있습니다.</p>
            </div>
            <Button onClick={() => navigate('/')} variant="primary">메인 페이지로 돌아가기</Button>
        </div>
    );
}