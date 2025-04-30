
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { createCampaign, getAudioFiles, uploadAudioFile } from '@/integrations/supabase/helper';
import { useAuth } from '@/components/AuthProvider';
import { toast } from 'sonner';
import { FileAudio, Plus, Upload, ArrowLeft } from 'lucide-react';

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    status: 'مسودة',
    audio_file_id: '',
  });
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const files = await getAudioFiles();
      setAudioFiles(files);
    };

    fetchAudioFiles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaignData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCampaignData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // التحقق من نوع الملف (يجب أن يكون ملف صوتي)
      if (!file.type.startsWith('audio/')) {
        toast.error('يرجى اختيار ملف صوتي فقط');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile || !user) return;
    
    setIsUploading(true);
    
    try {
      const uploadedFile = await uploadAudioFile(selectedFile, user.id);
      if (uploadedFile) {
        toast.success('تم رفع الملف الصوتي بنجاح');
        setAudioFiles((prev) => [uploadedFile, ...prev]);
        setCampaignData((prev) => ({
          ...prev,
          audio_file_id: uploadedFile.id,
        }));
        setSelectedFile(null);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignData.name) {
      toast.error('يرجى إدخال اسم الحملة');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const data = {
        ...campaignData,
        user_id: user?.id,
      };
      
      const result = await createCampaign(data);
      
      if (result) {
        toast.success('تم إنشاء الحملة بنجاح');
        navigate('/campaigns');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="إنشاء حملة جديدة">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center"
        onClick={() => navigate('/campaigns')}
      >
        <ArrowLeft className="ml-2 h-4 w-4" />
        العودة إلى الحملات
      </Button>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* البيانات الرئيسية */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>البيانات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">اسم الحملة *</Label>
                <Input
                  id="name"
                  name="name"
                  value={campaignData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسم الحملة"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">وصف الحملة</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={campaignData.description}
                  onChange={handleChange}
                  placeholder="أدخل وصفاً مختصراً للحملة"
                  className="mt-1 min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="status">حالة الحملة</Label>
                <Select
                  value={campaignData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="اختر حالة الحملة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مسودة">مسودة</SelectItem>
                    <SelectItem value="مجدولة">مجدولة</SelectItem>
                    <SelectItem value="نشطة">نشطة</SelectItem>
                    <SelectItem value="مكتملة">مكتملة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* اختيار الملف الصوتي */}
          <Card>
            <CardHeader>
              <CardTitle>الرسالة الصوتية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={campaignData.audio_file_id}
                onValueChange={(value) => handleSelectChange('audio_file_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر ملفاً صوتياً" />
                </SelectTrigger>
                <SelectContent>
                  {audioFiles.map((file) => (
                    <SelectItem key={file.id} value={file.id}>
                      {file.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">أو قم برفع ملف صوتي جديد</p>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                  <div className="flex flex-col items-center">
                    <FileAudio className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">اختر ملفاً صوتياً لرفعه</p>
                    <p className="text-xs text-gray-500 mt-1">MP3, WAV, أو OGG</p>
                    
                    <label htmlFor="audio-file" className="mt-2 cursor-pointer">
                      <span className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-brand-800 hover:bg-brand-700">
                        <Plus className="h-4 w-4 ml-2" />
                        اختر ملفاً
                      </span>
                      <input
                        id="audio-file"
                        type="file"
                        accept="audio/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  
                  {selectedFile && (
                    <div className="mt-4 flex flex-col">
                      <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button 
                        type="button" 
                        className="mt-2 w-full"
                        onClick={handleUploadFile}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>جاري الرفع...</>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 ml-2" />
                            رفع الملف
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            type="button" 
            variant="outline" 
            className="ml-2"
            onClick={() => navigate('/campaigns')}
          >
            إلغاء
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء الحملة'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default CreateCampaign;
