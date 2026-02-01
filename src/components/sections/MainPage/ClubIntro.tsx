import awardIcon from '@/assets/icon/award.png';
import bookIcon from '@/assets/icon/book.png';
import giftIcon from '@/assets/icon/gift.png';
import { useState } from 'react';

export default function ClubIntro() {
  const C_Text = {
    introText:
      '안녕하세요! 영과일에 오신 것을 환영합니다. 저희 학회는 알고리즘과 프로그래밍에 관심 있는 학생들이 함께 모여 실력을 쌓고 다양한 경험을 나누는 공간입니다. 어려운 문제를 해결하며 얻은 성취감과 동료들과의 협력 속에서 우리는 함께 성장하고 있습니다. 앞으로도 지속적으로 발전하는 학회가 되도록 노력하겠습니다.',
    purposeText:
      '영과일은 알고리즘 문제 해결을 통해 학문적 깊이를 더하고 실제 대회에서의 성과를 통해 현장 경험을 축적하는 것을 목표로 설립되었습니다. 학회원들은 기초부터 고급 수준까지의 다양한 알고리즘 문제를 풀며 실력을 향상시키고 국내외 대회에서 우수한 성적을 거두는 것을 목표로 하고 있습니다. 학회 활동을 통해 프로그래밍 실력뿐만 아니라 팀워크와 협력의 중요성도 배울 수 있습니다.',
  };

  const M_Text = {
    introText:
      '안녕하세요! 영과일에 오신 것을 환영합니다. 저희 학회는 알고리즘과 프로그래밍에 관심 있는 학생들이 모여 실력을 쌓고 다양한 경험을 나누는 공간입니다. 어려운 문제를 함께 해결하며 얻은 성취감 속에서 우리는 성장하고 있습니다. 앞으로도 지속적으로 발전하는 학회가 되겠습니다.',
    purposeText:
      '영과일은 알고리즘 문제 해결을 통해 학술적 깊이를 더하고 실제 대회에서의 성과를 통해 현장 경험을 축적하는 것을 목표로 설립되었습니다. 학회원들은 기초부터 고급 수준까지의 다양한 알고리즘 문제를 풀며 실력을 향상시키고 국내외 대회에서 우수한 성적을 거두는 것을 목표로 하고 있습니다. ',
  };

  const cards = [
    {
      IconUrl: bookIcon,
      T1: '알고리즘 스터디',
      T2: '매주 알고리즘 문제를 풀며 실력을 쌓고 서로 피드백을 주고받는 스터디',
    },
    {
      IconUrl: awardIcon,
      T1: '대회 참가 및 개최',
      T2: '다양한 대학 및 기업 코딩 대회에 참가하여 실력을 검증하고 경험을 쌓는 기회를 제공',
    },
    {
      IconUrl: giftIcon,
      T1: '코딩 캠프 및 이벤트',
      T2: '알고리즘 대회 참가 및 실력 향상을 위한 집중적인 코딩 캠프 및 각종 이벤트를 개최',
    },
  ];

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <Background image={background}>
      <div className="w-full max-w-5xl px-4">
        <p className="mb-6 mt-[10vh] text-center text-2xl font-bold text-white md:mb-10 md:text-3xl lg:text-4xl">
          학회소개
        </p>

        <p className="mx-auto mb-8 block w-full text-center text-lg font-semibold leading-relaxed text-violet-300 md:mb-12 md:hidden md:text-xl">
          {M_Text.introText}
        </p>
        <p className="mx-auto mb-8 hidden w-full max-w-5xl text-center text-lg font-semibold leading-relaxed text-violet-300 md:mb-12 md:block md:text-xl">
          {C_Text.introText}
        </p>

        <ShadowBox className="w-full">
          <div className="p-6 md:p-8 lg:p-10">
            <p className="mb-4 text-2xl font-bold text-white md:mb-6 md:text-3xl">설립 목적</p>

            <p className="hidden w-full max-w-5xl text-lg font-semibold leading-relaxed text-gray-200 md:block md:text-xl">
              {C_Text.purposeText}
            </p>
            <p className="block w-full text-lg font-semibold leading-relaxed text-gray-200 md:hidden md:text-xl">
              {M_Text.purposeText}
            </p>
          </div>
        </ShadowBox>

        <ShadowBox className="w-full">
          <div className="p-6 md:p-8 lg:p-9">
            <p className="mb-6 text-2xl font-bold text-white md:mb-8 md:text-3xl">주요 활동</p>

            <div className="flex flex-col items-stretch justify-center gap-4 md:gap-6 lg:flex-row">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`cursor-pointer transition-all duration-300 ${hoveredIdx === idx ? 'z-10 scale-105' : hoveredIdx !== null ? 'scale-95 opacity-70' : ''}`}
                >
                  <IconBox IconUrl={card.IconUrl} T1={card.T1} T2={card.T2} />
                </div>
              ))}
            </div>
          </div>
        </ShadowBox>
      </div>
    </Background>
  );
}

function Background({ children, image }: { children: React.ReactNode; image?: string }) {
  return (
    <div
      className="relative min-h-[60vh] w-full bg-cover bg-center brightness-75"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="inset-0 flex flex-col items-center justify-center pb-32 pt-6">{children}</div>
    </div>
  );
}

function IconBox({ IconUrl, T1, T2 }: { IconUrl: string; T1: string; T2: string }) {
  return (
    <div className="mx-auto flex max-w-sm flex-1 flex-col rounded-xl border border-white md:h-[350px] lg:mx-0">
      <div className="flex h-full flex-col p-6 text-center md:p-8">
        <img
          src={`${IconUrl}`}
          alt="아이콘"
          className="mx-auto mb-4 h-[100px] w-[100px] md:h-[120px] md:w-[120px]"
        />
        <p className="mb-3 text-lg font-semibold text-white md:text-xl lg:text-2xl">{T1}</p>
        <p className="flex-grow text-sm text-gray-300 md:text-base">{T2}</p>
      </div>
    </div>
  );
}

function ShadowBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      data-aos="fade-up"
      className={`mt-10 flex flex-col rounded-xl border border-white bg-gray-600/40 shadow-[0_4px_22px_-2px_rgba(0,0,0,1),inset_0_0_200px_15px_rgba(230,230,230,0.35)] backdrop-blur-[21px] ${className}`}
    >
      {children}
    </div>
  );
}
