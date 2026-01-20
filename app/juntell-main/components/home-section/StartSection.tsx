import Image from "next/image";

export function StartSection() {
  return (
    <section className="pb-12 lg:section-padding bg-background-default">
      <div className="pl-4">

        {/* 모바일: 우측 상단 BG 오버레이 이미지 */}
        <div className="relative tablet:hidden overflow-hidden">

          {/* BG 이미지 */}
          <div className="absolute -top-4 -right-4 w-60 h-60 overflow-hidden opacity-80 z-0">
            <Image
              src="/images/kt-banner.svg"
              alt="KT 공식대리점"
              fill
              className="object-cover"
            />
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_top_right,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.7)_25%,rgba(255,255,255,0.3)_55%,rgba(255,255,255,0)_100%)]"></div>
          </div>

          {/* 텍스트 컨텐츠 */}
          <div className="relative z-10 pt-6 pr-6">
            <p className="text-[1.5rem] font-bold text-component-light leading-none mb-4">
              START
            </p>

            <h2 className="text-[1.5rem] font-bold text-label-900 mb-6">
              2014년,<br />
              경남 창원에서 출발했습니다.
            </h2>

            <div className="space-y-4 text-[1rem] text-label-700 leading-relaxed">
            <p>
                한 명 한 명의 고객에게 신뢰를 쌓으며 성장한 준텔레콤은
              <span className="font-bold text-label-900">지금은 마창진을 대표하는 KT 공식 대리점으로 자리 잡았습니다.</span>
              </p>
              <p>
                <span className="font-bold text-label-900">현재 창원·마산·진해 전역에 6개의 오프라인 거점</span>을 운영하며,
                고객이 직접 방문해 믿고 상담할 수 있는 지역 대표 통신 네트워크를 구축했습니다.
              </p>
              <p>
                <span className="font-bold text-label-900">그리고 그 신뢰를 기반으로, 온라인 신사업 ‘KT마켓’ 전국 단위 운영을 확대,</span>을 시작으로
                현재는 KT 공식 파트너 중 전국 2위 규모의 온라인 통신 전문 기업으로 성장했습니다.
              </p>
              <p>
                오프라인의 진정성과 온라인의 확장력을 바탕으로,
                <span className="font-bold text-label-900">고객에게는 신뢰를, 함께 일하는 사람들에게는 자부심을 주는 회사</span>
                를 만들어가고 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 데스크탑 레이아웃 */}
        <div className="hidden tablet:block relative">
          {/* 데스크탑: 원형 이미지 오버레이 */}
          <div className="absolute top-10 right-0 w-[240px] h-[240px] rounded-full overflow-hidden shadow-heavy z-0">
            <Image
              src="/images/kt-banner.svg"
              alt="KT 공식대리점"
              fill
              className="object-cover"
            />
          </div>

          {/* 텍스트 */}
          <div className="relative z-10 max-w-[70%] pt-8">
            <p className="text-title-1 font-bold text-component-light leading-none mb-8">
              START
            </p>

            <h2 className="text-title-3 font-bold text-label-900 mb-6">
              2014년,<br />
              경남 창원에서 출발했습니다.
            </h2>

            <div className="space-y-4 text-body-1 text-label-700 leading-relaxed">
              <p>
                한 명 한 명의 고객에게 <span className="font-bold">신뢰를 쌓으며</span> 성장한 준텔레콤은
              <span className="font-bold text-label-900">지금은 마창진을 대표하는 KT 공식 대리점 으로 자리 잡았습니다.</span>
              </p>
              <p>
                <span className="font-bold text-label-900">현재 창원·마산·진해 전역에 6개의 오프라인 거점</span>을 운영하며,
                고객이 직접 방문해 믿고 상담할 수 있는 지역 대표 통신 네트워크를 구축했습니다.
              </p>
              <p>
                <span className="font-bold text-label-900">그리고 그 신뢰를 기반으로, 온라인 신사업 ‘KT마켓’ 전국 단위 운영을 확대,</span>을 시작으로
                현재는 KT 공식 파트너 중 전국 2위 규모의 온라인 통신 전문 기업으로 성장했습니다.
              </p>
              <p>
                오프라인의 진정성과 온라인의 확장력을 바탕으로,
                <span className="font-bold text-label-900">고객에게는 신뢰를, 함께 일하는 사람들에게는 자부심을 주는 회사</span>
                를 만들어가고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}