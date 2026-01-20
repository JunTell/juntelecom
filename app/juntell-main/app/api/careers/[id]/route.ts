import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * 특정 ID를 가진 단일 채용 공고를 Supabase에서 조회합니다.
 * @param request - Next.js Request 객체
 * @param params - URL 매개변수 (id 포함)
 * @returns 조회된 채용 공고 데이터 또는 오류 응답
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // 1. UUID 유효성 검사 (클라이언트 측에서 잘못된 ID 형식을 보냈을 때를 대비)
  // 정규식을 사용해 UUID 형식이 맞는지 빠르게 확인합니다.
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
      console.warn('Invalid UUID format received:', id);
      return NextResponse.json({ error: '잘못된 형식의 채용공고 ID입니다.' }, { status: 400 });
  }

  // 2. Supabase 클라이언트 생성
  const supabase = await createClient();

  try {
    // 3. 'jobs' 테이블에서 ID가 일치하는 단일 레코드 조회
    const { data, error } = await supabase
      .from('jobs')
      .select(
        'id, title, department, location, employment_type, experience_level, tags, posted_at, description'
      )
      .eq('id', id)
      .single(); // 단일 레코드를 기대함

    if (error) {
      // Supabase 쿼리 실행 중 에러 발생 (예: 네트워크 문제, 권한 문제 등)
      console.error('Supabase query error:', error.message);
      return NextResponse.json({ error: '데이터베이스 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }
    
    if (!data) {
      // 데이터가 존재하지 않음 (404 Not Found)
      return NextResponse.json({ error: '요청한 ID에 해당하는 채용공고를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 4. 성공적으로 데이터 반환
    return NextResponse.json(data);
  } catch (err) {
    // 예기치 않은 서버 측 에러 처리
    console.error('Error fetching job:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}