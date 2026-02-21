import { useState, useCallback } from 'react';
import { extractTextFromPDF } from '../utils/textProcessor';
import { calculateATSScore, detectSections } from '../utils/atsEngine';
import { generateSuggestions } from '../utils/scoringHelpers';

export const useATSAnalyzer = () => {
    const [resumeText, setResumeText] = useState('');
    const [jdText, setJdText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = useCallback(async (file) => {
        try {
            if (file.type !== 'application/pdf') {
                alert('Please upload a PDF file');
                return;
            }
            setFileName(file.name);
            setIsAnalyzing(true);
            const text = await extractTextFromPDF(file);
            setResumeText(text);
            setIsAnalyzing(false);
        } catch (error) {
            console.error(error);
            setIsAnalyzing(false);
            alert('Failed to read PDF');
        }
    }, []);

    const analyze = useCallback(() => {
        if (!resumeText || !jdText) {
            alert('Please provide both resume and job description');
            return;
        }

        setIsAnalyzing(true);

        // Simulate a slight delay for "processing" feel
        setTimeout(() => {
            const scoreData = calculateATSScore(resumeText, jdText);
            const sectionData = detectSections(resumeText);
            const suggestions = generateSuggestions(scoreData, sectionData);

            setResults({
                ...scoreData,
                suggestions,
                ...sectionData
            });
            setIsAnalyzing(false);
        }, 1500);
    }, [resumeText, jdText]);

    const reset = useCallback(() => {
        setResumeText('');
        setJdText('');
        setResults(null);
        setFileName('');
    }, []);

    return {
        resumeText,
        jdText,
        setJdText,
        isAnalyzing,
        results,
        fileName,
        handleFileUpload,
        analyze,
        reset
    };
};
