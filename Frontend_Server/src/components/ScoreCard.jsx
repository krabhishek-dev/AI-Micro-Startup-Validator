import React from 'react';

const ScoreCard = ({ score }) => {
    // Determine the color based purely on grayscale/brand or subtle highlight if required
    return (
        <div className="flex items-center gap-4 bg-surface-subtle border border-surface-border rounded-xl p-4 w-fit shadow-sm">
            <div className={`text-3xl font-bold tracking-tight text-brand`}>
                {score}<span className="text-neutral-400 text-lg font-normal ml-1">/100</span>
            </div>
            <div className="flex flex-col border-l border-surface-border pl-4">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest leading-none mb-1">Viability</span>
                <span className="text-sm font-medium text-brand">Validation Score</span>
            </div>
        </div>
    );
};

export default ScoreCard;
