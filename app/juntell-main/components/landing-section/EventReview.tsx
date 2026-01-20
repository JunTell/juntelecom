'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
  {
    id: 1,
    content:
      '가족 모두 상남동 준텔레콤에서 바꾼지 최소 6년이상입니다🤣 아마 더 될 것 같은데… 갈때마다 항상 친절하시고, 꼼꼼하게 설명해주셔요ㅎㅎ',
    name: '연두** 님 후기',
  },
  {
    id: 2,
    content:
      '그동안 다른 곳엔 없는 준케어 서비스 잘 이용했어요 이번에도 친절히 응대해주셔서 기분 좋게 구매했습니다 2년 뒤에 또 구매하러 올게요~ ^^',
    name: 'ghkdlf*** 님 후기',
  },
  {
    id: 3,
    content:
      '확실히 KT 전문인 곳은 다르네요 결합할인도 잘 묶어주셔서 오히려 월 요금이 낮아졌더라구요 상담 너무 감사합니다',
    name: 'ghkdl*** 님 후기',
  },
  {
    id: 4,
    content:
      '통신비 부담되었는데 알뜰하게 잘 상담해주셔서 감사합니다! 가격도 저렴하고 서비스도 만족스러워요 다음에도 꼭 이용할게요',
    name: 'skfk*** 님 후기',
  },
  {
    id: 5,
    content:
      '친구 소개로 방문했는데 역시 소문대로 친절하시고 요금제 상담도 꼼꼼히 해주셨어요 다른 매장과 비교 안되게 좋네요',
    name: 'dbstj** 님 후기',
  },
  {
    id: 6,
    content:
      '핸드폰 고장났을 때도 빠르게 처리해주시고 사후관리가 정말 좋아요 믿고 맡길 수 있는 곳입니다 적극 추천합니다!',
    name: 'wlstj*** 님 후기',
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  centerMode: true,
  centerPadding: '12.5%',
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        centerPadding: '12.5%',
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
        centerPadding: '8%',
      },
    },
  ],
};

export function EventReview() {
  return (
    <section className="w-full py-16 px-4 flex justify-center bg-gray-50 overflow-hidden">
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="flex flex-col items-center lg:items-start justify-center lg:min-w-[300px]">
          <h2 className="text-2xl tablet:text-3xl font-bold leading-snug text-center lg:text-left">
            <span className="text-[#3A6BFF]">고객님들 후기로</span>{' '}
            증명합니다
          </h2>
          <p className="mt-6 text-sm tablet:text-base text-[#555] leading-relaxed text-center lg:text-left">
            최저가 할부원금을 약속드립니다.
            <br />
            할부원금, 꼭! 비교해보고 결정하세요!
          </p>
        </div>

        <div className="w-full flex-1">
          <Slider {...sliderSettings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-3 mb-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full min-h-[200px] flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm tablet:text-base text-gray-800 leading-relaxed mb-4 flex-1 break-keep">
                    {review.content}
                  </p>
                  <p className="text-xs tablet:text-sm text-gray-400">
                    {review.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}