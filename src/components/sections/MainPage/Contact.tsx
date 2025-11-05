import instagram from '@/assets/images/Instagram_logo.png';
import kakaotalk from '@/assets/images/KakaoTalk_logo.png';

export default function Contact() {
  return (
    <section className="bg-[#F0F7FF] text-black min-h-[100vh] w-full mt-4 py-16 px-4 md:px-8 flex flex-col items-center justify-center">
      <div className="mb-24 text-center max-w-5xl">
        <h2 className="text-2xl font-bold mb-12">학회 목표</h2>
        <p className="text-base w-full hidden md:block max-w-5xl">
          저희 알고리즘학회는 알고리즘과 프로그래밍의 즐거움을 함께 나누고 문제를 해결하는 과정에서
          얻는 성취감을 경험하는 것을 목표로 활동하고 있습니다. <br />
          다양한 대회 참가와 스터디를 통해 지식과 경험을 공유하며 한 단계 더 성장하는 학회가
          되겠습니다.
        </p>
        <p className="text-base w-full block md:hidden w-full">
          저희는 알고리즘과 프로그래밍 문제를 해결하는 과정에서 얻는 성취감을 목표로 활동하고 있습니다.
          <br/>다양한 대회 참가와 스터디를 통해 지식과 경험을 공유하며 한 단계 더 성장하는 학회가 되겠습니다.
        </p>
      </div>

      <div className="text-center w-full ">
        <h2 className="text-2xl font-bold mb-12">회원 모집</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-20">
          <div className="flex flex-col gap-6 items-start">
            <div className="flex items-center gap-3">
              <img src={instagram} alt="Instagram logo" className="w-8 h-8" />
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
              <img src={kakaotalk} alt="KakaoTalk logo" className="w-8 h-8" />
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

          <div className="text-center md:text-center max-w-md ">
            <p className="text-lg font-semibold mb-2">
              지금 바로 학회에 가입하여 함께 성장해보세요!
            </p>
            <p className="text-sm text-gray-600">회원 모집은 해당 연락처를 통해 진행됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
