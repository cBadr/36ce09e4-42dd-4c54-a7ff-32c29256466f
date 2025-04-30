
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 animate-spin text-brand-800 mb-4" />
          <p className="text-lg text-gray-600">جاري تحميل التطبيق...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // إعادة التوجيه إلى صفحة تسجيل الدخول مع حفظ المسار المطلوب
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
