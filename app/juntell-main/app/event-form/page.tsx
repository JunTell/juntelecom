"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatPhoneNumber, validatePhoneNumber } from "@/lib/utils/formCheck";

// Animation styles
const fadeSlide = `
@keyframes fadeSlide {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeSlide {
  animation: fadeSlide 0.25s ease-out;
}
`;

export default function EventForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [carrier, setCarrier] = useState("");
  const [region, setRegion] = useState("");
  const [isManualRegion, setIsManualRegion] = useState(false);
  const [device, setDevice] = useState("");

  const carriers = ["KT", "SKT", "U+"];
  const regions = [
    // 특별시/광역시/특별자치시
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    // 경기도
    "수원시",
    "성남시",
    "고양시",
    "용인시",
    "부천시",
    "안산시",
    "안양시",
    "남양주시",
    "화성시",
    "평택시",
    "의정부시",
    "시흥시",
    "파주시",
    "김포시",
    "광명시",
    "광주시",
    "군포시",
    "하남시",
    "오산시",
    "양주시",
    "이천시",
    "구리시",
    "안성시",
    "포천시",
    "의왕시",
    "여주시",
    "동두천시",
    "과천시",
    // 강원도
    "춘천시",
    "원주시",
    "강릉시",
    "동해시",
    "태백시",
    "속초시",
    "삼척시",
    // 충청북도
    "청주시",
    "충주시",
    "제천시",
    // 충청남도
    "천안시",
    "공주시",
    "보령시",
    "아산시",
    "서산시",
    "논산시",
    "계룡시",
    "당진시",
    // 전라북도
    "전주시",
    "군산시",
    "익산시",
    "정읍시",
    "남원시",
    "김제시",
    // 전라남도
    "목포시",
    "여수시",
    "순천시",
    "나주시",
    "광양시",
    // 경상북도
    "포항시",
    "경주시",
    "김천시",
    "안동시",
    "구미시",
    "영주시",
    "영천시",
    "상주시",
    "문경시",
    "경산시",
    // 경상남도
    "창원시",
    "진주시",
    "통영시",
    "사천시",
    "김해시",
    "밀양시",
    "거제시",
    "양산시",
    // 제주특별자치도
    "제주시",
    "서귀포시",
  ];

  const isStepValid = () => {
    if (step === 1) return !!name;
    if (step === 2) return !!phone && phone.length === 13 && !phoneError;
    if (step === 3) return !!carrier;
    if (step === 4) return !!region;
    if (step === 5) return !!device;
    return false;
  };

  const isComplete = name && phone && carrier && region && device;

  const handleNext = () => {
    if (!isStepValid()) return;
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5 && isComplete) {
      // TODO: 실제 제출 로직 연결
      toast.success("신청이 완료되었습니다.");
      router.push('/');
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepTitle = () => {
    if (step === 1) return "이름";
    if (step === 2) return "전화번호";
    if (step === 3) return "통신사";
    if (step === 4) return "거주 지역(시)";
    if (step === 5) return "희망 기종";
    return "";
  };

  return (
    <div className="mx-auto min-h-screen p-6 flex flex-col">
      <style>{fadeSlide}</style>
      {/* 상단 바 */}
      <header className="flex items-center justify-between mb-8">
        <button
          type="button"
          className={`text-2xl ${step === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 cursor-pointer"}`}
          onClick={handlePrev}
          disabled={step === 1}
        >
          ←
        </button>
        <div className="text-sm text-gray-500">
          {step} / 5
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      {/* 제목 */}
      <div className="mb-8">
        <p className="text-xs text-blue-500 font-medium mb-1">휴대폰 본인 신청</p>
        <h1 className="text-2xl font-semibold">{renderStepTitle()}</h1>
      </div>

      {/* 입력 영역 */}
      <div
        key={step}
        className="flex-1 transition-all duration-300 ease-out animate-fadeSlide"
      >
        {step === 1 && (
          <div className="mb-6">
            <label className="text-sm text-gray-600">이름</label>
            <input
              autoFocus
              type="text"
              className="w-full border-b py-3 text-lg focus:outline-none"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="mb-6">
            <label className="text-sm text-gray-600">전화번호</label>
            <input
              autoFocus
              type="tel"
              className={`w-full border-b py-3 text-lg focus:outline-none ${
                phoneError ? "border-red-500" : ""
              }`}
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                setPhone(formatted);
                if (formatted.length === 13) {
                  const error = validatePhoneNumber(formatted);
                  setPhoneError(error);
                } else {
                  setPhoneError(null);
                }
              }}
              onBlur={() => {
                if (phone) {
                  const error = validatePhoneNumber(phone);
                  setPhoneError(error);
                }
              }}
              maxLength={13}
            />
            {phoneError && (
              <p className="mt-2 text-sm text-red-500">{phoneError}</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="mb-6">
            <label className="text-sm text-gray-600">통신사</label>
            <div className="flex gap-2 mt-3">
              {carriers.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`flex-1 py-3 rounded-lg border text-sm cursor-pointer ${
                    carrier === c
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 text-gray-800"
                  }`}
                  onClick={() => setCarrier(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-gray-600">거주 지역(시)</label>
              <button
                type="button"
                onClick={() => {
                  setIsManualRegion(!isManualRegion);
                  setRegion("");
                }}
                className="text-lg text-blue-500 cursor-pointer"
              >
                {isManualRegion ? "목록에서 선택" : "직접 입력"}
              </button>
            </div>
            {isManualRegion ? (
              <input
                autoFocus
                type="text"
                className="w-full border-b py-3 text-lg focus:outline-none"
                placeholder="거주 지역을 입력해주세요"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            ) : (
              <select
                className="w-full border-b py-3 text-lg focus:outline-none cursor-pointer"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">선택하세요</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="mb-6">
            <label className="text-sm text-gray-600">희망 기종</label>
            <input
              className="w-full border-b py-3 text-lg focus:outline-none"
              placeholder="아이폰 15 / 갤럭시 S24"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
            />
            <p className="mt-2 text-xs text-gray-400">
              예: 아이폰 15, 갤럭시 S24, 갤럭시 Z 플립 등
            </p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 w-full px-6 pb-6 bg-white">
        <button
          type="button"
          disabled={!isStepValid()}
          onClick={handleNext}
          className={`w-full py-4 rounded-lg font-semibold text-white text-base ${
            isStepValid() ? "bg-blue-500 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {step < 5 ? "다음" : "신청 완료"}
        </button>
      </div>
    </div>
  );
}