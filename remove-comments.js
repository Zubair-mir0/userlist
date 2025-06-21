const fs = require('fs');
const path = require('path');
const extensions = ['.ts', '.tsx', '.js', '.jsx'];
const excludeDirs = ['node_modules', '.next'];
function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!extensions.includes(ext)) return;
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    // Remove single-line comments
    content = content.replace(/\/\/.*(?=[\r\n]|$)/g, '');
    // Remove multi-line comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove empty lines
    content = content.replace(/^\s*[\r\n]/gm, '');
    fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
    console.log(`Processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}
function processDirectory(directory) {
  try {
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (!excludeDirs.includes(item)) {
          processDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error.message);
  }
}
const startDir = process.cwd();
console.log('Removing comments from files in:', startDir);
processDirectory(startDir);
console.log('Comment removal complete!');
