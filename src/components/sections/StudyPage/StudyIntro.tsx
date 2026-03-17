import Check_algo from '@/assets/icon/CheckIcon_algo.png';
import HomeIcon from '@/assets/icon/home.png';
import UserIcon from '@/assets/icon/user.png';
import MailIcon from '@/assets/icon/mail.png';
import ClockIcon from '@/assets/icon/clock.png';
import MaxUserIcon from '@/assets/icon/maxUser.png';
import lineIcon from '@/assets/icon/line.png';
import PillTab_study from '@/components/ui/PillTab/PillTab_study';
import { useState } from 'react';
import { useStudies } from '@/hooks/useStudy';
import type { Mentor, Study, Week } from '@/api/study';

interface IconTextBoxProps {
  text: string;
  divClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  iconSrc?: string;
  noContainer?: boolean;
}

const WEEKDAY_KO: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

export default function StudyIntro() {
  const { data: studies, isLoading, isError } = useStudies();
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  if (isLoading) {
    return (
      <div className="my-20 flex w-full flex-col items-center px-4">
        <h1 className="mb-8 text-3xl font-bold">스터디 소개</h1>
        <p className="text-gray-400">스터디 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !studies) {
    return (
      <div className="my-20 flex w-full flex-col items-center px-4">
        <h1 className="mb-8 text-3xl font-bold">스터디 소개</h1>
        <p className="text-red-400">
          스터디 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  const activeStudy = studies[activeTabIdx];

  return (
    <div className="my-20 flex w-full flex-col items-center px-4">
      <h1 className="mb-8 text-3xl font-bold">스터디 소개</h1>

      <PillTab_study
        tabElements={studies.map((study, idx) => ({
          label: study.name,
          active: activeTabIdx === idx,
        }))}
        clickHandler={(idx) => setActiveTabIdx(idx)}
        activeTabIdx={activeTabIdx}
        textclass="font-semibold"
      />

      {activeStudy && <StudyCard key={activeStudy.studyId} study={activeStudy} />}
    </div>
  );
}

// ─── 스터디 카드 ──────────────────────────────────────────

function StudyCard({ study }: { study: Study }) {
  const introLines = study.description ? study.description.split(/\\n|\n/).filter(Boolean) : [];

  return (
    <div className="mx-8 mt-10 flex w-full max-w-5xl flex-col items-start rounded-lg border-2 border-[#E0D7F1] p-10">
      {/* 소개 */}
      {introLines.map((line, i) => (
        <IconTextBox
          key={i}
          text={line}
          divClassName="m-2"
          iconClassName="w-6 h-6"
          textClassName={`md:text-lg text-md text-[#9747FF] font-semibold max-w-7xl`}
          iconSrc={Check_algo}
        />
      ))}

      {/* 대상 */}
      {study.target && (
        <div className="mt-5 w-full self-center rounded-lg bg-[#EBEBEB] p-6">
          <p className="mb-2">대상</p>
          <p className="text-lg font-semibold">{study.target}</p>
        </div>
      )}

      {/* 주차별 내용 */}
      {(study.weeks?.length ?? 0) > 0 && (
        <>
          <p className="mb-5 mt-10 text-lg font-semibold">주차별 내용</p>
          {[...study.weeks]
            .sort((a, b) => a.weekNo - b.weekNo)
            .map((week) => (
              <WeekRow key={week.weekId} week={week} />
            ))}
        </>
      )}

      {/* 신청하기 */}
      {(study.mentors?.length ?? 0) > 0 && (
        <div className="font-medium">
          <p className="text-md mb-1 mt-10 font-semibold text-[#0E0E0E] md:text-lg">신청하기</p>
          <p className="md:text-md text-sm text-[#6B6B6B]">
            스터디 요일 교차 신청은 카카오톡 영과일로 문의 부탁드립니다
          </p>
          <p className="md:text-md mb-10 text-sm text-[#6B6B6B]">
            (스터디 중 하나는 신청하셔야합니다)
          </p>
          <div className="flex flex-wrap gap-6">
            {(study.mentors ?? []).map((mentor) => (
              <MentorCard key={mentor.userId} mentor={mentor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 주차별 행 ────────────────────────────────────────────

function WeekRow({ week }: { week: Week }) {
  return (
    <div className="flex h-full w-full flex-row items-center">
      <img src={lineIcon} alt="라인아이콘" className="h-18 w-3" />
      <div className="ml-8 flex w-full flex-row items-center justify-between rounded-xl border-2 border-[#D9D9D9] p-3">
        <div className="flex items-center">
          <p className="mx-4 text-sm font-semibold text-[#919191]">{week.weekNo}주차</p>
          <p className="mx-4 font-semibold">{week.description}</p>{' '}
        </div>
      </div>
    </div>
  );
}

// ─── 멘토 카드 ────────────────────────────────────────────

function MentorCard({ mentor }: { mentor: Mentor }) {
  const scheduleEntries = Object.entries(mentor.studyTime ?? {});

  return (
    <div className="flex w-56 flex-col">
      <IconTextBox
        text={mentor.name}
        iconSrc={UserIcon}
        divClassName="mb-1"
        textClassName="font-semibold text-sm"
        iconClassName="w-7 h-7"
        noContainer
      />
      <div className="p-1"></div>
      <IconTextBox
        text={`${mentor.department} · ${mentor.studentId}학번`}
        iconSrc={HomeIcon}
        divClassName="mb-1"
        textClassName="text-[#919191] text-sm font-medium"
        iconClassName="w-4 h-4"
      />
      {mentor.email && (
        <IconTextBox
          text={mentor.email}
          iconSrc={MailIcon}
          divClassName="mb-1"
          textClassName="text-[#919191] text-sm font-medium"
          iconClassName="w-4 h-4"
        />
      )}

      <div className="my-1 w-[85%] border-t border-[#D9D9D9] md:w-full" />

      {/* 수업 시간 */}
      <div className="mt-3 flex flex-col gap-0.5">
        {scheduleEntries.map(([weekday, slot], index) => (
          <IconTextBox
            key={weekday}
            text={`${WEEKDAY_KO[weekday] ?? weekday}요일 ${slot.startTime} ~ ${slot.endTime}`}
            iconSrc={index === 0 ? ClockIcon : undefined}
            textClassName="text-[#919191] text-sm font-medium"
            iconClassName="w-4 h-4"
          />
        ))}
      </div>

      {/* 제한 인원 */}
      <IconTextBox
        text={mentor.maxCapacity === null ? '제한 없음' : `제한인원 ${mentor.maxCapacity}명`}
        iconSrc={MaxUserIcon}
        divClassName="mt-1"
        textClassName="text-[#919191] text-sm font-medium"
        iconClassName="h-4"
      />
    </div>
  );
}

// ─── 공통 UI ─────────────────────────────────────────────

function IconTextBox({
  text,
  divClassName = '',
  iconClassName = '',
  textClassName = '',
  iconSrc,
  noContainer = false,
}: IconTextBoxProps) {
  return (
    <div className={`flex items-center gap-3 ${divClassName}`}>
      {iconSrc ? (
        noContainer ? (
          <img src={iconSrc} alt="Icon" className={iconClassName} />
        ) : (
          <div className="flex w-6 flex-shrink-0 items-center justify-center">
            <img src={iconSrc} alt="Icon" className={iconClassName} />
          </div>
        )
      ) : (
        <div className="w-6 flex-shrink-0" />
      )}
      <p className={textClassName}>{text}</p>
    </div>
  );
}
