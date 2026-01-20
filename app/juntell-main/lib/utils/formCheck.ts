export const formatBusinessNumber = (businessNumber: string): string => {
  if (!businessNumber || typeof businessNumber !== 'string') {
    return '';
  }

  const cleaned = businessNumber.replace(/[^0-9]/g, '');

  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 10)}`;
};

export const removeBusinessNumberHyphen = (businessNumber: string): string => {
  if (!businessNumber || typeof businessNumber !== 'string') {
    return '';
  }
  return businessNumber.replace(/[^0-9]/g, '');
};

export const isValidBusinessNumber = (businessNumber: string): boolean => {
  if (!businessNumber || typeof businessNumber !== 'string') {
    return false;
  }

  const cleaned = removeBusinessNumberHyphen(businessNumber);
  return cleaned.length === 10 && /^\d{10}$/.test(cleaned);
};

export const validatePassword = (password: string): string | null => {
  if (!password || typeof password !== 'string') {
    return '비밀번호를 입력해주세요';
  }

  if (password.length < 8 || password.length > 15) {
    return '8~15자리 영문, 숫자, 특수문자 조합하여 입력해주세요';
  }

  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLetter || !hasNumber || !hasSpecialChar) {
    return '8~15자리 영문, 숫자, 특수문자 조합하여 입력해주세요';
  }

  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!password || typeof password !== 'string') {
    return null;
  }

  if (!confirmPassword || typeof confirmPassword !== 'string') {
    return null;
  }

  if (password !== confirmPassword) {
    return '위에 입력된 비밀번호와 다르게 입력되었어요';
  }
  return null;
};

export const validateBirthDate = (birthDate: string): string | null => {
  if (!birthDate || typeof birthDate !== 'string') {
    return '생년월일을 입력해주세요';
  }

  if (birthDate.length !== 8) {
    return '생년월일은 YYYYMMDD 형식입니다';
  }

  // Check if it's all digits
  if (!/^\d{8}$/.test(birthDate)) {
    return '생년월일은 YYYYMMDD 형식입니다';
  }

  // Validate actual date
  const year = parseInt(birthDate.slice(0, 4), 10);
  const month = parseInt(birthDate.slice(4, 6), 10);
  const day = parseInt(birthDate.slice(6, 8), 10);

  // Basic range checks
  if (year < 1900 || year > new Date().getFullYear()) {
    return '올바른 생년월일을 입력해주세요';
  }

  if (month < 1 || month > 12) {
    return '올바른 생년월일을 입력해주세요';
  }

  if (day < 1 || day > 31) {
    return '올바른 생년월일을 입력해주세요';
  }

  // Check if date is valid using Date object
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return '올바른 생년월일을 입력해주세요';
  }

  return null;
};

// 전화번호 포맷팅 함수 (자동 하이픈 추가)
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return '';
  }

  // 숫자만 추출
  const cleaned = phoneNumber.replace(/[^0-9]/g, '');

  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return cleaned;

  // 11자리 (예: 010-1234-5678)
  if (cleaned.length <= 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  }

  // 11자리: 010-1234-5678
  if (cleaned.length <= 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }

  // 12자리: 010-1234-5678 형식 유지 (최대 11자리만 사용)
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return '전화번호를 입력해주세요';
  }

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  if (cleanPhone.length === 0) {
    return '전화번호를 입력해주세요';
  }

  // 11자리 허용
  if (cleanPhone.length < 11 || cleanPhone.length > 11) {
    return '전화번호는 11자리로 입력해주세요 (예: 010-1234-5678)';
  }

  if (!cleanPhone.startsWith('010')) {
    return '전화번호는 010으로 시작해야 합니다';
  }

  return null;
};