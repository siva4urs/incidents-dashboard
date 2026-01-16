import type { IncidentWithLocation, Priority } from '@/domain/types';

export function dedupeById(items: IncidentWithLocation[]): IncidentWithLocation[] {
  const seen = new Set<number>();
  const unique: IncidentWithLocation[] = [];

  for (const item of items) {
    if (seen.has(item.incident.id)) continue;
    seen.add(item.incident.id);
    unique.push(item);
  }

  return unique;
}

export function sortByPriorityAscDatetimeDesc(
  items: IncidentWithLocation[]
): IncidentWithLocation[] {
  return [...items].sort((a, b) => {
    const pA = a.incident.priority as Priority;
    const pB = b.incident.priority as Priority;
    if (pA !== pB) return pA - pB;

    const tA = Date.parse(a.incident.datetime);
    const tB = Date.parse(b.incident.datetime);
    return tB - tA;
  });
}
