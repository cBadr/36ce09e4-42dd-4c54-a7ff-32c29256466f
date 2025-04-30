
import React, { useState } from 'react';
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
  Copy
} from 'lucide-react';

// بيانات تجريبية للحملات
const campaignsData = [
  { 
    id: 1, 
    name: 'حملة العيد 2025', 
    status: 'نشطة', 
    dateCreated: '01/05/2025', 
    totalCalls: 657, 
    responseRate: 68, 
    audioMessage: 'تهنئة_العيد.mp3',
  },
  { 
    id: 2, 
    name: 'العرض الشهري', 
    status: 'نشطة', 
    dateCreated: '15/04/2025', 
    totalCalls: 412, 
    responseRate: 72, 
    audioMessage: 'عرض_شهري.mp3',
  },
  { 
    id: 3, 
    name: 'عملاء الفرع الجديد', 
    status: 'مجدولة', 
    dateCreated: '28/04/2025', 
    totalCalls: 0, 
    responseRate: 0, 
    audioMessage: 'فرع_جديد.mp3',
  },
  { 
    id: 4, 
    name: 'عرض نهاية الصيف', 
    status: 'مكتملة', 
    dateCreated: '10/03/2025', 
    totalCalls: 850, 
    responseRate: 65, 
    audioMessage: 'عرض_الصيف.mp3',
  },
  { 
    id: 5, 
    name: 'خصومات الجمعة البيضاء', 
    status: 'مسودة', 
    dateCreated: '05/05/2025', 
    totalCalls: 0, 
    responseRate: 0, 
    audioMessage: 'الجمعة_البيضاء.mp3',
  },
];

const Campaigns = () => {
  const [campaigns] = useState(campaignsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

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

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <Button className="bg-brand-800 hover:bg-brand-700">
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
                <TableHead className="text-left">إجمالي المكالمات</TableHead>
                <TableHead className="text-left">معدل الاستجابة</TableHead>
                <TableHead className="text-left">الرسالة الصوتية</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge className={getBadgeColor(campaign.status)}>{campaign.status}</Badge>
                  </TableCell>
                  <TableCell>{campaign.dateCreated}</TableCell>
                  <TableCell className="text-left">{campaign.totalCalls}</TableCell>
                  <TableCell className="text-left">{campaign.responseRate}%</TableCell>
                  <TableCell className="text-left text-sm text-gray-500">{campaign.audioMessage}</TableCell>
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
                          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(null)}>
                            <Edit className="ml-2 h-4 w-4" />
                            تعديل
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(null)}>
                            <Copy className="ml-2 h-4 w-4" />
                            نسخ
                          </button>
                          {campaign.status === 'نشطة' ? (
                            <button className="flex w-full items-center px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100" onClick={() => setDropdownOpen(null)}>
                              <Pause className="ml-2 h-4 w-4" />
                              إيقاف مؤقت
                            </button>
                          ) : campaign.status !== 'مكتملة' ? (
                            <button className="flex w-full items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100" onClick={() => setDropdownOpen(null)}>
                              <Play className="ml-2 h-4 w-4" />
                              تشغيل
                            </button>
                          ) : null}
                          <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => setDropdownOpen(null)}>
                            <Trash2 className="ml-2 h-4 w-4" />
                            حذف
                          </button>
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredCampaigns.length === 0 && (
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
