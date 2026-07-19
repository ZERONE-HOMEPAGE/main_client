import clockIcon from '@/assets/icon/clock.png';
import zeroneCharacter from '@/assets/images/zerone_character.png';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMainEvents } from '@/hooks/useMain';

interface EventBoxProps {
  title: string;
  start: string;
  end: string;
  imgUrl?: string | null;
  className?: string;
}

function EventBox({ title, start, end, imgUrl, className }: EventBoxProps) {
  return (
    <div className={`h-full rounded bg-white pb-4 shadow-md ${className}`}>
      {imgUrl ? (
        <img width="100%" src={imgUrl} alt={title} className="h-56 w-full rounded object-cover" />
      ) : (
        <img src={zeroneCharacter} alt="기본 이미지" className="h-56 w-full rounded object-cover" />
      )}
      <div className="pl-4 pr-4">
        <h2 className="mt-2 text-lg font-bold">{title}</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <img src={clockIcon} alt="" className="h-4 w-4" />
          <p>
            {start} ~ {end}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Event() {
  const { data } = useMainEvents();

  return (
    <div
      id="event"
      className="flex h-full w-full flex-col items-center justify-center gap-5 px-4 pb-20"
    >
      <p className="mb-6 mt-10 text-center text-3xl font-bold">주요 이벤트</p>

      <div className="block w-full md:hidden">
        {' '}
        {/* 모바일 화면 */}
        <div className="flex w-full flex-col gap-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={12}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 9000, disableOnInteraction: false }}
            className="w-full"
          >
            {(data ?? []).map((event, index) => (
              <SwiperSlide key={index}>
                <EventBox
                  title={event.title}
                  start={event.start}
                  end={event.end}
                  imgUrl={event.imgUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="hidden w-full max-w-5xl md:block">
        {' '}
        {/* 컴퓨터 화면 */}
        <div className="grid grid-cols-3 gap-4">
          {(data ?? []).map((event, index) => (
            <EventBox
              key={index}
              title={event.title}
              start={event.start}
              end={event.end}
              imgUrl={event.imgUrl}
              className="h-full w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
