#!/usr/bin/env node
/**
 * Hyperlink Converter CLI
 * 
 * Command-line tool to convert hyperlinks in files from:
 * \u0013HYPERLINK url ... \u0014filename\u0015
 * 
 * to:
 * 文件：filename，链接： url
 */

const fs = require('fs');
const path = require('path');
const { processFile } = require('./hyperlink_converter_module');

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

// Process the file
console.log(`Processing file: ${inputFile}`);
console.log(`Output will be saved to: ${outputFile}`);

try {
  const convertedCount = processFile(inputFile, outputFile);
  console.log(`Conversion complete! ${convertedCount} hyperlinks converted.`);
  console.log(`Output saved to ${outputFile}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
} 