'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, LifeBuoy } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-xl border border-zinc-100 dark:border-zinc-800">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 transform rotate-3">
             <LifeBuoy className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-black dark:text-white tracking-tight">Admin Portal</h1>
          <p className="text-zinc-500 mt-2">Enter credentials to access the dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Username" 
              defaultValue="admin"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
          <button 
            type="submit" 
            className="w-full py-4 bg-black dark:bg-white dark:text-black text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
