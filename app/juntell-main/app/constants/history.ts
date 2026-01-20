export type HistoryEvent = {
  text: string
  highlight?: boolean
}

export type HistoryItemType = {
  year: string
  events: HistoryEvent[]
}

export const historyData: HistoryItemType[] = [
  {
    year: '2024',
    events: [
      { text: 'KT 모바일 누적 가입자 4만 달성', highlight: true },
      { text: '창립 10주년 기념 (KT 창원지사 임직원 감사패)' },
      { text: '온라인 본부 독립 사무실 확장 이전 (성장 거점 확보)', highlight: true },
      { text: '온라인 채널 판매 1,000건 달성' },
    ],
  },
  {
    year: '2023',
    events: [
      { text: '온라인 채널 개설 및 신규 사업 분야 확장', highlight: true },
      { text: '부산/경남 고객본부 우수상 수상' },
    ],
  },
  {
    year: '2022',
    events: [
      { text: 'KT 전사 유통 컨벤션 우수상 수상' },
      { text: '유튜브 채널 공식 오픈', highlight: true },
    ],
  },
  {
    year: '2021',
    events: [
      { text: '부산/경남 고객본부 우수상 수상' },
      { text: 'KT 전사 유통 컨벤션 우수상 수상', highlight: true },
      { text: '팔용지점 개장' },
      { text: '합성2지점 개장' },
    ],
  },
  {
    year: '2020',
    events: [
      { text: 'KT 전사 최초! 보유 전매장(3점) 유무선 300클럽 달성', highlight: true },
    ],
  },
  {
    year: '2019',
    events: [
      { text: 'KT Golden Family 선정 (우수 파트너 인증)', highlight: true },
      { text: '우수 대리점 표창장 수상' },
      { text: '유무선 기여도 상장 수상' },
    ],
  },
  {
    year: '2017',
    events: [
      { text: '모바일 누적 가입자 1만 달성', highlight: true },
      { text: "상남점, '300 클럽' 명예의 전당 5회 연속 달성" },
      { text: '상남2지점 개장' },
    ],
  },
  {
    year: '2016',
    events: [
      { text: '(주)준텔레콤 설립 및 본격적인 성장 시작', highlight: true },
      { text: 'KT 전사 최초 1호 명장 선정 (업계 최고 역량 인정)', highlight: true },
      { text: 'KT 창립 최초 모바일 300클럽 달성' },
      { text: '2016년 KT 전사 유통 Convention 7habits 우수상 수상' },
      { text: '상남지점 개장' },
    ],
  },
  {
    year: '2015',
    events: [
      { text: '영업 역량 및 내부 시스템 강화', highlight: true },
    ],
  },
  {
    year: '2014',
    events: [
      { text: '합성지점 개장', highlight: true },
    ],
  },
]