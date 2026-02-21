import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const KeywordAnalysis = ({ matched, missing, totalKeywords }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Keyword Analysis</h2>

            <div className="space-y-6">
                {/* Matched Keywords */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            Matched ({matched.length})
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {matched.length > 0 ? (
                            matched.map((keyword, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-100 dark:border-green-800"
                                >
                                    {keyword}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-400 italic">No exact matches found yet.</span>
                        )}
                    </div>
                </div>

                {/* Missing Keywords */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            Missing ({missing.length})
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {missing.length > 0 ? (
                            missing.map((keyword, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-100 dark:border-red-800 opacity-70"
                                >
                                    {keyword}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-400 italic">No missing keywords! Perfect match.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordAnalysis;
