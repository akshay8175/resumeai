import React from 'react';
import { motion } from 'framer-motion';
import { getScoreInterpretation } from '../utils/scoringHelpers';

const ScoreDashboard = ({ score }) => {
    const { label, color, bg } = getScoreInterpretation(score);

    // Calculate circumference for circle progress
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">ATS Score</h2>

            <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-gray-100 dark:text-gray-700"
                        />
                        {/* Progress Circle */}
                        <motion.circle
                            cx="80"
                            cy="80"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={color}
                            strokeLinecap="round"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className={`text-4xl font-bold ${color}`}
                        >
                            {score}%
                        </motion.span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className={`mt-4 px-4 py-1.5 rounded-full text-sm font-medium ${bg} bg-opacity-10 ${color}`}
                >
                    {label} Match
                </motion.div>
            </div>
        </div>
    );
};

export default ScoreDashboard;
