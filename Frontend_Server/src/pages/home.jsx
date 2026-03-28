import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, Target, Wallet, Type, FileText } from 'lucide-react';

const Home = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audience: '',
    budget: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  const navigate = useNavigate();
  // We use this dummy token simulation since the frontend creates a generic context
  // To use a real backend middleware, the context would be populated with the actual JWT string
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    setIsLoading(true);
    setErrorText('');

    try {
      const response = await fetch('http://localhost:5000/api/ideas/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token || 'mock_jwt_token_for_user'}` // Assume standard Auth injection
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Backend crashed or returned error status.');
      }

      const backendResponse = await response.json();
      
      // Pass the fully structured real backend JSON downstream
      navigate('/result', { state: { 
        payload: formData, 
        data: backendResponse.data 
      } });

    } catch (err) {
      console.error(err);
      setErrorText('Backend server currently unreachable. Did you run the Node.js server first?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-white h-full overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto px-4 py-12 md:py-24">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={24} className="text-neutral-800" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-brand">
            Validate your startup idea
          </h1>
          <p className="text-neutral-500 text-lg max-w-lg mx-auto leading-relaxed">
            Provide the details below to securely transmit to your backend parallel AI orchestrators.
          </p>
        </div>

        {/* Error Fallback */}
        {errorText && (
          <div className="p-4 rounded-xl bg-rose-50 text-rose-700 text-sm font-medium mb-6 text-center shadow-sm">
            {errorText}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Idea Name Input */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Type size={16} className="text-neutral-400" />
              Startup Title
            </label>
            <input
              type="text"
              placeholder="e.g. AI Kirana Store Manager"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-surface-subtle border border-surface-border text-neutral-900 rounded-xl px-4 py-3 outline-none focus:border-neutral-400 focus:bg-white transition-all shadow-sm placeholder-neutral-400 font-medium"
              required
              disabled={isLoading}
            />
          </div>

          {/* Description Input */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <FileText size={16} className="text-neutral-400" />
              Detailed Description
            </label>
            <textarea
              placeholder="What core problem does it solve and how does it work?"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full bg-surface-subtle border border-surface-border text-neutral-900 rounded-xl px-4 py-3 outline-none focus:border-neutral-400 focus:bg-white transition-all shadow-sm placeholder-neutral-400 block resize-y min-h-[120px]"
              required
              disabled={isLoading}
            />
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
               <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                 <Target size={16} className="text-neutral-400" />
                 Target Audience
               </label>
               <input
                 type="text"
                 placeholder="e.g. Tier 2/3 City SMEs"
                 value={formData.audience}
                 onChange={(e) => setFormData({...formData, audience: e.target.value})}
                 className="w-full bg-surface-subtle border border-surface-border text-neutral-900 rounded-xl px-4 py-3 outline-none focus:border-neutral-400 focus:bg-white transition-all shadow-sm placeholder-neutral-400"
                 disabled={isLoading}
               />
            </div>

            <div className="group">
               <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                 <Wallet size={16} className="text-neutral-400" />
                 Initial Budget
               </label>
               <input
                 type="text"
                 placeholder="e.g. ₹5,00,000"
                 value={formData.budget}
                 onChange={(e) => setFormData({...formData, budget: e.target.value})}
                 className="w-full bg-surface-subtle border border-surface-border text-neutral-900 rounded-xl px-4 py-3 outline-none focus:border-neutral-400 focus:bg-white transition-all shadow-sm placeholder-neutral-400"
                 disabled={isLoading}
               />
            </div>
          </div>

          {/* Divider */}
          <hr className="border-surface-border my-8" />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.title || !formData.description || isLoading}
            className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
              (formData.title && formData.description && !isLoading)
                ? 'bg-brand text-white hover:bg-neutral-800 shadow-md translate-y-0'
                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-surface-border'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-neutral-400 border-t-white rounded-full animate-spin"></div>
                Awaiting 6 Backend Agents...
              </>
            ) : (
              <>
                Run AI Validation
                <ArrowRight size={18} />
              </>
            )}
          </button>
          
          <div className="text-center mt-4">
            <span className="text-xs text-neutral-400">Analysis typically takes 10-25 seconds backend parallel execution processing.</span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Home;