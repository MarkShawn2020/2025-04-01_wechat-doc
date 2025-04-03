/**
 * Hyperlink Converter
 * 
 * This script converts hyperlinks in the format:
 * \u0013HYPERLINK url ... \u0014filename\u0015
 * 
 * to the format:
 * 文件：filename，链接： url
 */

const fs = require('fs');
const path = require('path');

// Check if file path is provided
if (process.argv.length < 3) {
  console.log('Usage: node hyperlink_converter.js <input_file> [output_file]');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv.length >= 4 ? process.argv[3] : 
  path.join(path.dirname(inputFile), path.basename(inputFile, path.extname(inputFile)) + '.converted' + path.extname(inputFile));

// Validate file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file '${inputFile}' does not exist.`);
  process.exit(1);
}

// Function to process the file
function processFile(filePath, outputPath) {
  console.log(`Processing file: ${filePath}`);
  console.log(`Output will be saved to: ${outputPath}`);
  
  try {
    // Read the input file
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match the specific hyperlink pattern in the document
    // This pattern is more flexible to handle different variations
    const hyperlinkRegex = /\\u0013HYPERLINK (https:\/\/[^\s]+) .*?\\u0014(.*?)\\u0015/g;
    
    // Count matches
    let matchCount = 0;
    const convertedText = data.replace(hyperlinkRegex, (match, url, filename) => {
      matchCount++;
      return `文件：${filename}，链接： ${url}`;
    });
    
    // Write to output file
    fs.writeFileSync(outputPath, convertedText, 'utf8');
    
    console.log(`Conversion complete! ${matchCount} hyperlinks converted.`);
    console.log(`Output saved to ${outputPath}`);
    return matchCount;
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    process.exit(1);
  }
}

// Process the file
processFile(inputFile, outputFile); 