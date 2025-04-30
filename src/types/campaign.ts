
export interface Campaign {
  id: string;
  name: string;
  status: string;
  created_at: string;
  audio_files: {
    name: string;
    file_path: string;
  } | null;
  // إضافة الحقول الأخرى حسب الحاجة
}
