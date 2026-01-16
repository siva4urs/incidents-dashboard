import type { IncidentWithLocation, IncidentViewModel } from './types';
import { priorityToLabel } from './priority';

/**
 * Filters duplicates by incident `id`, keeping the first occurrence.
 */
export function dedupeByIncidentId(items: readonly IncidentWithLocation[]): IncidentWithLocation[] {
  const seen = new Set<number>();
  const result: IncidentWithLocation[] = [];

  for (const item of items) {
    const id = item.incident.id;
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(item);
  }

  return result;
}

export function sortIncidents(items: readonly IncidentWithLocation[]): IncidentWithLocation[] {
  return [...items].sort((a, b) => {
    if (a.incident.priority !== b.incident.priority) {
      return a.incident.priority - b.incident.priority;
    }

    // Descending datetime
    const aTime = new Date(a.incident.datetime).getTime();
    const bTime = new Date(b.incident.datetime).getTime();
    return bTime - aTime;
  });
}

export function formatLocalDatetime(iso: string): string {
  return new Date(iso).toLocaleString();
}

export function buildIncidentViewModels(
  items: readonly IncidentWithLocation[]
): IncidentViewModel[] {
  const deduped = dedupeByIncidentId(items);
  const sorted = sortIncidents(deduped);

  return sorted.map(({ incident, location }) => ({
    id: incident.id,
    name: incident.name,
    datetimeIso: incident.datetime,
    datetimeLocal: formatLocalDatetime(incident.datetime),
    priority: incident.priority,
    priorityLabel: priorityToLabel(incident.priority),
    locationId: location.id,
    locationName: location.name
  }));
}
