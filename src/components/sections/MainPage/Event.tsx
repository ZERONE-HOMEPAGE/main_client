import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import zeroneCharacter from '@/assets/images/zerone_character.png';
import clockIcon from '@/assets/icon/clock.png';
import oneAndN from '@/assets/eventImg/1&N.png';
import baekjoonbingo from '@/assets/eventImg/baekjoonbingo.png';
import mogakco from '@/assets/eventImg/mogakco.png';
import study from '@/assets/eventImg/study.png';

interface EventBoxProps {
    title: string;
    start: string;
    end: string;
    imgUrl?: string;
    className?: string;
}

function EventBox({ title, start, end, imgUrl, className}: EventBoxProps) {
    return (
        <div className={`bg-white pb-4 rounded h-full shadow-md ${className}`}>
            {imgUrl ? <img width="100%" src={imgUrl} alt={title} className="h-56 object-cover rounded w-full" /> : <img src={zeroneCharacter} alt="기본 이미지" className="h-56 object-cover rounded w-full"/>}
            <div className='pr-4 pl-4'>
                <h2 className="text-lg font-bold mt-2">{title}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                    <img src={clockIcon} alt="" className="w-4 h-4" />
                    <p>{start} ~ {end}</p>
                </div>
            </div>
        </div>
    );
}

export default function Event() {
    const events = [
        {
        title: "가두모집",
        start: "2025.09.01",
        end: "2025.09.14",
        imgUrl: "",
        },
        {
        title: "개강총회",
        start: "2025.09.22",
        end: "2025.09.22",
        imgUrl: "",
        },
        {
        title: "1&N 네트워킹데이",
        start: "2025.09.27",
        end: "2025.09.27",
        imgUrl: oneAndN
        },
        {
        title: "스터디",
        start: "2025.09.29",
        end: "2025.12.07",
        imgUrl: study
        },
        {
        title: "모.각.코",
        start: "2025.09.29",
        end: "2025.12.07",
        imgUrl: mogakco
        },
        {
        title: "백준마라톤",
        start: "2025.09.29",
        end: "2025.12.07",
        imgUrl: baekjoonbingo
        }
    ];
    
    return (
        <div id='event' className='w-full px-4 flex flex-col items-center justify-center gap-5 h-full pb-20'>
            <p className="text-3xl font-bold text-center mb-6 mt-10">이달의 주요 이벤트</p>

            <div className="block md:hidden w-full"> {/* 모바일 화면 */}
                <div className="w-full flex flex-col gap-8">

                    <Swiper modules={[Navigation, Pagination, Autoplay]} 
                            spaceBetween={12} 
                            slidesPerView={1}
                            navigation 
                            autoplay={{ delay: 9000, disableOnInteraction: false }}
                            className='w-full'>
                        {events.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventBox title={event.title} start={event.start} end={event.end} imgUrl={event.imgUrl}/>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                    
                </div>
            </div>

            <div className="hidden md:block w-full max-w-5xl"> {/* 컴퓨터 화면 */}
                <div className="grid grid-cols-3 gap-4">
                    {events.map((event, index) =>
                    <EventBox key={index} title={event.title} start={event.start} end={event.end} imgUrl={event.imgUrl} className='h-full w-full'/>
                    )}
                </div>
            </div>
        </div>
    );
}