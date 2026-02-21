import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, color = "bg-blue-500" }) => {
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <motion.div
                className={`h-2.5 rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
        </div>
    );
};

export default ProgressBar;
