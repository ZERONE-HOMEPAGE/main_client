import QnAIntro from '@/components/sections/QnAPage/QnAIntro';
import QnABox from '@/components/sections/QnAPage/QnABox';
import { useCallback } from 'react';
import { useState } from 'react';
import 'aos/dist/aos.css';

const qna = [
  {
    Question: '코딩 초보도 가입이 가능한가요?',
    Answer:
      '가능합니다. 영과일에는 완전 초보자를 위한 기초반이 준비되어 있으며, 언어 설치부터 기본 문법까지 차근차근 학습할 수 있도록 커리큘럼이 구성되어 있습니다.',
  },
  {
    Question: '전공이나 학년에 제한이 있나요',
    Answer:
      '없습니다. 컴퓨터 관련 전공이 아니어도, 혹은 1학년이 아니어도 개발 학습 의지만 있다면 누구나 참여 가능합니다.',
  },
  {
    Question: '스터디는 어떻게 진행되나요?',
    Answer:
      '영과일에서는 학습 수준에 따라 C기초반, 브릿지반, 알고리즘반 등 다양한 단계의 스터디를 운영하고 있습니다.\n각 스터디는 경험 많은 멘토들이 직접 지도하며, 자신의 실력에 맞게 배우고 성장할 수 있는 환경을 제공합니다.',
  },
  {
    Question: '회비는 얼마인가요?',
    Answer: '첫 가입 시에는 25,000원, 이미 가입된 기존 회원은 20,000원입니다.',
  },
  {
    Question: '모집 시기는 언제인가요?',
    Answer:
      '영과일은 상시모집으로 홈페이지의 가입하기 버튼을 클릭하시면 가입 설문으로 넘어가니 많은 관심 부탁드립니다!',
  },
  {
    Question: '스터디 활동 시간이 어떻게 되나요?',
    Answer:
      '정규 스터디는 주 1~2회 진행되며, 시간은 팀별로 조율하여 결정합니다.\n오프라인/온라인 병행 운영으로 일정이 바쁜 경우에도 무리 없이 참여할 수 있습니다.',
  },
  {
    Question: '주요 행사는 어떤게 있나요?',
    Answer:
      '모여서 같이 코딩하는 모각코, C 기초 / 자료구조 / 알고리즘 / 코드포스반 등 난이도별 스터디, ZOAC·HEPC 같은 코딩 경시대회 참여,솔브닥 마라톤 주간 인증하면 선물 주는 챌린지, 그리고 실무 선배를 직접 만날 수 있는 네트워킹 데이 같은 행사들이 있습니다.',
  },
];

export default function QnAPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="relative isolate flex h-full min-h-screen w-full flex-col">
      {/* Background deco */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12%] top-[22%] z-0 h-[700px] w-[700px] rounded-full bg-[#B5A9FF] opacity-40 blur-[140px]" />
        <div className="absolute left-[20%] top-[6%] z-0 h-[500px] w-[500px] rounded-full bg-[#60A5FA] opacity-40 blur-[150px]" />
      </div>

      <div className="block w-full lg:hidden">
        <div className="mx-10 flex flex-col items-center justify-evenly">
          <div className="mt-20">
            <QnAIntro
              className_F="text-2xl md:text-6xl"
              className_Q="text-5xl md:text-7xl"
              className_t="text-base"
            />
          </div>
          <div className="flex w-full flex-col md:px-10">
            {qna.map((QA, key) => (
              <QnABox
                animation="fade-right"
                delay={key * 100}
                key={key}
                id={key}
                Question={QA.Question}
                Answer={QA.Answer}
                onToggle={handleToggle}
                isActive={activeIndex === key}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden w-full lg:block">
        <div className="relative z-10 mb-20 mt-10 flex w-full items-center justify-between px-24">
          <div className="sticky top-64 flex-shrink-0 self-start">
            <QnAIntro />
          </div>
          <div className="-mr-10 flex w-1/2 flex-col">
            {qna.map((QA, key) => (
              <QnABox
                animation="fade-up"
                delay={key * 100}
                key={key}
                id={key}
                Question={QA.Question}
                Answer={QA.Answer}
                onToggle={handleToggle}
                isActive={activeIndex === key}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
