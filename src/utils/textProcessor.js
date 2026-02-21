import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extracts text from a PDF file
 * @param {File} file - The PDF file object
 * @returns {Promise<string>} - Extracted text content
 */
export const extractTextFromPDF = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(' ');
            fullText += pageText + ' ';
        }

        return fullText.trim();
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF');
    }
};

/**
 * Cleans and normalizes text for analysis
 * @param {string} text - Raw text
 * @returns {string} - Cleaned text
 */
export const cleanText = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Remove special chars
        .replace(/\s+/g, ' ')     // Remove extra whitespace
        .trim();
};
