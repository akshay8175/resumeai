import React, { useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeUpload = ({ onFileUpload, fileName, onClear }) => {
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Resume (PDF)
            </label>

            {!fileName ? (
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors bg-white dark:bg-gray-800"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                            <Upload className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Click to upload or drag & drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF only (max 5MB)
                            </p>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                            <FileText className="w-6 h-6 text-green-500 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[200px]">
                                {fileName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Ready for analysis
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClear}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default ResumeUpload;
