import React from 'react';

const Card = ({ title, description, imageUrl, onClick, children, className = '' }) => {
    return (
        <div className={`bg-white border border-surface-border rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:border-neutral-300 ${className}`}>
            {imageUrl && (
                <div className="w-full bg-surface-subtle border-b border-surface-border p-4 flex justify-center items-center">
                    <img src={imageUrl} alt={title} className="max-h-32 object-contain" />
                </div>
            )}
            <div className="p-5 flex flex-col h-full">
                {title && <h2 className="text-base font-semibold text-brand mb-2">{title}</h2>}
                {description && <p className="text-sm text-neutral-600 leading-relaxed max-w-none">{description}</p>}
                
                {/* Allow rendering custom structured content inside the card */}
                {children && <div className="mt-3 flex-1">{children}</div>}

                {onClick && (
                    <div className="mt-4 pt-3 border-t border-surface-border">
                        <button 
                            className="text-sm font-medium text-brand hover:text-neutral-500 transition-colors flex items-center gap-1"
                            onClick={onClick}
                        >
                            Learn More →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;