
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Phone, 
  BarChart2, 
  Users, 
  Settings, 
  FileText, 
  Bell, 
  Package, 
  LogOut 
} from 'lucide-react';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors",
        isActive ? 
          "bg-brand-800 text-white" : 
          "text-gray-700 hover:bg-brand-100 hover:text-brand-800"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

const SidebarSection = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="py-2">
      <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <nav className="space-y-1">
        {children}
      </nav>
    </div>
  );
};

export const DashboardSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white h-full border-l border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link to="/dashboard" className="flex items-center">
          <span className="text-2xl font-bold text-brand-800">واصل</span>
        </Link>
      </div>

      {/* Sidebar content */}
      <div className="flex-grow overflow-y-auto p-3 space-y-8">
        <SidebarSection title="الرئيسية">
          <SidebarItem
            icon={LayoutDashboard}
            label="لوحة التحكم"
            href="/dashboard"
            isActive={isActive('/dashboard')}
          />
        </SidebarSection>
        
        <SidebarSection title="الحملات">
          <SidebarItem
            icon={Phone}
            label="الحملات الإعلانية"
            href="/dashboard/campaigns"
            isActive={isActive('/dashboard/campaigns')}
          />
          <SidebarItem
            icon={FileText}
            label="تقارير الحملات"
            href="/dashboard/campaign-reports"
            isActive={isActive('/dashboard/campaign-reports')}
          />
          <SidebarItem
            icon={Package}
            label="النماذج الصوتية"
            href="/dashboard/voice-templates"
            isActive={isActive('/dashboard/voice-templates')}
          />
        </SidebarSection>
        
        <SidebarSection title="التحليلات">
          <SidebarItem
            icon={BarChart2}
            label="الإحصائيات"
            href="/dashboard/analytics"
            isActive={isActive('/dashboard/analytics')}
          />
          <SidebarItem
            icon={Users}
            label="قوائم العملاء"
            href="/dashboard/customers"
            isActive={isActive('/dashboard/customers')}
          />
        </SidebarSection>
        
        <SidebarSection title="الإعدادات">
          <SidebarItem
            icon={Settings}
            label="إعدادات الحساب"
            href="/dashboard/settings"
            isActive={isActive('/dashboard/settings')}
          />
          <SidebarItem
            icon={Bell}
            label="الإشعارات"
            href="/dashboard/notifications"
            isActive={isActive('/dashboard/notifications')}
          />
        </SidebarSection>
      </div>

      {/* User info */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-bold">
              م
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-gray-900">محمد أحمد</p>
              <p className="text-xs text-gray-500">muhammad@example.com</p>
            </div>
          </div>
          <Link to="/logout" className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
