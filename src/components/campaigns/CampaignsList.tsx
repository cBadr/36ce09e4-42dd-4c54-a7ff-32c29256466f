
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Copy,
  Loader
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteCampaign, updateCampaign } from '@/integrations/supabase/helper';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  status: string;
  created_at: string;
  audio_files: {
    name: string;
    file_path: string;
  } | null;
}

interface CampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
  onCampaignsChanged: () => void;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ 
  campaigns, 
  isLoading,
  onCampaignsChanged 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'نشطة':
        return 'bg-green-100 text-green-800';
      case 'مكتملة':
        return 'bg-blue-100 text-blue-800';
      case 'مجدولة':
        return 'bg-yellow-100 text-yellow-800';
      case 'مسودة':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه الحملة؟')) {
      const success = await deleteCampaign(id);
      if (success) {
        onCampaignsChanged();
        toast.success('تم حذف الحملة بنجاح');
      }
    }
    setDropdownOpen(null);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const success = await updateCampaign(id, { status: newStatus });
    if (success) {
      onCampaignsChanged();
      toast.success(`تم تغيير حالة الحملة إلى ${newStatus}`);
    }
    setDropdownOpen(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/campaigns/edit/${id}`);
    setDropdownOpen(null);
  };

  const handleDuplicate = async (id: string) => {
    const campaignToDuplicate = campaigns.find(campaign => campaign.id === id);
    if (campaignToDuplicate) {
      toast.info('جاري تنفيذ عملية النسخ...');
      // يمكن إضافة المزيد من المنطق هنا لاحقًا
    }
    setDropdownOpen(null);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return 'تاريخ غير صالح';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">اسم الحملة</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>تاريخ الإنشاء</TableHead>
          <TableHead className="text-right">إجمالي المكالمات</TableHead>
          <TableHead className="text-right">معدل الاستجابة</TableHead>
          <TableHead className="text-right">الرسالة الصوتية</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              <div className="flex justify-center items-center">
                <Loader className="h-6 w-6 animate-spin mr-2" />
                جاري تحميل البيانات...
              </div>
            </TableCell>
          </TableRow>
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>
                <Badge className={getBadgeColor(campaign.status)}>{campaign.status}</Badge>
              </TableCell>
              <TableCell>{formatDate(campaign.created_at)}</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell className="text-right">0%</TableCell>
              <TableCell className="text-right text-sm text-gray-500">
                {campaign.audio_files ? campaign.audio_files.name : 'لا يوجد ملف'}
              </TableCell>
              <TableCell className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleDropdown(campaign.id)}
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
                
                {dropdownOpen === campaign.id && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleEdit(campaign.id)}
                      >
                        <Edit className="ml-2 h-4 w-4" />
                        تعديل
                      </button>
                      <button 
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleDuplicate(campaign.id)}
                      >
                        <Copy className="ml-2 h-4 w-4" />
                        نسخ
                      </button>
                      {campaign.status === 'نشطة' ? (
                        <button 
                          className="flex w-full items-center px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100"
                          onClick={() => handleStatusChange(campaign.id, 'مسودة')}
                        >
                          <Pause className="ml-2 h-4 w-4" />
                          إيقاف مؤقت
                        </button>
                      ) : campaign.status !== 'مكتملة' ? (
                        <button 
                          className="flex w-full items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                          onClick={() => handleStatusChange(campaign.id, 'نشطة')}
                        >
                          <Play className="ml-2 h-4 w-4" />
                          تشغيل
                        </button>
                      ) : null}
                      <button 
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => handleDelete(campaign.id)}
                      >
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
                      </button>
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              لم يتم العثور على حملات مطابقة
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CampaignsList;
