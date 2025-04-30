
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon } from 'lucide-react';
import { signIn } from '@/integrations/supabase/helper';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      if (result) {
        // تم تسجيل الدخول بنجاح، انتقل إلى لوحة التحكم
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-800">واصل</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">تسجيل الدخول إلى حسابك</h2>
          <p className="mt-2 text-sm text-gray-600">
            أو{' '}
            <Link to="/register" className="font-medium text-ocean-500 hover:text-ocean-600">
              قم بإنشاء حساب جديد
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pr-10 placeholder-gray-400 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  كلمة المرور
                </Label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-ocean-500 hover:text-ocean-600">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
              </div>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pr-10 placeholder-gray-400 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-ocean-500 focus:ring-ocean-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                تذكرني
              </label>
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              className="w-full bg-brand-800 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              disabled={loading}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">أو الدخول عبر</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43 1.74-3.41 2.65-5.5 2.65-1.97 0-3.95-.89-5.48-2.65C4.53 14.05 4 11.84 4 9.5 4 6.36 7.04 2 12 2s8 4.36 8 7.5c0 2.34-.53 4.55-1.64 7.33z" />
                </svg>
                Google
              </button>
            </div>
            <div>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.992 3.657 9.129 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.992 22 12z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
