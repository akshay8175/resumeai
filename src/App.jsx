import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, RefreshCw, Upload } from 'lucide-react';
import { useATSAnalyzer } from './hooks/useATSAnalyzer';
import DarkModeToggle from './components/DarkModeToggle';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ScoreDashboard from './components/ScoreDashboard';
import KeywordAnalysis from './components/KeywordAnalysis';
import SuggestionsPanel from './components/SuggestionsPanel';

function App() {
    const {
        resumeText,
        jdText,
        setJdText,
        isAnalyzing,
        results,
        fileName,
        handleFileUpload,
        analyze,
        reset
    } = useATSAnalyzer();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500 rounded-lg">
                            <FileSearch className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            ATS Resume Checker Pro
                        </h1>
                    </div>
                    <DarkModeToggle />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Input Section */}
                <section className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs">1</span>
                                Upload Resume
                            </h2>
                            <ResumeUpload
                                onFileUpload={handleFileUpload}
                                fileName={fileName}
                                onClear={reset}
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs">2</span>
                                Target Job Description
                            </h2>
                            <JobDescriptionInput value={jdText} onChange={setJdText} />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={analyze}
                            disabled={isAnalyzing || !resumeText || !jdText}
                            className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2
                ${isAnalyzing || !resumeText || !jdText
                                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/20'}`}
                        >
                            {isAnalyzing ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <FileSearch className="w-5 h-5" />
                                    Analyze Resume
                                </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        <AnimatePresence mode='wait'>
                            {results ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <ScoreDashboard score={results.score} />
                                    <KeywordAnalysis
                                        matched={results.matchedKeywords}
                                        missing={results.missingKeywords}
                                        totalKeywords={results.totalKeywords}
                                    />
                                    <SuggestionsPanel
                                        suggestions={results.suggestions}
                                    />

                                    <div className="flex gap-4">
                                        <button
                                            onClick={reset}
                                            className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                                        >
                                            Start Over
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl"
                                >
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-4">
                                        <Upload className="w-8 h-8 opacity-50" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                                        Ready to Analyze
                                    </h3>
                                    <p className="max-w-xs mx-auto text-sm">
                                        Upload your resume and paste the job description to get a detailed ATS analysis and score.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
