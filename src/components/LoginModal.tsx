import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (step === 'input') {
      setStep('otp');
    } else {
      const otpValue = otp.join('');
      try {
        await login('otp', otpValue);
        onClose();
      } catch (err: any) {
        setError(err.message || 'Invalid OTP');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="hidden md:block w-1/2 relative bg-gray-100">
              <img
                src="https://picsum.photos/seed/login/800/1000"
                alt="Login"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white">
                <h2 className="text-4xl font-black tracking-tighter mb-2">JOIN THE CULTURE</h2>
                <p className="text-sm font-medium opacity-80">Unlock exclusive drops, early access, and more.</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-black tracking-tighter mb-2">LOGIN OR SIGNUP</h3>
                <p className="text-sm text-gray-500">Unlock coupons, profile and much more</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 'input' ? (
                  <>
                    <div className="flex items-center gap-4 p-1 bg-gray-100 rounded-xl mb-6">
                      <button
                        type="button"
                        onClick={() => setMethod('phone')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                          method === 'phone' ? 'bg-white shadow-sm' : 'text-gray-400'
                        }`}
                      >
                        <Phone size={14} /> PHONE
                      </button>
                      <button
                        type="button"
                        onClick={() => setMethod('email')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                          method === 'email' ? 'bg-white shadow-sm' : 'text-gray-400'
                        }`}
                      >
                        <Mail size={14} /> EMAIL
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-3 border-gray-200">
                        <span className="text-sm font-bold">{method === 'phone' ? '+91' : '@'}</span>
                      </div>
                      <input
                        type={method === 'phone' ? 'tel' : 'email'}
                        placeholder={method === 'phone' ? 'Mobile Number' : 'Email Address'}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full pl-20 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl focus:border-black outline-none transition-colors font-medium"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-600">
                      Enter the 6-digit code sent to <span className="font-bold text-black">{value}</span>
                    </p>
                    <div className="flex gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(i, e)}
                          className="w-full h-12 text-center text-xl font-black bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-black outline-none"
                        />
                      ))}
                    </div>
                    {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</p>}
                    <button
                      type="button"
                      onClick={() => setStep('input')}
                      className="text-xs font-bold text-gray-400 hover:text-black"
                    >
                      RESEND OTP
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'PROCESSING...' : step === 'input' ? 'SEND OTP' : 'VERIFY & LOGIN'}
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-[10px] text-gray-400 font-medium">
                  By continuing, you agree to NoirKult's <br />
                  <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
