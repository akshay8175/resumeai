import React from 'react';
import { Lightbulb, AlertTriangle, Briefcase, GraduationCap } from 'lucide-react';

const SuggestionsPanel = ({ suggestions, warning = false }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Improvement Suggestions
            </h2>

            <div className="space-y-4">
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                        >
                            <div className="mt-1 min-w-[20px]">
                                {suggestion.includes('Experience') ? (
                                    <Briefcase className="w-5 h-5 text-blue-500" />
                                ) : suggestion.includes('match') ? (
                                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                                ) : (
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-400" />
                                )}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {suggestion}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <p>No major suggestions found. Your resume looks great!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuggestionsPanel;
