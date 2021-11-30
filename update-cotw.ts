import fs from 'fs';
import glob from 'glob';
import path from 'path';

// relative path to the directory into which the docs repo is cloned by the github action
const contentRepoPath = 'docs/';

const storePath = path.join(__dirname, contentRepoPath, 'bin/concept-of-the-week.txt');

const getRandomElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const conceptPaths = glob
  .sync(path.join(contentRepoPath, 'content/*/concepts/*/*.md'))
  .map((conceptPath) => conceptPath.replace(contentRepoPath, ''));

const currentConceptPath = fs.existsSync(storePath)
  ? fs.readFileSync(storePath)
  : '';

let newConceptPath: string;
do {
  newConceptPath = getRandomElement(conceptPaths);
} while (newConceptPath === currentConceptPath);

fs.writeFileSync(storePath, newConceptPath, 'utf8');

console.log(`Update successful: ${currentConceptPath} -> ${newConceptPath}`);
