'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavDropdown from '@/components/NavDropdown';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        router.push('/login');
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavDropdown />

      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Text Section (60%) */}
        <div className="w-full md:w-[60%] bg-gradient-to-br from-white to-white text-black flex flex-col justify-center px-10 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Forgot Your Password
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Forgot your password? No worries! Enter your registered email, and we’ll send you a secure reset link to help you regain access to your account.
          </p>

          <div className="space-y-4">
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Quick and Secure Reset
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> No loss of data or progress
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Continue your Tamil learning
              journey
            </p>
          </div>
        </div>

        {/* Right Form Section (40%) */}
        <div className="w-full md:w-[40%] flex flex-col justify-center px-8 py-12 bg-white">
          <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto space-y-6">
            <div className="font-bold text-neutral-800 flex flex-col space-y-2">
              <h3 className="text-black font-bold text-3xl">FORGOT PASSWORD</h3>
              <p className="text-md text-neutral-400">
                Enter your email to reset your password
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <input
                type="email"
                name="email"
                placeholder="User Name (abc@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-3 mt-1 border rounded-lg border-gray-400 focus:outline-none focus:bg-gray-50 text-md placeholder-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-semibold text-lg text-white bg-primary hover:bg-transparent border border-primary rounded-md hover:text-primary transition"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center text-md font-medium text-neutral-800">
              <Link href="/login" className="text-[#1565C0] hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}