import instagram from '@/assets/images/Instagram_logo.png';
import kakaotalk from '@/assets/images/KakaoTalk_logo.png';

export default function Contact() {
  return (
    <section className="mt-4 flex min-h-[100vh] w-full flex-col items-center justify-center bg-[#F0F7FF] px-4 py-16 text-black md:px-8">
      <div className="mb-24 max-w-5xl text-center">
        <h2 className="mb-12 text-2xl font-bold">학회 목표</h2>
        <p className="hidden w-full max-w-5xl text-base md:block">
          저희 알고리즘학회는 알고리즘과 프로그래밍의 즐거움을 함께 나누고 문제를 해결하는 과정에서
          얻는 성취감을 경험하는 것을 목표로 활동하고 있습니다. <br />
          다양한 대회 참가와 스터디를 통해 지식과 경험을 공유하며 한 단계 더 성장하는 학회가
          되겠습니다.
        </p>
        <p className="block w-full text-base md:hidden">
          저희는 알고리즘과 프로그래밍 문제를 해결하는 과정에서 얻는 성취감을 목표로 활동하고
          있습니다.
          <br />
          다양한 대회 참가와 스터디를 통해 지식과 경험을 공유하며 한 단계 더 성장하는 학회가
          되겠습니다.
        </p>
      </div>

      <div className="w-full text-center">
        <h2 className="mb-12 text-2xl font-bold">회원 모집</h2>

        <div className="flex flex-col items-center justify-center gap-20 md:flex-row">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <img src={instagram} alt="Instagram logo" className="h-8 w-8" />
              <a
                href="https://www.instagram.com/hy_zerone/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram으로 이동"
                className="font-medium"
              >
                Instagram : @hy_zerone
              </a>
            </div>

            <div className="flex items-center gap-3">
              <img src={kakaotalk} alt="KakaoTalk logo" className="h-8 w-8" />
              <a
                href="http://pf.kakao.com/_eqEZd"
                target="_blank"
                rel="noopener noreferrer"
                title="카카오톡 채널로 이동"
                className="font-medium"
              >
                카카오톡 채널 : 영과일
              </a>
            </div>
          </div>

          <div className="max-w-md text-center md:text-center">
            <p className="mb-2 text-lg font-semibold">
              지금 바로 학회에 가입하여 함께 성장해보세요!
            </p>
            <p className="text-sm text-gray-600">회원 모집은 해당 연락처를 통해 진행됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
