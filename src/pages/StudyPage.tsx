import { Component, type ReactNode } from 'react';
import StudyIntro from '@/components/sections/StudyPage/StudyIntro';

class StudyErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="my-20 flex w-full flex-col items-center px-4">
          <h1 className="mb-8 text-3xl font-bold">스터디 소개</h1>
          <p className="text-red-400">스터디 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function StudyPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-col items-center justify-center">
        <StudyErrorBoundary>
          <StudyIntro />
        </StudyErrorBoundary>
      </div>
    </div>
  );
}
