import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/Field';
import { EyeIcon, EyeOffIcon, AlertTriangleIcon } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      // navigation handled by useEffect
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
      setIsSubmitting(false);
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div dir="rtl" className="min-h-screen bg-canvas flex items-center justify-center p-4 font-sans text-ink">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-pop p-8 border border-line">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-orange flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
              <path d="M4 16h9l3-8" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="18.5" r="1.8" fill="#FFFFFF" />
              <circle cx="17" cy="18.5" r="1.8" fill="#FFFFFF" />
              <path d="M16 8h3l2 4v4.5h-2" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-[24px] font-extrabold text-navy">وِدي</h1>
          <p className="text-[14px] text-ink-subtle mt-1">من هنا لهنالك</p>
        </div>

        <div className="mb-6">
          <h2 className="text-[18px] font-bold text-ink mb-1">تسجيل الدخول</h2>
          <p className="text-[13px] text-ink-subtle">الرجاء إدخال بيانات الدخول للوحة التحكم</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-2.5">
            <AlertTriangleIcon className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <p className="text-[13px] text-danger font-medium leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-navy-600 mb-1.5" htmlFor="email">
              البريد الإلكتروني
            </label>
            <TextInput 
              id="email"
              type="email" 
              placeholder="admin@wedi.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              dir="ltr"
              className="text-left"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-navy-600 mb-1.5" htmlFor="password">
              كلمة المرور
            </label>
            <div className="relative">
              <TextInput 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                dir="ltr"
                className="text-left pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-subtle hover:text-ink transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-6 h-12 text-[15px]"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'جاري التحقق...' : 'دخول'}
          </Button>
        </form>

        <div className="mt-8 text-center text-[12px] text-ink-muted">
          <p>بيانات تجريبية:</p>
          <p className="font-mono mt-1" dir="ltr">admin@wedi.com / Admin123!</p>
        </div>
      </div>
    </div>
  );
}
