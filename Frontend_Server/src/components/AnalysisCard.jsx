import React from 'react';
import Card from './card';

const AnalysisCard = ({ title, content, icon: Icon }) => {
    return (
        <Card>
            <div className="flex items-start gap-4">
                {Icon && (
                    <div className="p-2 bg-surface-subtle border border-surface-border rounded-lg shrink-0 mt-0.5">
                        <Icon size={18} className="text-neutral-700" />
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-brand mb-1.5 uppercase tracking-wide">{title}</h3>
                    <div className="text-sm text-neutral-600 leading-relaxed">
                        {typeof content === 'string' ? (
                            <p>{content}</p>
                        ) : (
                            content
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AnalysisCard;
