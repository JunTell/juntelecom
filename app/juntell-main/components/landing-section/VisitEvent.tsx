import Image from 'next/image'

type StoreItem = {
  id: number;
  name: string;
  image: string;
  link: string;
};

const stores: StoreItem[] = [
  {
    id: 1,
    name: '상남1점',
    image: '/images/store-sangnam1.svg',
    link: 'https://map.naver.com/p/search/kt%20%EC%83%81%EB%82%A8%EC%A0%90/place/1195535793?searchType=place&placePath=/home?entry=pll&from=map&fromPanelNum=2&timestamp=202511251621&locale=ko&svcName=map_pcv5&searchText=kt%20%EC%83%81%EB%82%A8%EC%A0%90&lng=128.6846452&lat=35.2245891&c=15.00,0,0,0,dh'
  },
  {
    id: 2,
    name: '상남2점',
    image: '/images/store-sangnam2.svg',
    link: 'https://map.naver.com/p/search/kt%20%EC%83%81%EB%82%A82%EC%A0%90/place/1751848090?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202511251623&locale=ko&svcName=map_pcv5&searchText=kt%20%EC%83%81%EB%82%A82%EC%A0%90'
  },
  {
    id: 3,
    name: '합성1점',
    image: '/images/store-hapseong1.svg',
    link: 'https://map.naver.com/p/entry/place/1057017952?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202511251624&locale=ko&svcName=map_pcv5'
  },
  {
    id: 4,
    name: '합성2점',
    image: '/images/store-hapseong2.svg',
    link: 'https://map.naver.com/p/search/KT%20%EC%A4%80%ED%85%94%EB%A0%88%EC%BD%A4%20%ED%95%A9%EC%84%B12%EC%A0%90?c=15.00,0,0,0,dh'
  },
  {
    id: 5,
    name: '팔용점',
    image: '/images/store-palyong.svg',
    link: 'https://map.naver.com/p/search/KT%20%EC%A4%80%ED%85%94%EB%A0%88%EC%BD%A4%20%ED%8C%94%EC%9A%A9%EC%A0%90/place/33430985?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202511251625&locale=ko&svcName=map_pcv5&searchText=KT%20%EC%A4%80%ED%85%94%EB%A0%88%EC%BD%A4%20%ED%8C%94%EC%9A%A9%EC%A0%90'
  },
  {
    id: 6,
    name: '양덕점',
    image: '/images/store-yangdeok.svg',
    link: 'https://map.naver.com/p/search/KT%20%EC%A4%80%ED%85%94%EB%A0%88%EC%BD%A4%20%EC%96%91%EB%8D%95%EC%A0%90/place/1263874849?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202511251625&locale=ko&svcName=map_pcv5&searchText=KT%20%EC%A4%80%ED%85%94%EB%A0%88%EC%BD%A4%20%EC%96%91%EB%8D%95%EC%A0%90'
  },
];

function StoreCard({ name, image, link }: StoreItem) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-[20px] overflow-hidden shadow bg-white block"
    >
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-500 mt-2">매장 정보 보기 &gt;</p>
      </div>
    </a>
  );
}

export function VisitEvent() {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center overflow-hidden">
      <h2 className="text-title-2 font-bold text-[#3A6BFF]">365일 연중무휴</h2>
      <p className="mt-3 text-title-4 text-gray-700">언제든 편하게 방문하세요!</p>
      <p className="w-full flex justify-start text-title-4 mt-8">평일, 주말 : 10:00~20:00</p>

      <div className="grid grid-cols-2 gap-4 mt-2 w-full">
        {stores.map((store) => (
          <StoreCard key={store.id} {...store} />
        ))}
      </div>
    </section>
  );
}