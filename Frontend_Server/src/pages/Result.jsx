import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Sparkles, Share, ThumbsUp, ThumbsDown, Copy, Activity, TrendingUp, Users, ShieldAlert, Lightbulb } from 'lucide-react';
import AnalysisCard from '../components/AnalysisCard';
import SWOTCard from '../components/SWOTCard';
import ScoreCard from '../components/ScoreCard';

const Result = () => {
  const location = useLocation();
  const state = location.state || {}; // { payload: {title, description, ...}, data: { general, market, competition, ... } }
  
  // Hard redirect back to form if they jump to /result via URL
  if (!state.data) {
    return <Navigate to="/" replace />;
  }

  const payload = state.payload;
  const metrics = state.data;
  
  const promptText = payload?.title 
    ? `**${payload.title}**\n\n${payload.description}\n\nTarget Audience: ${payload.audience}\nBudget: ${payload.budget}`
    : "Validation parameters missing.";

  // Synthesize dynamically extracted fields with completely robust fail-safes incase backend crashes out empty payloads
  const getVerdict = () => {
    const rawScore = metrics?.finalScore || 0;
    if (rawScore > 80) return 'go';
    if (rawScore > 50) return 'pivot';
    return 'no-go';
  };
  const verdict = getVerdict();

  const getVerdictColor = (v) => {
    switch (v) {
      case 'go': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pivot': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'no-go': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const threatBadgeRender = (level) => {
    switch ((level || '').toLowerCase()) {
      case 'high': return <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] rounded-full uppercase tracking-widest font-bold">High</span>;
      case 'medium': return <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded-full uppercase tracking-widest font-bold">Medium</span>;
      default: return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-full uppercase tracking-widest font-bold">Low</span>;
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 overflow-y-auto scrollbar-hide bg-white">
      
      {/* Dynamic Data Notification */}
      <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-xl p-4 text-sm font-medium mb-6 animate-pulse">
        Rendering raw outputs natively from your parallel backend AI logic blocks. 
        Missing fields indicate empty backend AI Service files. 
      </div>

      {/* User Input Prompt */}
      <div className="flex justify-end mb-8 mt-4">
        <div className="bg-surface-subtle text-brand px-5 py-4 rounded-2xl max-w-[85%] text-sm md:text-base whitespace-pre-wrap leading-relaxed shadow-sm">
          {promptText}
        </div>
      </div>

      {/* Modular Backend AI Response Render */}
      <div className="flex gap-4 mb-20">
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0 mt-1 shadow-sm">
          <Sparkles size={16} className="text-white" />
        </div>
        
        <div className="flex-1 w-full text-brand">
          
          {/* Header Block: Verdict & Final Score */}
          <div className="mb-8 space-y-4">
            <h2 className="text-xl font-semibold">Validation Report</h2>
            
            <div className="flex flex-wrap items-center gap-4">
              <ScoreCard score={metrics?.finalScore || "N/A"} />
              
              <div className={`px-4 py-3 rounded-xl border flex-1 md:max-w-xs flex flex-col justify-center ${getVerdictColor(verdict)}`}>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-0.5">Calculated Verdict</span>
                <span className="text-2xl font-black uppercase tracking-tight">{verdict}</span>
              </div>
            </div>

            {/* Parse from aiGeneral.js output */}
            <p className="text-base text-neutral-700 leading-relaxed mt-4 p-4 bg-surface-subtle rounded-xl border border-surface-border min-h-[60px]">
              <strong>AI Summary (General): </strong>
              {metrics?.general?.summary || "No summary exported from generalAI()."}
            </p>
          </div>

          <hr className="my-8 border-surface-border" />

          {/* Modular Deep Dive Extracted from 6 APIs */}
          <div className="space-y-6">
            
            {/* Fail-safe extracting arrays from varying JSON structures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalysisCard title="Competitors (aiCompetition.js)" icon={Users} content={
                ((metrics?.competition?.list || []).length > 0) ? (
                  <ul className="space-y-2.5 list-none m-0 p-0 text-sm">
                    {metrics.competition.list.map((comp, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-white border border-surface-border px-3 py-2 rounded-lg">
                        <span className="font-medium text-neutral-700">{comp.name || JSON.stringify(comp)}</span>
                        {threatBadgeRender(comp.threat_level)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm italic text-neutral-400">Data missing from backend `competition` object.</p>
                )
              }/>

              <AnalysisCard title="Monetization (aiMonetization.js)" icon={TrendingUp} content={
                 ((metrics?.monetization?.models || []).length > 0) ? (
                  <ul className="space-y-2 list-none m-0 p-0 text-sm">
                    {metrics.monetization.models.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-neutral-600">
                        <span className="text-brand font-medium mt-0.5">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                 ) : (
                  <p className="text-sm italic text-neutral-400">Data missing from backend `monetization` object.</p>
                 )
              }/>
            </div>

            {/* Execution Risks */}
            <AnalysisCard title="Execution Risks (aiRisk.js)" icon={ShieldAlert} content={
               ((metrics?.risk?.items || []).length > 0) ? (
               <div className="space-y-3 mt-1 text-sm">
                 {metrics.risk.items.map((riskItem, idx) => (
                   <div key={idx} className="border-l-2 border-brand pl-3">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-neutral-900">{riskItem.risk}</span>
                        {threatBadgeRender(riskItem.severity)}
                     </div>
                     <p className="text-neutral-500 italic leading-relaxed">Mitigation: {riskItem.mitigation}</p>
                   </div>
                 ))}
               </div>
               ) : (
                 <p className="text-sm italic text-neutral-400">Data missing from backend `risk` object.</p>
               )
            }/>

            {/* SWOT Matrix embedded cleanly */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4 ml-1">SWOT Analysis (aiSWOT.js)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SWOTCard section="Strengths" items={metrics?.swot?.strengths || metrics?.general?.strengths || []} />
                <SWOTCard section="Weaknesses" items={metrics?.swot?.weaknesses || []} />
                <SWOTCard section="Opportunities" items={metrics?.swot?.opportunities || []} />
                <SWOTCard section="Threats" items={metrics?.swot?.threats || []} />
              </div>
            </div>
          </div>
          
          {/* Action Bar */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-surface-border text-neutral-400">
            <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"><Copy size={16} /></button>
            <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"><ThumbsUp size={16} /></button>
            <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"><ThumbsDown size={16} /></button>
            <div className="flex-1" />
            <Link to="/" className="px-3 py-1.5 text-xs font-medium border border-surface-border rounded-lg hover:bg-neutral-50 text-neutral-700 flex items-center gap-1.5">
              <Share size={14} />
              Validate New
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Result;