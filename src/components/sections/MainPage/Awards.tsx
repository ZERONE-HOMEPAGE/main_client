import Trophyicon from '@/assets/icon/Trophy.png';
import PillTab from '@/components/ui/PillTab';
import { useState } from 'react';

export default function Awards() {
  const awards = [
    {
      tabIdx: 0,
      year: 2019,
      type: [0, 0, 0, 1],
    },
    {
      tabIdx: 0,
      year: 2021,
      type: [0, 1, 0, 1],
    },
    {
      tabIdx: 0,
      year: 2022,
      type: [0, 0, 0, 1],
    },
    {
      tabIdx: 0,
      year: 2023,
      type: [0, 1, 0, 0],
    },
    {
      tabIdx: 0,
      year: 2024,
      type: [0, 0, 1, 0],
    },
    {
      tabIdx: 0,
      year: 2025,
      type: [2, 0, 2, 4],
    },
    {
      tabIdx: 1,
      year: 2019,
      type: [2, 2, 2, 0],
    },
    {
      tabIdx: 1,
      year: 2024,
      type: [2, 2, 4, 0],
    },
  ];

  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  const labels = ['대상', '최우수상', '우수상', '장려상'];
  const newLabels = ['대상', '금상', '은상', '동상'];

  return (
    <div className="flex min-h-[100vh] w-full flex-col items-center justify-evenly gap-6 bg-[#EDEEFF] px-4 py-8 md:gap-10">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-10 text-2xl font-bold">각종 경진대회</p>
        <h1 className="mb-4 mt-3 text-3xl font-bold">수상 이력</h1>
      </div>

      <div
        data-aos="fade-up"
        className="flex w-full max-w-5xl flex-col items-center justify-center gap-4"
      >
        <PillTab
          tabElements={[
            { label: 'shake!', active: activeTabIdx === 0 },
            { label: 'HEPC', active: activeTabIdx === 1 },
          ]}
          clickHandler={(index) => setActiveTabIdx(index)}
          activeTabIdx={activeTabIdx}
          textclass="font-semibold"
        />

        <div className="grid min-h-[300px] w-full grid-cols-2 gap-2 rounded-lg bg-[#DCDAEF] p-3 md:min-h-[350px] md:grid-cols-3">
          {awards
            .filter((award) => award.tabIdx === activeTabIdx)
            .map((award, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-2 rounded-lg bg-white p-2"
              >
                <span className="text-left font-bold">{award.year}년</span>
                <div className="flex flex-row flex-wrap justify-end gap-1 md:gap-2">
                  {award.type.map((count, i) => {
                    if (count === 0) return null;
                    return (
                      <div key={i} className="flex min-w-0 flex-shrink flex-col items-center">
                        <div className="mb-1 flex max-w-full flex-wrap justify-center gap-0.5">
                          {Array.from({ length: count }).map((_, j) => (
                            <img
                              key={j}
                              src={Trophyicon}
                              alt="트로피 아이콘"
                              className="h-[20px] w-[20px] flex-shrink-0 sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px]"
                            />
                          ))}
                        </div>
                        <span className="whitespace-nowrap text-xs font-bold sm:text-sm">
                          {award.year >= 2025 ? newLabels[i] : labels[i]} {count}회
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
      <p className="mb-4 mt-4 max-w-5xl px-4 text-center text-sm font-bold leading-relaxed md:mb-12 md:mt-6 md:text-lg">
        위와 같은 수상 경험을 통해 알고리즘 문제 해결 능력을 입증하였으며
        <br /> 다양한 문제 유형을 분석하고 해결하는 과정에서 논리적 사고력과 실전 감각을 지속적으로
        향상시켜 왔습니다.
      </p>
    </div>
  );
}
