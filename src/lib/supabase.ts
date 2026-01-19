import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lizscdyawknjoscjrneh.supabase.co'
const supabaseAnonKey = 'sb_publishable_3AFtNYafMSkNgOKc9QupGg_YUXolwkV'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 이미지 URL 가져오기 함수
export const getImageUrl = (imageName: string): string => {
  return `${supabaseUrl}/storage/v1/object/public/images/${imageName}`
}

// 이미지 URL 목록
export const imageUrls = {
  hero: getImageUrl('main.png'),
  company: getImageUrl('2.png'),
  business: getImageUrl('3.png'),
  strengths: getImageUrl('4.png'),
  partners: getImageUrl('5.png'),
  contact: getImageUrl('6.png'),
}

