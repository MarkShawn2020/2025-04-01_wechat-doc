const fs = require('fs');

// Read the input file
const inputFile = 'embed_urls_20250401_203434.txt';
const outputFile = 'markdown_images.md';

try {
  // Read the content of the file
  const data = fs.readFileSync(inputFile, 'utf8');
  
  // Split the content by lines
  const lines = data.split('\n');
  
  // Process each line to convert to markdown format
  const markdownLines = lines
    .filter(line => line.trim().length > 0) // Filter out empty lines
    .map(line => {
      // Extract the URL and the number
      const match = line.match(/^(\d+)\.\s+(https:\/\/[^\s]+)$/);
      if (match) {
        const [, number, url] = match;
        // Extract image ID from URL to use as alt text
        const idMatch = url.match(/_([\w-]+)_/);
        const imageId = idMatch ? idMatch[1] : `image-${number}`;
        
        // Create markdown format: ![alt text](url)
        return `![Image ${number} - ${imageId}](${url})`;
      }
      return line; // Return original line if no match
    });
  
  // Join the lines and write to output file
  fs.writeFileSync(outputFile, markdownLines.join('\n\n'), 'utf8');
  
  console.log(`Conversion completed! Check ${outputFile} for results.`);
} catch (err) {
  console.error('Error:', err);
} 