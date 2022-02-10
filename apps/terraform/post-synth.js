/*
 * This file is a workaround for the fact that Terraform CDKtf doesn't support built-in functions.
 * This is explained in the following issue: https://github.com/hashicorp/terraform-cdk/issues/220
 * None of the solutions suggested in the issue work for our use case as we don't have pre-defined values for IPv6 CIDR blocks.
 *
 * The first workaround applied in https://github.com/tractr/stack/blob/22e788e1ca1586ef176fb139105918b3ad4560ba/libs/terraform/group/network/src/lib/components/base.component.ts#L126-L136
 * doesn't not work anymore with the current version of CDKtf, as long as the this version uses temporary tokens during the synthesis
 * that are not correctly replaced once wrapped in a built-in function.
 *
 * Therefore, this script is meant to be used as a post-synthesis hook.
 * It fixes the generated cdk.tf.json by searching and replacing.
 */

const Fs = require('fs');
const Path = require('path');

const pkgDir = require('pkg-dir');
// Get generated Terraform output path
const terraformOutputPath = Path.resolve(
  pkgDir.sync(__dirname),
  'dist',
  'cdktf.out',
  'stacks',
  'main',
  'cdk.tf.json',
);
// Read file content
let content = Fs.readFileSync(terraformOutputPath, { encoding: 'utf8' });

// Search and replace malformed expressions
// -----------------------------------------
// CIDR
let cidrCount = 0;
const cidrRegex =
  /\${cidrsubnet\(\${([a-z0-9-_.]+)},\s?([0-9]+),\s?([\s0-9]+)\)}/gim;
content = content.replace(cidrRegex, (substring, token, newbits, netnum) => {
  cidrCount += 1;
  return `\${cidrsubnet(${token}, ${newbits}, ${netnum})}`;
});
// -----------------------------------------

// Write new content
Fs.writeFileSync(terraformOutputPath, content, { encoding: 'utf8' });

// Log
// eslint-disable-next-line no-console
console.log(`${cidrCount} CIDR subnet expressions replaced`);
