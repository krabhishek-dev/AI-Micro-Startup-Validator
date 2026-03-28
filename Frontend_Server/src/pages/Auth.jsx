import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStandardSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText('');

    try {
      const endpoint = isLogin 
        ? 'http://localhost:5000/api/auth/login' 
        : 'http://localhost:5000/api/auth/register';
      
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Authentication failed');
      }

      // If signup was successful, automatically log them in or ask them to login
      if (!isLogin && data.message === "Signup successful") {
        setIsLogin(true);
        setPassword('');
        setErrorText('Account created successfully! Please log in.');
        setIsLoading(false);
        return;
      }

      // On successful login, the Express server returns { token }
      if (data.token) {
        login({ 
          token: data.token,
          email: email, 
          name: name || email.split('@')[0]
        });
        navigate('/');
      }

    } catch (err) {
      console.error(err);
      setErrorText(err.message || 'Server unreachable or error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-subtle flex flex-col items-center justify-center p-4">
      
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
        </div>
        <span className="font-semibold text-xl text-brand tracking-tight">AI Validator</span>
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-sm border border-surface-border p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-sm text-neutral-500">
            {isLogin ? 'Enter your details to sign in' : 'Start validating your ideas today'}
          </p>
        </div>

        {errorText && (
          <div className={`p-4 rounded-xl text-sm font-medium mb-6 text-center shadow-sm ${
            errorText.includes('successfully') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {errorText}
          </div>
        )}

        <form onSubmit={handleStandardSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-subtle border border-surface-border text-brand rounded-xl focus:ring-1 focus:ring-brand focus:border-brand outline-none transition-all text-sm placeholder-neutral-400"
                  placeholder="John Doe"
                  required={!isLogin}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-neutral-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-surface-subtle border border-surface-border text-brand rounded-xl focus:ring-1 focus:ring-brand focus:border-brand outline-none transition-all text-sm placeholder-neutral-400"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-neutral-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-surface-subtle border border-surface-border text-brand rounded-xl focus:ring-1 focus:ring-brand focus:border-brand outline-none transition-all text-sm placeholder-neutral-400"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 bg-brand hover:bg-neutral-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 mt-6 shadow-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-neutral-400 border-t-white rounded-full animate-spin"></div>
            ) : (
               <>
                 {isLogin ? 'Sign in' : 'Create account'}
                 <ArrowRight size={18} />
               </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-neutral-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => { setIsLogin(!isLogin); setErrorText(''); }}
            type="button"
            className="text-brand font-semibold hover:text-neutral-600 transition-colors"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
      
      {/* Footer link simulating true AI product feel */}
      <div className="mt-8 text-xs text-neutral-400 text-center space-y-1">
        <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        <p>Your data is processed strictly locally for validation logic.</p>
      </div>

    </div>
  );
};

export default Auth;
