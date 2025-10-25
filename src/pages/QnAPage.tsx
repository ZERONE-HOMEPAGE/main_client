import QnAIntro from '@/components/sections/QnAPage/QnAIntro';
import QnABox from '@/components/sections/QnAPage/QnABox';

/* flex min-h-[100vh] w-full max-w-5xl flex-col items-center justify-evenly gap-6 px-4 py-8 md:gap-10 bg-[B5A9FF] */
export default function QnAPage() {
  const qna = [
    {
      Question : "스터디는 어떻게 진행되나요?",
      Answer : "영과일에서는 학습 수준에 따라 C기초반, 브릿지반, 알고리즘반 등 다양한 단계의 스터디를 운영하고 있습니다. 각 스터디는 경험 많은 멘토들이 직접 지도하며, 자신의 실력에 맞게 배우고 성장할 수 있는 환경을 제공합니다."
    },
    {
      Question : "모집 시기는 언제인가요?",
      Answer : "영과일은 상시모집으로 홈페이지의 가입하기 버튼을 클릭하시면 가입 설문으로 넘어가니 많은 관심 부탁드립니다!"
    },
    {
      Question : "코딩 초보도 가입이 가능한가요?",
      Answer : ""
    },
    {
      Question : "전공이나 학년에 제한이 있나요",
      Answer : ""
    },
    {
      Question : "활동 시간이 어떻게 되나요?",
      Answer : ""
    },
    {
      Question : "회비는 얼마인가요?",
      Answer : ""
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-cyan-100">
      <div className="flex w-full justify-between items-center">
        <QnAIntro />
        <div className="flex flex-col">
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
