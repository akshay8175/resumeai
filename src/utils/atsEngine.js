import { cleanText } from './textProcessor';

// Common stopwords to exclude from keyword analysis
const STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been',
    'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into',
    'over', 'after', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his',
    'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might',
    'must', 'am', 'as', 'if', 'when', 'how', 'why', 'what', 'which', 'who', 'whom', 'where',
    'so', 'than', 'then', 'here', 'there', 'now', 'just', 'more', 'some', 'any', 'no', 'not',
    'only', 'own', 'same', 'so', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now'
]);

/**
 * Extracts unique keywords from text, excluding stopwords
 * @param {string} text - The text to extract keywords from
 * @returns {Set<string>} - Set of unique keywords
 */
export const extractKeywords = (text) => {
    const cleaned = cleanText(text);
    const words = cleaned.split(' ');
    const keywords = new Set();

    words.forEach(word => {
        if (word.length > 2 && !STOPWORDS.has(word) && !/^\d+$/.test(word)) {
            keywords.add(word);
        }
    });

    return keywords;
};

/**
 * Calculates the match score and analyzes keywords
 * @param {string} resumeText - The resume content
 * @param {string} jdText - The job description content
 * @returns {Object} - Analysis results
 */
export const calculateATSScore = (resumeText, jdText) => {
    if (!resumeText || !jdText) return null;

    const resumeKeywords = extractKeywords(resumeText);
    const jdKeywords = extractKeywords(jdText);

    // Convert Sets to Arrays for iteration
    const jdKeywordsArray = Array.from(jdKeywords);

    if (jdKeywordsArray.length === 0) {
        return {
            score: 0,
            matchedKeywords: [],
            missingKeywords: [],
            keywordDensity: 0
        };
    }

    const matchedKeywords = jdKeywordsArray.filter(keyword => resumeKeywords.has(keyword));
    const missingKeywords = jdKeywordsArray.filter(keyword => !resumeKeywords.has(keyword));

    const score = Math.round((matchedKeywords.length / jdKeywordsArray.length) * 100);
    const keywordDensity = Math.round((matchedKeywords.length / resumeText.split(' ').length) * 100);

    return {
        score,
        matchedKeywords,
        missingKeywords,
        totalKeywords: jdKeywordsArray.length,
        keywordDensity
    };
};

/**
 * Checks for specific sections or content types
 * @param {string} text - Resume text
 * @returns {Object} - Detection results
 */
export const detectSections = (text) => {
    const lowerText = text.toLowerCase();
    return {
        hasProjects: lowerText.includes('project'),
        hasExperience: lowerText.includes('experience') || lowerText.includes('employment') || lowerText.includes('work history'),
        hasQuantification: /\d+%|\$\d+|\d+\s*year|\d+\s*month/.test(lowerText)
    };
};
