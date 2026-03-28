import React from 'react';
import Card from './card';

const SWOTCard = ({ section, items }) => {
    const getColorTheme = (type) => {
        switch(type) {
            case 'Strengths': return 'text-brand';
            case 'Weaknesses': return 'text-neutral-500';
            case 'Opportunities': return 'text-brand';
            case 'Threats': return 'text-neutral-500';
            default: return 'text-brand';
        }
    };

    return (
        <Card>
            <h4 className={`text-sm font-semibold mb-3 uppercase tracking-wider ${getColorTheme(section)}`}>
                {section}
            </h4>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-neutral-600 border-l-2 border-surface-border pl-3 ml-1">
                        {item}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default SWOTCard;
