import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FreshMartLogo } from './FreshMartLogo';
import { 
  X, 
  Phone, 
  User, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, isAuthModalOpen, authModalMode, closeAuthModal } = useCart();
  
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode || initialMode);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen && !isOpen) return null;

  const handleClose = () => {
    if (typeof closeAuthModal === 'function') {
      closeAuthModal();
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(phone, name || (phone.includes('98765') ? 'Rahul Sharma' : 'Valued Customer'), email);
      setIsSubmitting(false);
      handleClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-neutral-100 relative my-auto p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <FreshMartLogo variant="vertical" size="lg" className="mx-auto" />
          <h2 className="text-xl font-black text-neutral-900 font-display">
            {mode === 'login' ? 'Welcome Back to Freshmart' : 'Create your Freshmart Account'}
          </h2>
          <p className="text-xs text-neutral-500">
            Mumbai's favorite 21-minute grocery delivery app
          </p>
        </div>

        {/* Step 1: Phone / Info Input */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-[11px] font-bold text-neutral-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 focus:border-emerald-600 text-xs font-semibold text-neutral-900 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-neutral-700 block mb-1">Mobile Phone Number</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full h-11 pl-12 pr-3 rounded-xl border border-neutral-200 focus:border-emerald-600 text-xs font-bold text-neutral-900 focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-neutral-400 mt-1">
                We will send a 4-digit verification code to this mobile number.
              </p>
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-[11px] font-bold text-neutral-700 block mb-1">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 focus:border-emerald-600 text-xs font-semibold text-neutral-900 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={phone.length < 10 || isSubmitting}
              className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>Continue with OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              {mode === 'login' ? (
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-xs text-emerald-800 font-bold hover:underline"
                >
                  New to FreshMart? Create an account
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-emerald-800 font-bold hover:underline"
                >
                  Already have an account? Sign In
                </button>
              )}
            </div>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-500">OTP sent to: <strong>+91 {phone}</strong></span>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-emerald-700 font-bold hover:underline"
              >
                Change
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-2 text-center">
                Enter 4-Digit Verification Code
              </label>
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => {
                      const val = e.target.value;
                      const nextOtp = [...otp];
                      nextOtp[idx] = val;
                      setOtp(nextOtp);
                      if (val && idx < 3) {
                        document.getElementById(`otp-input-${idx + 1}`)?.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-lg font-black rounded-xl border-2 border-neutral-200 focus:border-emerald-600 focus:bg-emerald-50/20 focus:outline-none"
                  />
                ))}
              </div>
              <p className="text-[11px] text-center text-neutral-400 mt-2">
                Demo Code: Any 4 digits (e.g. 1 2 3 4)
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <span>Verifying Secure Code...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify & Proceed</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security badge */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-center gap-2 text-[10px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted Data Privacy & Protection</span>
        </div>
      </div>
    </div>
  );
};
