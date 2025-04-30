
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-800 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">الصفحة غير موجودة</p>
        <p className="text-gray-500 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/">العودة إلى الرئيسية</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">اتصل بنا</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
