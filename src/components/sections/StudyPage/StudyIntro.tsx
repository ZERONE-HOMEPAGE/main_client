import Check_algo from '@/assets/icon/CheckIcon_algo.png';
import Check_dev from '@/assets/icon/CheckIcon_dev.png';
import HomeIcon from '@/assets/icon/home.png';
import LineIcon from '@/assets/icon/line.png';
import UserIcon from '@/assets/icon/user.png';
import PillTab_study from '@/components/ui/PillTab_study';
import MailIcon from '@/assets/icon/mail.png';
import { useState } from 'react';
import { useStudies } from '@/hooks/useStudy';
import type { Mentor, Study, Week } from '@/api/study';

interface IconTextBoxProps {
  text: string;
  divClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  iconSrc?: string;
}

//태그 임시처리
const getTag = (name: string): 'algorithm' | 'development' => {
  const devKeywords = ['웹', 'web', '앱', 'app', '개발', 'dev'];
  return devKeywords.some((kw) => name.toLowerCase().includes(kw)) ? 'development' : 'algorithm';
};

export default function StudyIntro() {
  const { data: studies, isLoading, isError } = useStudies({ includeMentors: true });
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

      {/* 탭 */}
      <PillTab_study
        tabElements={studies.map((study, idx) => ({
          label: study.name,
          active: activeTabIdx === idx,
          tag: getTag(study.name),
        }))}
        clickHandler={(idx) => setActiveTabIdx(idx)}
        activeTabIdx={activeTabIdx}
        textclass="font-semibold"
      />

      {/* 상세 카드 */}
      {activeStudy && <StudyCard key={activeStudy.studyId} study={activeStudy} />}
    </div>
  );
}

// ─── 스터디 카드 ──────────────────────────────────────────

function StudyCard({ study }: { study: Study }) {
  const tag = getTag(study.name);

  // description을 \n 기준으로 나눠 여러 줄 intro로 표시
  const introLines = study.description ? study.description.split('\n').filter(Boolean) : [];

  return (
    <div className="mx-8 mt-10 flex w-full max-w-5xl flex-col items-start rounded-lg border-2 border-[#E0D7F1] p-10">
      {/* 스터디명 + 상태 뱃지 */}
      <div className="my-4 flex items-center gap-3">
        <p className="text-2xl font-bold">{study.name}</p>
        <StatusBadge status={study.status} />
      </div>

      {/* 소개 */}
      {introLines.map((line, i) => (
        <IconTextBox
          key={i}
          text={line}
          divClassName="m-2"
          iconClassName="w-6 h-6"
          textClassName={`text-lg ${tag === 'algorithm' ? 'text-[#9747FF]' : 'text-[#5F5CFF]'} font-semibold max-w-7xl`}
          iconSrc={tag === 'algorithm' ? Check_algo : Check_dev}
        />
      ))}

      {/* 대상 */}
      <div className="mt-5 w-full self-center rounded-lg bg-[#EBEBEB] p-6">
        <p className="mb-2">대상</p>
        <p className="text-lg font-semibold">{study.target}</p>
      </div>

      {/* 주차별 내용 — weeks 배열 활용 */}
      {study.weeks && study.weeks.length > 0 && (
        <>
          <p className="mb-5 mt-10 text-lg font-semibold">주차별 내용</p>
          {study.weeks.map((week) => (
            <WeekRow key={week.weekId} week={week} />
          ))}
        </>
      )}

      {/* 멘토진 */}
      {study.mentors && study.mentors.length > 0 && (
        <>
          <p className="mb-5 mt-10 text-lg font-semibold">멘토진</p>
          <div className="flex flex-wrap gap-8">
            {study.mentors.map((mentor) => (
              <MentorCard key={mentor.userId} mentor={mentor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── 상태 뱃지 ────────────────────────────────────────────

function StatusBadge({ status }: { status: Study['status'] }) {
  const config = {
    OPEN: { label: '모집중', className: 'bg-green-100 text-green-700' },
    CLOSED: { label: '마감', className: 'bg-red-100 text-red-600' },
    ARCHIVED: { label: '종료', className: 'bg-gray-100 text-gray-500' },
  };
  const { label, className } = config[status];
  return (
    <span className={`rounded-full px-3 py-0.5 text-sm font-semibold ${className}`}>{label}</span>
  );
}

// ─── 주차별 행 ────────────────────────────────────────────

function WeekRow({ week }: { week: Week }) {
  return (
    <div className="flex h-full w-full flex-row items-center">
      <img src={LineIcon} alt="라인아이콘" className="h-18 w-3" />
      <div className="ml-8 flex w-full flex-row items-center rounded-xl border-2 border-[#D9D9D9] p-3">
        <p className="mx-4 text-sm font-semibold text-[#919191]">{week.weekNo}주차</p>
        <p className="mx-4 font-semibold">{week.description}</p>
      </div>
    </div>
  );
}

// ─── 멘토 카드 ────────────────────────────────────────────

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="flex flex-col pb-4">
      <div className="flex flex-row">
        <div className="ml-4 flex flex-col justify-center">
          <IconTextBox
            text={mentor.name}
            iconSrc={UserIcon}
            divClassName="m-0.5"
            textClassName="font-semibold text-md"
            iconClassName="w-4 h-4"
          />
          <IconTextBox
            text={`${mentor.department} · ${mentor.studentId}학번`}
            iconSrc={HomeIcon}
            divClassName="m-0.5"
            textClassName="text-[#919191] text-md"
            iconClassName="w-4 h-4"
          />
          {/* email이 null인 멘토 처리 */}
          {mentor.email && (
            <IconTextBox
              text={mentor.email}
              iconSrc={MailIcon}
              divClassName="m-0.5"
              textClassName="text-[#919191] text-md"
              iconClassName="w-4 h-4"
            />
          )}
        </div>
      </div>
      {/* note가 있을 때만 한마디 표시 */}
      {mentor.note && (
        <div className="mt-3 max-w-xs rounded-lg border border-[#E0D7F1] bg-[#F8F4FF] p-3">
          <p className="text-sm italic text-[#666666]">"{mentor.note}"</p>
        </div>
      )}
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
}: IconTextBoxProps) {
  return (
    <div className={`flex items-center gap-3 ${divClassName}`}>
      <img src={iconSrc} alt="Icon" className={iconClassName} />
      <p className={textClassName}>{text}</p>
    </div>
  );
}
