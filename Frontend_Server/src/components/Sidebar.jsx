import React, { useEffect, useState } from 'react';
import { Plus, MessageSquare, Settings, LogOut, User, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the genuine database history belonging to the current Auth JWT Session
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.token) return;
      try {
        const response = await fetch('http://localhost:5000/api/ideas', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Mongoose returns array of documents [{_id, title, result, ...}]
          setHistory(data.reverse()); // Show newest first
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, [user]);

  return (
    <div className="hidden md:flex flex-col w-[260px] bg-surface-subtle text-neutral-900 h-full border-r border-surface-border">
      {/* Top Actions */}
      <div className="p-3">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-3 py-2 w-full text-neutral-900 hover:bg-neutral-200/50 rounded-lg transition-colors text-sm font-medium"
        >
          <div className="bg-white border border-surface-border rounded-md p-1 shadow-sm">
            <Plus size={14} className="text-neutral-700" />
          </div>
          New validation
        </Link>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-2 px-3 mt-4">
        <div className="text-xs font-semibold text-neutral-500 mb-2 px-2 tracking-wide uppercase flex items-center justify-between">
          <span>Past Validations</span>
          {isLoading && <Loader2 size={12} className="animate-spin text-neutral-400" />}
        </div>
        <div className="flex flex-col gap-[2px]">
          
          {!isLoading && history.length === 0 && (
            <div className="text-xs text-neutral-400 px-2 italic mt-2">
              No previous analyses found.
            </div>
          )}

          {history.map((idea) => {
            // Forward the exact identical React payload so <Result /> maps cleanly without another Fetch
            const routerState = {
              payload: {
                title: idea.title,
                description: idea.description,
                audience: idea.audience,
                budget: idea.budget
              },
              data: idea.result || {}
            };

            return (
               <Link 
                 key={idea._id} 
                 to={`/result`}
                 state={routerState}
                 className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-200/50 transition-colors text-sm group text-neutral-700"
               >
                 <MessageSquare size={14} className="text-neutral-400 group-hover:text-neutral-600 shrink-0" />
                 <span className="truncate flex-1 font-medium text-neutral-700 group-hover:text-brand">{idea.title}</span>
               </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions & Profile */}
      <div className="p-3 flex flex-col gap-1 mt-auto border-t border-surface-border pt-4">
        {user && (
           <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold font-mono tracking-tighter">
                {user.name ? user.name.slice(0, 2).toUpperCase() : 'AI'}
              </span>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
               <span className="text-sm font-semibold truncate text-brand">{user.name || 'User'}</span>
               <span className="text-[10px] text-neutral-500 truncate">{user.email}</span>
            </div>
          </div>
        )}
        
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-neutral-200/50 transition-colors text-sm text-neutral-700 font-medium">
          <Settings size={16} className="text-neutral-500" />
          Settings
        </button>
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors text-sm text-neutral-700 font-medium"
        >
          <LogOut size={16} className={''} />
          Log out
        </button>
      </div>
    </div>
  );
};
