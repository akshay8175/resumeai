import React, { useRef } from 'react';
import { FileText, ClipboardList } from 'lucide-react';

const JobDescriptionInput = ({ value, onChange }) => {
    const textareaRef = useRef(null);

    const handleSampleJD = () => {
        const sample = `Software Engineer

Requirements:
- 3+ years of experience with React and Node.js
- Proficiency in JavaScript (ES6+), HTML, CSS
- Experience with state management (Redux, Context API)
- Knowledge of RESTful APIs and GraphQL
- Familiarity with version control (Git)
- Strong problem-solving skills and attention to detail
- Ability to work in an Agile environment
- Bachelor's degree in Computer Science or related field

Preferred:
- Experience with TypeScript
- Knowledge of cloud platforms (AWS, Azure)
- Understanding of CI/CD pipelines`;

        // Simulate typing effect for fun
        let i = 0;
        const typeWriter = () => {
            if (i < sample.length) {
                const nextChar = sample.charAt(i);
                // Updating state directly with function form to ensure we don't lose characters
                onChange(prev => prev + nextChar);
                i++;
                setTimeout(typeWriter, 5);
            }
        };

        // Clear first then type
        onChange('');
        setTimeout(typeWriter, 10);
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Job Description
                </label>
                <button
                    onClick={handleSampleJD}
                    className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                    <ClipboardList size={14} />
                    Use Sample JD
                </button>
            </div>
            <div className="relative">
                <div className="absolute top-3 left-3 text-gray-400">
                    <FileText size={20} />
                </div>
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-64 pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm leading-relaxed text-gray-700 dark:text-gray-200"
                />
            </div>
        </div>
    );
};

export default JobDescriptionInput;
