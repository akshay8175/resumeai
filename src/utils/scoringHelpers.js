/**
 * Generates suggestions based on analysis results
 * @param {Object} analysis - The analysis result object
 * @param {Object} sectionAnalysis - The section detection result object
 * @returns {Array<string>} - List of suggestions
 */
export const generateSuggestions = (analysis, sectionAnalysis) => {
    const suggestions = [];

    if (analysis.score < 50) {
        suggestions.push("Your resume matches less than 50% of the key terms. Consider adding more skills from the 'Missing Keywords' list.");
    } else if (analysis.score < 70) {
        suggestions.push("Good start! Try to incorporate a few more high-priority keywords to boost your relevance.");
    }

    if (!sectionAnalysis.hasQuantification) {
        suggestions.push("We didn't find many numbers (%, $, years). Recruiters love quantified achievements!");
    }

    if (!sectionAnalysis.hasProjects) {
        suggestions.push("No 'Projects' section detected. Adding relevant projects can showcase your practical skills.");
    }

    if (!sectionAnalysis.hasExperience) {
        suggestions.push("No 'Experience' section detected. Ensure you have a clearly labeled work history section.");
    }

    if (analysis.matchedKeywords.length > 0 && analysis.keywordDensity < 2) {
        suggestions.push("Your keyword density is low. You might be mentioning skills, but not frequently enough in context.");
    }

    if (suggestions.length === 0) {
        suggestions.push("Excellent work! Your resume is well-optimized for this job description.");
    }

    return suggestions;
};

/**
 * Returns a label and color for a given score
 * @param {number} score - 0 to 100
 * @returns {Object} - Label and color class
 */
export const getScoreInterpretation = (score) => {
    if (score >= 86) return { label: 'Excellent', color: 'text-green-500', bg: 'bg-green-500' };
    if (score >= 71) return { label: 'Strong', color: 'text-blue-500', bg: 'bg-blue-500' };
    if (score >= 41) return { label: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { label: 'Poor', color: 'text-red-500', bg: 'bg-red-500' };
};
