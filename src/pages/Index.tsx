
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Phone, BarChart2, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* القسم الرئيسي */}
      <header className="bg-gradient-to-br from-brand-800 to-brand-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.08] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">حملاتك الإعلانية <span className="text-ocean-500">أسرع وأسهل</span> مع واصل</h1>
              <p className="text-xl md:text-2xl mb-8 font-light">
                منصة متكاملة لإدارة حملاتك الإعلانية الصوتية بكفاءة عالية وأداء مضمون
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-ocean-500 hover:bg-ocean-600 text-white text-lg">
                  ابدأ الآن مجاناً
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg">
                  تواصل معنا
                </Button>
              </div>
            </div>
            
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-4 w-full max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center p-4">
                  <div className="bg-ocean-500/20 p-3 rounded-lg mb-3">
                    <Phone size={24} className="text-ocean-500" />
                  </div>
                  <h3 className="font-bold">واصل لكل عميل</h3>
                  <p className="text-sm opacity-80">اتصالات آلية مخصصة</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="bg-ocean-500/20 p-3 rounded-lg mb-3">
                    <BarChart2 size={24} className="text-ocean-500" />
                  </div>
                  <h3 className="font-bold">تقارير متقدمة</h3>
                  <p className="text-sm opacity-80">تتبع أداء حملاتك بدقة</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="bg-ocean-500/20 p-3 rounded-lg mb-3">
                    <Clock size={24} className="text-ocean-500" />
                  </div>
                  <h3 className="font-bold">توفير الوقت</h3>
                  <p className="text-sm opacity-80">أتمتة كاملة للاتصالات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* قسم المميزات */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">مميزات منصة واصل</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              احصل على أفضل أداء لحملاتك الإعلانية من خلال مجموعة متكاملة من المميزات المتقدمة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Phone className="text-ocean-500" />,
                title: "حملات اتصالية آلية",
                description: "إنشاء وتشغيل حملات اتصالية آلية بالكامل مع تخصيص الرسائل الصوتية"
              },
              { 
                icon: <Users className="text-ocean-500" />,
                title: "استهداف دقيق للعملاء",
                description: "تقسيم العملاء إلى مجموعات وتخصيص الرسائل المناسبة لكل فئة"
              },
              { 
                icon: <BarChart2 className="text-ocean-500" />,
                title: "تقارير وتحليلات متقدمة",
                description: "تحليلات مفصلة عن أداء كل حملة ومعدلات التفاعل والتحويل"
              },
              { 
                icon: <Star className="text-ocean-500" />,
                title: "تجربة مستخدم سهلة",
                description: "واجهة سهلة الاستخدام تمكنك من إدارة حملاتك بكل بساطة"
              },
              { 
                icon: <Clock className="text-ocean-500" />,
                title: "جدولة الحملات",
                description: "تحديد مواعيد محددة لتشغيل الحملات في الأوقات المناسبة للعملاء"
              },
              { 
                icon: <Check className="text-ocean-500" />,
                title: "تخصيص كامل",
                description: "تخصيص كل جانب من جوانب الحملة بما يناسب احتياجاتك"
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-ocean-50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الباقات */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">باقات واصل</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اختر الباقة المناسبة لاحتياجاتك وابدأ في تنفيذ حملاتك الإعلانية بكفاءة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* باقة أساسية */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">الباقة الأساسية</h3>
                <div className="text-3xl font-bold mb-1">٤٩٩ جنيه<span className="text-base font-normal text-gray-600">/شهرياً</span></div>
                <p className="text-gray-500 mb-6">مثالية للشركات الصغيرة</p>
                <hr className="mb-6" />
                <ul className="space-y-3 mb-6">
                  {[
                    "٥٠٠ مكالمة شهرياً",
                    "تخصيص بسيط للرسائل",
                    "تقارير أساسية",
                    "دعم فني بالبريد الإلكتروني",
                    "حتى ٣ حملات متزامنة"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check size={18} className="text-green-500 ml-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-brand-800 hover:bg-brand-900">اشترك الآن</Button>
              </div>
            </div>
            
            {/* باقة احترافية */}
            <div className="bg-gradient-to-b from-brand-800 to-brand-900 rounded-lg border-0 shadow-lg transform scale-105 text-white">
              <div className="p-6">
                <div className="bg-ocean-500 text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">الأكثر شعبية</div>
                <h3 className="text-xl font-bold mb-4">الباقة الاحترافية</h3>
                <div className="text-3xl font-bold mb-1">٩٩٩ جنيه<span className="text-base font-normal text-gray-200">/شهرياً</span></div>
                <p className="text-gray-200 mb-6">مثالية للشركات المتوسطة</p>
                <hr className="mb-6 border-gray-600" />
                <ul className="space-y-3 mb-6">
                  {[
                    "١٥٠٠ مكالمة شهرياً",
                    "تخصيص كامل للرسائل",
                    "تقارير مفصلة وتحليلات",
                    "دعم فني على مدار الساعة",
                    "حتى ١٠ حملات متزامنة",
                    "تحويل المكالمات للفريق"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check size={18} className="text-ocean-400 ml-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-ocean-500 hover:bg-ocean-600 text-white">اشترك الآن</Button>
              </div>
            </div>
            
            {/* باقة متقدمة */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">باقة الأعمال</h3>
                <div className="text-3xl font-bold mb-1">١٩٩٩ جنيه<span className="text-base font-normal text-gray-600">/شهرياً</span></div>
                <p className="text-gray-500 mb-6">للشركات الكبيرة</p>
                <hr className="mb-6" />
                <ul className="space-y-3 mb-6">
                  {[
                    "٥٠٠٠ مكالمة شهرياً",
                    "تخصيص متقدم للرسائل",
                    "تحليلات متقدمة وAPI",
                    "مدير حساب مخصص",
                    "حملات غير محدودة",
                    "تكامل مع أنظمة CRM",
                    "تقارير مخصصة"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check size={18} className="text-green-500 ml-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-brand-800 hover:bg-brand-900">اشترك الآن</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الاتصال والتحويل */}
      <section className="py-20 bg-gradient-to-br from-brand-800 to-brand-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">جاهز لتحسين أداء حملاتك الإعلانية؟</h2>
              <p className="text-xl mb-6">
                انضم الآن إلى الآلاف من العملاء الناجحين واستفد من منصة واصل لتحقيق أفضل النتائج
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-ocean-500 hover:bg-ocean-600 text-white">ابدأ الآن</Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">جدولة عرض توضيحي</Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">+٨٥٪</div>
                <p className="text-lg">زيادة في معدل التحويل</p>
                <hr className="my-4 border-white/30" />
                <div className="text-4xl font-bold mb-2">+٥٠٪</div>
                <p className="text-lg">توفير في وقت فريق المبيعات</p>
                <hr className="my-4 border-white/30" />
                <div className="text-4xl font-bold mb-2">+٧٠٪</div>
                <p className="text-lg">تحسين في كفاءة الحملات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* تذييل الصفحة */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">واصل</h3>
              <p className="text-gray-400 mb-4">منصة الحملات الإعلانية الصوتية الأولى في الشرق الأوسط</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">الرئيسية</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-white">المميزات</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">الأسعار</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">تواصل معنا</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">الدعم</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white">مركز المساعدة</Link></li>
                <li><Link to="/docs" className="text-gray-400 hover:text-white">التوثيق</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">الأسئلة الشائعة</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
              <p className="text-gray-400">info@wasel.com</p>
              <p className="text-gray-400">+20 123 456 7890</p>
            </div>
          </div>
          <hr className="my-8 border-gray-700" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 واصل. جميع الحقوق محفوظة.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">شروط الاستخدام</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">سياسة الخصوصية</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
