/**
 * Wrap the CIDR in the cidrsubnet terraform method
 */
export function getSubnetCidr(
  cidrBlock: string,
  newBits: number,
  subnetNumber: number,
): string {
  return cidrBlock.replace(
    /\${([a-z0-9-_.[\]]+)}/i,
    (substring, token: string) =>
      `\${cidrsubnet("\${${token}}", ${newBits}, ${subnetNumber})}`,
  );
}

export function getCidrBlockForIndex(
  cidrBlock: string,
  subnetIndex: number,
): string {
  return getSubnetCidr(cidrBlock, 8, subnetIndex);
}

export function getPrivateSubnetNumber(index: number | undefined): number {
  return index || 0;
}

export function getPublicSubnetNumber(index: number | undefined): number {
  return (index || 0) + 128;
}
