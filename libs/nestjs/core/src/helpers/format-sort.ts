export function formatSort<T extends string>(
  sort: string[],
  defaultOrder: 'asc' | 'desc',
): Record<T, 'asc' | 'desc'> {
  return sort.reduce((acc, sortItem) => {
    const [sortBy, sortOrder] = sortItem.split(':');
    acc[sortBy] =
      typeof sortOrder !== undefined &&
      (sortOrder === 'asc' || sortOrder === 'desc')
        ? sortOrder
        : defaultOrder;
    return acc;
  }, {} as Record<string, 'asc' | 'desc'>);
}
