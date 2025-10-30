import QnAIntro from '@/components/sections/QnAPage/QnAIntro';
import QnABox from '@/components/sections/QnAPage/QnABox';

/* flex min-h-[100vh] w-full max-w-5xl flex-col items-center justify-evenly gap-6 px-4 py-8 md:gap-10 bg-[B5A9FF] */
export default function QnAPage() {
  const qna = [
    {
      Question : "스터디는 어떻게 진행되나요?",
      Answer : "영과일에서는 학습 수준에 따라 C기초반, 브릿지반, 알고리즘반 등 다양한 단계의 스터디를 운영하고 있습니다.<br/>각 스터디는 경험 많은 멘토들이 직접 지도하며, 자신의 실력에 맞게 배우고 성장할 수 있는 환경을 제공합니다.()"
    },
    {

      Question : "모집 시기는 언제인가요?",
      Answer : "영과일은 상시모집으로 홈페이지의 가입하기 버튼을 클릭하시면 가입 설문으로 넘어가니 많은 관심 부탁드립니다!()"
    },
    {
      Question : "코딩 초보도 가입이 가능한가요?",
      Answer : "가능합니다. 영과일에는 완전 초보자를 위한 기초반이 준비되어 있으며, 언어 설치부터 기본 문법까지 차근차근 학습할 수 있도록 커리큘럼이 구성되어 있습니다.()"
    },
    {
      Question : "전공이나 학년에 제한이 있나요",
      Answer : "없습니다. 컴퓨터 관련 전공이 아니어도, 혹은 1학년이 아니어도 개발 학습 의지만 있다면 누구나 참여 가능합니다.()"
    },
    {
      Question : "활동 시간이 어떻게 되나요?",
      Answer : "정규 스터디는 주 1~2회 진행되며, 시간은 팀별로 조율하여 결정합니다.<br/> 오프라인/온라인 병행 운영으로 일정이 바쁜 경우에도 무리 없이 참여할 수 있습니다.()"
    },
    {
      Question : "회비는 얼마인가요?",
      Answer : "영과일은 회비 없이 운영되고 있으며, 일부 오프라인 행사 또는 대회 참여 시 필요에 따라 소액의 비용이 발생할 수 있습니다.<br/> 이 경우 사전에 충분히 공지해드립니다.()"
    },
  ];

  return (
    <div className="relative isolate min-h-screen flex h-full w-full flex-col px-20 overflow-hidden">
      <div className="absolute left-[-12%] top-[22%] w-[700px] h-[700px] rounded-full
                      bg-[#B5A9FF] opacity-40 blur-[140px] z-0" />
      <div className="absolute left-[20%] top-[6%] w-[500px] h-[500px] rounded-full
                      bg-[#60A5FA] opacity-40 blur-[150px] z-0" />

      <div className="relative z-10 flex w-full justify-between items-center mt-40 mb-20">
        <QnAIntro />
        <div className="flex flex-col w-1/2">
          {qna.map((QA, key) => (
            <QnABox 
              key={key}
              Q = {QA.Question}
              A = {QA.Answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
