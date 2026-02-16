import Check_algo from '@/assets/icon/CheckIcon_algo.png';
import Check_dev from '@/assets/icon/CheckIcon_dev.png';
import HomeIcon from '@/assets/icon/home.png';
import LineIcon from '@/assets/icon/line.png';
import UserIcon from '@/assets/icon/user.png';
import PillTab_study from '@/components/ui/PillTab_study';
import { useState } from 'react';

interface CheckTextProps {
  text: string;
  divClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  iconSrc?: string;
}

interface ContentsProps {
  Week: number;
  Content: string;
}

interface MentorProps {
  Name: string;
  Department: string;
  Email: string;
  Message?: string;
}

export default function StudyIntro() {
  const Class = [
    {
      tabIdx: 0,
      name: 'C언어 기초반',
      tag: 'algorithm',
      intro: [
        'C언어에 대한 이해를 높이고 문제를 통해 적용해보며 학습',
        '직접 코드를 작성해보며 프로그램 동작 원리에 대한 이해',
        '이후에 듣게 될 자료구조나 알고리즘 스터디 대비 및 문제 해결 능력 향상',
      ],
      target: '프로그래밍이 처음이거나, C언어를 기초부터 배우고 싶으신 분',
      contents: ['입출력', '연산자', '조건문', '반복문', '배열', '함수'],
      mentor: [
        ['손동열', '컴퓨터학부 · 25학번', 'sdy423@hanyang.ac.kr', '멘토도 같이배우는 c언어'],
      ],
    },
    {
      tabIdx: 1,
      name: '파이썬 기초반',
      tag: 'algorithm',
      intro: [
        '파이썬에 대한 이해를 높이고 문제를 통해 적용해보며 학습',
        '직접 코드를 작성해보며 프로그램 동작 원리에 대한 이해',
        '이후에 듣게 될 자료구조나 알고리즘 스터디 대비 및 문제 해결 능력 향상',
      ],
      target: '프로그래밍이 처음이거나, 파이썬를 기초부터 배우고 싶으신 분',
      contents: [
        '입출력, 자료형, 사칙연산',
        '조건문과 연산자(비교 및 논리연산자)',
        '반복문과 함수',
        '리스트, 문자열',
        '람다함수, 정렬',
        '중첩 반복문, 완전탐색',
      ],
      mentor: [['유지성', '컴퓨터학부 · 22학번', '', '']],
    },
    {
      tabIdx: 2,
      name: '브릿지반',
      tag: 'algorithm',
      intro: [
        '기초에서 자료구조로 넘어가기 전에 C 핵심 개념을 정리하는 단계',
        '포인터, 재귀함수, 자료구조 등 C언어에서 심화 학습에 필요한 핵심 개념을 다룸',
      ],
      target: 'C언어 문법은 배웠지만, 포인터와 메모리 개념을 더 확실히 잡고 싶은 분',
      contents: [
        '포인터(1)',
        '포인터(2)',
        '다차원 배열 복습',
        '재귀함수',
        '구조체',
        '메모리 동적 할당',
      ],
      mentor: [
        [
          '정다혜',
          '컴퓨터학부 · 24학번',
          'dahye8724@hanyang.ac.kr',
          '편하게 와서 실력 다지고 올라가요',
        ],
      ],
    },
    {
      tabIdx: 3,
      name: '자료구조반',
      tag: 'algorithm',
      intro: [
        '자료구조에 대한 설명과 C++기반 문제풀이 위주 진행',
        'C언어 기초 개념을 알고 있고, 구현이 가능하다는 전제 하에 진행됩니다.',
      ],
      target: 'C언어에서 함수와 다차원 배열을 모두 다뤄보신 분',
      contents: ['c++, stl', '스택 큐 덱', 'map, set', '그래프', '트리', '우선순위 큐'],
      mentor: [
        ['김예림', '컴퓨터학부 · 24학번', 'yerim2298@hanyang.ac.kr', '같이 성장하는 자료구조반!'],
        [
          '신경현',
          '컴퓨터학부 · 23학번',
          'tlsrudgus0501@hanyang.ac.kr',
          '풍물 동아리 탈 많은 관심 부탁드려요!',
        ],
      ],
    },
    {
      tabIdx: 4,
      name: '알고리즘반',
      tag: 'algorithm',
      intro: ['C++ 기반 문제풀이에 주로 쓰이는 알고리즘 위주의 문제 해결 및 설명'],
      target:
        '기본적인 자료구조를 알고 있고 코딩테스트에서 주로 나오는 알고리즘을 공부하고 싶으신 분',
      contents: ['완전탐색', '그래프 탐색', '백트래킹', '그리디', '동적계획법', '최단경로'],
      mentor: [
        ['곽용민', '컴퓨터학부 · 23학번', 'dydals1004@hanyang.ac.kr', '좋은 여러분들과 좋은 PS'],
      ],
    },
    {
      tabIdx: 5,
      name: '코드포스반',
      tag: 'algorithm',
      intro: [
        '이전에 열린 코드포스 대회를 가상 참가하고 codeforces anytime으로 자신의 위치를 확인하는 것을 목표',
      ],
      target: '문제 풀이(PS)에 재미를 느끼고 계신 분',
      contents: [
        '코드포스 대회진행(1)',
        '코드포스 대회진행(2)',
        '코드포스 대회진행(3)',
        '코드포스 대회진행(4)',
        '코드포스 대회진행(5)',
        '코드포스 대회진행(6)',
      ],
      mentor: [
        ['곽용민', 'ICT융합학부 · 23학번', 'fir3work72@gmail.com', 'PS 재밌어요 같이 하실래요?'],
      ],
    },
    {
      tabIdx: 6,
      name: '웹개발 스터디',
      tag: 'development',
      intro: [
        '웹 개발 기초부터 실제 배포까지 경험해보는 과정',
        'HTML/CSS로 웹페이지 만들기부터 JavaScript 동작, GitHub를 통한 배포까지 다룹니다.',
      ],
      target: '웹 개발이 처음이지만 자신만의 웹사이트를 만들어보고 싶으신 분',
      contents: [
        'html/css기본',
        'css심화',
        'javascript(1)',
        'javascript(2)',
        'Open API 맛보기',
        'GitHub 사용법 및 웹사이트 배포',
      ],
      mentor: [['목정빈', '컴퓨터학부 25학번', 'jbmok66@hanyang.ac.kr', '즐겁게 웹개발 공부해요!']],
    },
  ] as const;

  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  return (
    <div className="my-20 flex w-full flex-col items-center px-4">
      <h1 className="mb-8 text-3xl font-bold">스터디 소개</h1>
      <PillTab_study
        tabElements={Class.map((data, idx) => ({
          label: data.name,
          active: activeTabIdx === idx,
          tag: data.tag,
        }))}
        clickHandler={(idx) => setActiveTabIdx(idx)}
        activeTabIdx={activeTabIdx}
        textclass="font-semibold"
      />

      {Class.filter((item) => item.tabIdx === activeTabIdx).map((item, index) => (
        <div
          key={index}
          className="mx-8 mt-10 flex w-full max-w-5xl flex-col items-start rounded-lg border-2 border-[#E0D7F1] p-10"
        >
          <p className="my-4 text-2xl font-bold">{item.name}</p>
          {item.intro.map((introText, i) => (
            <Icon_TextBox
              key={i}
              text={introText}
              divClassName="m-2"
              iconClassName="w-6 h-6"
              textClassName={`text-lg ${item.tag === 'algorithm' ? 'text-[#9747FF]' : 'text-[#5F5CFF]'} font-semibold max-w-7xl`}
              iconSrc={item.tag === 'algorithm' ? Check_algo : Check_dev}
            />
          ))}
          <div className="mt-5 w-full self-center rounded-lg bg-[#EBEBEB] p-6">
            <p className="mb-2">대상</p>
            <p className="text-lg font-semibold">{item.target}</p>
          </div>

          {/* 주차별 내용 */}
          <p className="mb-5 mt-10 text-lg font-semibold">주차별 내용</p>
          {item.contents.map((weekContents, j) => (
            <Line Week={j + 1} Content={weekContents} />
          ))}

          {/* 멘토진 */}
          <p className="mb-5 mt-10 text-lg font-semibold">멘토진</p>
          <div className="flex flex-wrap gap-8">
            {item.mentor.map((mentor, k) => (
              <Mentor
                key={k}
                Name={mentor[0]}
                Department={mentor[1]}
                Email={mentor[2]}
                Message={mentor[3]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Icon_TextBox({
  text,
  divClassName = '',
  iconClassName = '',
  textClassName = '',
  iconSrc,
}: CheckTextProps) {
  return (
    <div className={`flex items-center gap-3 ${divClassName}`}>
      <img src={iconSrc} alt="Icon" className={`${iconClassName}`} />
      <p className={`${textClassName}`}>{text}</p>
    </div>
  );
}

function Line({ Week, Content }: ContentsProps) {
  return (
    <div className="flex h-full w-full flex-row items-center">
      <img src={LineIcon} alt="라인아이콘" className="h-18 w-3" />
      <div className="ml-8 flex w-full flex-row items-center rounded-xl border-2 border-[#D9D9D9] p-3">
        <p className="mx-4 text-sm font-semibold text-[#919191]">{Week}주차</p>
        <p className="mx-4 font-semibold">{Content}</p>
      </div>
    </div>
  );
}

function Mentor({ Name, Department, Email, Message }: MentorProps) {
  return (
    <div className={'flex flex-col pb-4'}>
      <div className="flex flex-row">
        <div className="ml-4 flex flex-col justify-center">
          <Icon_TextBox
            text={Name}
            iconSrc={UserIcon}
            divClassName="m-0.5"
            textClassName="font-semibold text-md"
            iconClassName="w-4 h-4"
          />
          <Icon_TextBox
            text={Department}
            iconSrc={HomeIcon}
            divClassName="m-0.5"
            textClassName="text-[#919191] text-md"
            iconClassName="w-4 h-4"
          />
          <Icon_TextBox
            text={Email}
            iconSrc={MailIcon}
            divClassName="m-0.5"
            textClassName="text-[#919191] text-md"
            iconClassName="w-4 h-4"
          />
        </div>
      </div>
      {Message && (
        <div className="mt-3 max-w-xs rounded-lg border border-[#E0D7F1] bg-[#F8F4FF] p-3">
          <p className="text-sm italic text-[#666666]">"{Message}"</p>
        </div>
      )}
    </div>
  );
}
