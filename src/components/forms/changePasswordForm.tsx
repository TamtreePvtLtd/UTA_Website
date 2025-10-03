'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ChangePasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const t = searchParams.get('token');
    if (t) setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error('Missing token');

    // Check passwords match before sending request
    if (password !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">Loading token...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Text Section (60%) */}
        <div className="w-full md:w-[60%] bg-gradient-to-br from-white to-white text-black flex flex-col justify-center px-10 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Reset Your Password
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Enter your new password below to regain secure access to your
            account and continue your Tamil learning journey.
          </p>

          <div className="space-y-4">
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Safe & Secure Reset
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Protect your account instantly
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Continue learning without
              interruptions
            </p>
          </div>
        </div>

        {/* Right Form Section (40%) */}
        <div className="w-full md:w-[40%] flex flex-col justify-center px-8 py-12 bg-white">
          <form onSubmit={handleSubmit} className="w-full space-y-6 max-w-md">
            <div className="font-bold text-neutral-800 flex flex-col space-y-2">    
              <h3 className="text-black font-bold text-3xl">RESET PASSWORD</h3>
              <p className="text-md text-neutral-400">Enter your new password below</p>
            </div>

            {/* New Password */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-3 mt-1 border rounded-lg border-gray-400 focus:outline-none focus:bg-gray-50 text-md"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-3 py-3 mt-1 border rounded-lg border-gray-400 focus:outline-none focus:bg-gray-50 text-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-semibold text-lg text-white bg-primary hover:bg-transparent border border-primary rounded-md hover:text-primary transition"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
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