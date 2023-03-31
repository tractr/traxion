#!/usr/bin/env zx

/**
 * Delete all files and folders in the directory except for the .git folder
 * @param {string} rootPath
 * @return void
 */
function removeAllExceptGitFolder(rootPath) {
  const files = fs.readdirSync(rootPath);
  for (const file of files) {
    if (file === '.git') {
      continue;
    }
    const curPath = path.join(rootPath, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      removeAllExceptGitFolder(curPath);
      fs.rmdirSync(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  }
}

/**
 * @param {string} sourcePath
 * @param {string} destinationPath
 */
function copyAllFilesAndFolderToDestination(sourcePath, destinationPath) {
  const files = fs.readdirSync(sourcePath);
  for (const file of files) {
    const curPath = path.join(sourcePath, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      fs.mkdirSync(path.join(destinationPath, file));
      copyAllFilesAndFolderToDestination(
        curPath,
        path.join(destinationPath, file),
      );
    } else {
      fs.copyFileSync(curPath, path.join(destinationPath, file));
    }
  }
}

// Define options
const outputDocsDir = path.join(`${process.cwd()}`, 'dist', 'apps', 'docs');
const tmpDir = path.join(`${process.cwd()}`, 'tmp', 'docs');
const repoUrl = 'git@github.com:tractr/stack.github.io.git';
const cname = 'www.traxion.dev';
const commitMessage = 'docs: update documentation';

// Clone the docs repo and removes all files except for the .git folder
await $`rm -rf ${tmpDir}`;
await $`git clone ${repoUrl} ${tmpDir}`;
removeAllExceptGitFolder(tmpDir);

// Build the docs and copy files to the docs repo
await $`nx build-legacy docs`;
await copyAllFilesAndFolderToDestination(outputDocsDir, tmpDir);

// Add the CNAME file
await fs.writeFileSync(path.join(tmpDir, 'CNAME'), cname, { encoding: 'utf8' });

// Commit and push changes
await $`cd ${tmpDir} && git add . && git commit -m "${commitMessage}" && git push`;
