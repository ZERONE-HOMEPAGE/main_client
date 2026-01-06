import competetionImg from '@/assets/images/competition.png';
import Card from '@/components/ui/Card';

export default function CompetitionHistory() {
  return (
    <div className="flex min-h-[100vh] w-full max-w-5xl flex-col items-center justify-evenly gap-6 px-4 py-8 md:gap-10">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-10 text-2xl font-bold">자체 경진대회</p>
        <h1 className="mb-4 mt-3 text-3xl font-bold">개최 이력</h1>
      </div>
      <div className="w-full">
        <Card
          animation="fade-right"
          className="relative mb-4 flex h-48 w-full flex-row items-end justify-evenly overflow-hidden p-0 text-white"
        >
          <img
            src={competetionImg}
            alt="배경"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[rgba(10,25,59,0.58)]" />
          <div className="relative flex h-full flex-col items-end justify-end">
            <h1 className="-mb-3 translate-y-2 text-4xl font-bold leading-none md:-mb-5 md:text-7xl">
              HEPC
            </h1>
          </div>
          <ul className="relative list-inside list-disc p-4">
            <li>개최 시기: 매년 5월 초</li>
            <li>참가 규모: 80~100명</li>
            <li>대회 성격: 알고리즘 대회</li>
            <li>특징: 신입생/재학생 부문별 대회 참가 가능</li>
          </ul>
        </Card>

        <Card
          animation="fade-left"
          className="relative mb-8 flex h-48 w-full flex-row items-end justify-evenly overflow-hidden p-0 text-white"
        >
          <img
            src={competetionImg}
            alt="배경"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[rgba(10,25,59,0.58)]" />
          <ul className="relative list-inside list-disc p-4">
            <li>개최 시기: 매년 11월 초</li>
            <li>참가 규모: 20~30명</li>
            <li>대회 성격: 알고리즘 대회</li>
            <li>특징 : 경인지역 연합 프로그래밍 대회의 선발전</li>
          </ul>
          <div className="relative flex h-full flex-col items-end justify-end">
            <h1 className="-mb-3 translate-y-2 text-4xl font-bold leading-none md:-mb-5 md:text-7xl">
              ZOAC
            </h1>
          </div>
        </Card>
      </div>

      <p className="hidden w-full max-w-5xl px-4 text-center text-sm font-bold md:block md:text-lg">
        학회에서는 알고리즘 및 프로그래밍 실력을 향상시키고 우수 인재를 발굴하기 위한 다양한
        경진대회를 주최하고 있습니다.
        <br /> 이러한 경진대회는 참가자들에게 실력을 검증할 기회를 제공할 뿐만 아니라
        <br /> 학회 차원에서 프로그래밍 학습 문화와 경쟁력을 강화하는 데 기여하고 있습니다.
        <br />
        이를 통해 실전 경험을 쌓고 보다 심화된 문제 해결 능력을 배양할 수 있는 환경이 조성되고
        있습니다.
      </p>
      <p className="mx-auto block w-full px-4 text-center text-sm font-bold md:hidden md:text-lg">
        학회에서는 알고리즘 및 프로그래밍 실력을 향상시키고 우수 인재를 발굴하기 위한 다양한
        경진대회를 주최하고 있습니다.
        <br /> 이를 통해 실전 경험을 쌓고 보다 심화된 문제 해결 능력을 배양할 수 있는 환경이
        조성되고 있습니다.
      </p>
    </div>
  );
}
