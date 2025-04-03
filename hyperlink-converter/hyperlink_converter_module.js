/**
 * Hyperlink Converter Module
 * 
 * This module provides functions for converting hyperlinks in the format:
 * \u0013HYPERLINK url ... \u0014filename\u0015
 * 
 * to the format:
 * 文件：filename，链接： url
 */

const fs = require('fs');
const path = require('path');

/**
 * Process a file to convert special hyperlinks to a cleaner format
 * @param {string} filePath - Path to the input file
 * @param {string} outputPath - Path to the output file
 * @returns {number} - Number of hyperlinks converted
 */
function processFile(filePath, outputPath) {
  try {
    // Read the input file
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Process the content
    const { convertedText, count } = convertHyperlinks(data);
    
    // Write to output file
    fs.writeFileSync(outputPath, convertedText, 'utf8');
    
    return count;
  } catch (error) {
    throw new Error(`Error processing file: ${error.message}`);
  }
}

/**
 * Convert hyperlinks in text content
 * @param {string} content - Text content with special hyperlinks
 * @returns {Object} - Object containing converted text and count of conversions
 */
function convertHyperlinks(content) {
  // Regex to match the specific hyperlink pattern in the document
  const hyperlinkRegex = /\\u0013HYPERLINK (https:\/\/[^\s]+) .*?\\u0014(.*?)\\u0015/g;
  
  // Count matches
  let count = 0;
  const convertedText = content.replace(hyperlinkRegex, (match, url, filename) => {
    count++;
    return `文件：${filename}，链接： ${url}`;
  });
  
  return { convertedText, count };
}

/**
 * Convert a single hyperlink
 * @param {string} hyperlink - Special format hyperlink
 * @returns {string} - Converted format or original string if not a match
 */
function convertSingleHyperlink(hyperlink) {
  const regex = /\\u0013HYPERLINK (https:\/\/[^\s]+) .*?\\u0014(.*?)\\u0015/;
  const match = hyperlink.match(regex);
  
  if (match) {
    const [_, url, filename] = match;
    return `文件：${filename}，链接： ${url}`;
  }
  
  return hyperlink; // Return original if not a match
}

module.exports = {
  processFile,
  convertHyperlinks,
  convertSingleHyperlink
}; 