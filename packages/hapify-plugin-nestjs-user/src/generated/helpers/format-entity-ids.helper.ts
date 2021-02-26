export function formatEntityIds(ids: string[]): { id: string }[] {
  return ids.map((id) => ({ id }));
}
