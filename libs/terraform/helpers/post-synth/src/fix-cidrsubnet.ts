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
import {
  getTerraformOutputContentAsString,
  setTerraformOutputContent,
} from './helpers';

export function fixCidrSubnet(silent = false): void {
  // Load content
  let content = getTerraformOutputContentAsString();

  // Search and replace malformed expressions
  let count = 0;
  const regex =
    /\${cidrsubnet\(\${([a-z0-9-_.]+)},\s?([0-9]+),\s?([\s0-9]+)\)}/gim;
  content = content.replace(
    regex,
    (substring: string, token: string, newbits: string, netnum: string) => {
      count += 1;
      return `\${cidrsubnet(${token}, ${newbits}, ${netnum})}`;
    },
  );

  // Write new content
  setTerraformOutputContent(content);

  // Log results
  if (!silent) {
    // eslint-disable-next-line no-console
    console.log(`[FixCidrSubnet] ${count} CIDR subnet expressions replaced`);
  }
}
