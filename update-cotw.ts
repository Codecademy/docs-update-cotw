import { execSync } from 'child_process';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const storePath = path.join(__dirname, 'docs/bin/concept-of-the-week.txt');

const getRandomElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

execSync('ls', {
  stdio: [0, 1, 2],
});

execSync('git clone git@github.com:Codecademy/docs.git', {
  stdio: [0, 1, 2],
});

const conceptPaths = glob.sync('docs/content/*/concepts/*/*.md');

const currentConceptPath = fs.existsSync(storePath)
  ? fs.readFileSync(storePath)
  : '';

let newConceptPath: string;
do {
  newConceptPath = getRandomElement(conceptPaths);
} while (newConceptPath === currentConceptPath);

fs.writeFileSync(storePath, newConceptPath, 'utf8');

console.log(`Update successful: ${currentConceptPath} -> ${newConceptPath}`);
