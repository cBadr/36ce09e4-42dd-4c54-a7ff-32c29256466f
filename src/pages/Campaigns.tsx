
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ChevronDown, 
  Play, 
  Pause,
  Copy,
  Loader
} from 'lucide-react';
import { getCampaigns, deleteCampaign, updateCampaign } from '@/integrations/supabase/helper';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
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
  // إضافة الحقول الأخرى حسب الحاجة
}

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const campaignsData = await getCampaigns();
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('فشل في جلب الحملات');
    } finally {
      setIsLoading(false);
    }
  };

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
        setCampaigns(prevCampaigns => prevCampaigns.filter(campaign => campaign.id !== id));
      }
    }
    setDropdownOpen(null);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const success = await updateCampaign(id, { status: newStatus });
    if (success) {
      setCampaigns(prevCampaigns => prevCampaigns.map(campaign => 
        campaign.id === id ? { ...campaign, status: newStatus } : campaign
      ));
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
      // إنشاء نسخة من الحملة مع اسم جديد
      const newCampaign = {
        name: `نسخة من ${campaignToDuplicate.name}`,
        status: 'مسودة',
        audio_file_id: campaignToDuplicate.audio_files ? campaignToDuplicate.id : null
      };
      
      // يمكن إضافة المزيد من الحقول حسب الحاجة
      
      // هنا يمكن إضافة رمز لإنشاء الحملة الجديدة
      toast.info('جاري تنفيذ عملية النسخ...');
    }
    setDropdownOpen(null);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return 'تاريخ غير صالح';
    }
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns/create');
  };

  return (
    <DashboardLayout title="الحملات الإعلانية">
      {/* أدوات التحكم والفلترة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="text"
              placeholder="البحث عن حملة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          <Button variant="outline" className="flex items-center">
            <Filter className="ml-2 h-4 w-4" />
            فلترة
            <ChevronDown className="mr-1 h-4 w-4" />
          </Button>
        </div>

        <Button className="bg-brand-800 hover:bg-brand-700" onClick={handleCreateCampaign}>
          <Plus className="ml-2 h-5 w-5" />
          حملة جديدة
        </Button>
      </div>

      {/* عرض الحملات */}
      <Card>
        <CardContent className="p-0">
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
              ) : filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
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
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Campaigns;
