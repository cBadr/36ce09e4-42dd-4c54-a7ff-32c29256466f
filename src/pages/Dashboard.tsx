
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Phone,
  Users,
  BarChart2,
  ArrowUp,
  ArrowDown,
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// بيانات تجريبية للرسم البياني
const chartData = [
  { name: 'السبت', value: 400 },
  { name: 'الأحد', value: 300 },
  { name: 'الإثنين', value: 600 },
  { name: 'الثلاثاء', value: 800 },
  { name: 'الأربعاء', value: 500 },
  { name: 'الخميس', value: 700 },
  { name: 'الجمعة', value: 900 },
];

// بيانات تجريبية للدائرة البيانية
const pieData = [
  { name: 'ردود إيجابية', value: 65 },
  { name: 'ردود سلبية', value: 25 },
  { name: 'لا رد', value: 10 },
];

// ألوان الدائرة البيانية
const COLORS = ['#0EA5E9', '#64748B', '#F43F5E'];

const Dashboard = () => {
  return (
    <DashboardLayout title="لوحة التحكم">
      {/* ملخص البطاقات */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* إجمالي المكالمات */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المكالمات</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-500">
                <ArrowUp className="ml-1 h-3 w-3" />
                12.5%
              </span>{" "}
              مقارنة بالأسبوع الماضي
            </p>
            <Progress className="mt-3" value={65} />
          </CardContent>
        </Card>

        {/* معدل الاستجابة */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">معدل الاستجابة</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-red-500">
                <ArrowDown className="ml-1 h-3 w-3" />
                3.2%
              </span>{" "}
              مقارنة بالأسبوع الماضي
            </p>
            <Progress className="mt-3" value={65} />
          </CardContent>
        </Card>

        {/* الحملات النشطة */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">الحملات النشطة</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-500">
                <ArrowUp className="ml-1 h-3 w-3" />
                2
              </span>{" "}
              جديدة هذا الأسبوع
            </p>
            <Progress className="mt-3" value={50} />
          </CardContent>
        </Card>

        {/* متوسط المدة */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">متوسط المدة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3:25</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-500">
                <ArrowUp className="ml-1 h-3 w-3" />
                0:15
              </span>{" "}
              مقارنة بالأسبوع الماضي
            </p>
            <Progress className="mt-3" value={72} />
          </CardContent>
        </Card>
      </div>

      {/* صف الرسم البياني والدائري */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* الرسم البياني للمكالمات */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>أداء المكالمات الأسبوعي</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* الرسم الدائري لنتائج المكالمات */}
        <Card>
          <CardHeader>
            <CardTitle>نتائج المكالمات</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center space-x-8 space-x-reverse">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 ml-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div className="text-sm">{entry.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الحملات والأنشطة الأخيرة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* الحملات النشطة */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>الحملات النشطة</CardTitle>
            <Button variant="ghost" size="sm" className="text-ocean-500 hover:text-ocean-600 hover:bg-transparent p-0">
              عرض الكل
              <ChevronRight className="mr-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* حملة 1 */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 text-ocean-500 flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-medium">حملة العيد 2025</h3>
                    <p className="text-sm text-muted-foreground">657 مكالمة | 68% معدل استجابة</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    نشطة
                  </span>
                </div>
              </div>
              
              {/* حملة 2 */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 text-ocean-500 flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-medium">العرض الشهري</h3>
                    <p className="text-sm text-muted-foreground">412 مكالمة | 72% معدل استجابة</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    نشطة
                  </span>
                </div>
              </div>
              
              {/* حملة 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 text-ocean-500 flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-medium">عملاء الفرع الجديد</h3>
                    <p className="text-sm text-muted-foreground">165 مكالمة | 54% معدل استجابة</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    مجدولة
                  </span>
                </div>
              </div>
              
              {/* زر إنشاء حملة جديدة */}
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Plus className="ml-1 h-4 w-4" />
                  إنشاء حملة جديدة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* النشاط الأخير */}
        <Card>
          <CardHeader>
            <CardTitle>النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  text: "تم إنشاء حملة جديدة",
                  time: "منذ 30 دقيقة",
                  icon: <Plus className="h-4 w-4 text-green-500" />
                },
                {
                  text: "تم تحديث قائمة العملاء",
                  time: "منذ ساعتين",
                  icon: <Users className="h-4 w-4 text-blue-500" />
                },
                {
                  text: "اكتملت حملة 'عرض نهاية الصيف'",
                  time: "منذ 5 ساعات",
                  icon: <BarChart2 className="h-4 w-4 text-purple-500" />
                },
                {
                  text: "تم إضافة رسالة صوتية جديدة",
                  time: "منذ 8 ساعات",
                  icon: <Phone className="h-4 w-4 text-orange-500" />
                },
                {
                  text: "تم تجديد الاشتراك",
                  time: "منذ يوم واحد",
                  icon: <Clock className="h-4 w-4 text-green-500" />
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="ml-2 mt-1">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
