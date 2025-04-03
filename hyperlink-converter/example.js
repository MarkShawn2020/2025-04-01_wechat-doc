/**
 * Example: Converting hyperlinks in a document
 * 
 * This example shows how to use the hyperlink converter to process a document.
 */

const fs = require('fs');
const path = require('path');
const { processFile } = require('./hyperlink_converter_module'); // Using the modularized version

// Example document with hyperlinks
const exampleContent = `# 示例文档

## 视频资源

课程中讲解（含全流程讲解）：

\\u0013HYPERLINK https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs docLink \\\\tdfe 1004 \\\\tdfu https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs \\\\l  \\\\tdft Wedrive \\\\tdfid i.1970324940094615.1688854619387336_f.742099757wvVK \\\\tdfn 01.mp4 \\\\tdlt preview \\\\tdlf FromUploadFile \\\\tdtf 0 \\\\tdh 4505.625 \\\\tdw 8010 \\u001401.mp4\\u0015

\\u0013HYPERLINK https://drive.weixin.qq.com/s?k=AJcAfAclAAYFpqpQj5AcgAdQaqABs docLink \\\\tdfe 1004 \\\\tdfu https://drive.weixin.qq.com/s?k=AJcAfAclAAYFpqpQj5AcgAdQaqABs \\\\l  \\\\tdft Wedrive \\\\tdfid i.1970324940094615.1688854619387336_f.742100034oCeX \\\\tdfn 02.mp4 \\\\tdlt preview \\\\tdlf FromUploadFile \\\\tdtf 0 \\\\tdh 4530 \\\\tdw 8053.333333333334 \\u001402.mp4\\u0015

## 其他资料

请参考以下文档：

\\u0013HYPERLINK https://drive.weixin.qq.com/s?k=AJcAfAclAAY3kHneR3AcgAdQaqABs docLink \\\\tdfe 1004 \\\\tdfu https://drive.weixin.qq.com/s?k=AJcAfAclAAY3kHneR3AcgAdQaqABs \\\\l  \\\\tdft Doc \\\\tdfid i.1970324940094615.1688854619387336_f.742282765TpbU \\\\tdfn meeting_01.mp4 \\\\tdlt preview \\\\tdlf FromUploadFile \\\\tdtf 0 \\\\tdh 4539.375 \\\\tdw 8070 \\u0014meeting_01.mp4\\u0015
`;

// Create example files
const inputFile = path.join(__dirname, 'example_input.md');
const outputFile = path.join(__dirname, 'example_output.md');

// Write the example content to input file
fs.writeFileSync(inputFile, exampleContent, 'utf8');
console.log(`Created example input file: ${inputFile}`);

// Process the file using the module
try {
  const convertedCount = processFile(inputFile, outputFile);
  console.log(`Example completed successfully! ${convertedCount} hyperlinks converted.`);
  console.log(`Check the output file: ${outputFile}`);
} catch (error) {
  console.error(`Error in example: ${error.message}`);
} 