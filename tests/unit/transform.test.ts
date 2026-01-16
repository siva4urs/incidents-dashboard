import { describe, expect, it } from 'vitest';
import type { IncidentWithLocation } from '@/domain/types';
import { buildIncidentViewModels, dedupeByIncidentId, sortIncidents } from '@/domain/transform';

const location = { id: 'loc', name: 'Location' };

function iw(id: number, priority: 1 | 2 | 3, datetime: string): IncidentWithLocation {
  return {
    incident: { id, name: `i-${id}`, priority, datetime, locationId: location.id },
    location
  };
}

describe('transform', () => {
  it('dedupes by incident id', () => {
    const input = [iw(1, 1, '2018-01-01T00:00:00.000Z'), iw(1, 3, '2018-01-02T00:00:00.000Z')];
    const out = dedupeByIncidentId(input);
    expect(out).toHaveLength(1);
    expect(out[0].incident.priority).toBe(1);
  });

  it('sorts by priority asc then datetime desc', () => {
    const input = [
      iw(1, 2, '2018-01-01T00:00:00.000Z'),
      iw(2, 1, '2018-01-01T00:00:00.000Z'),
      iw(3, 1, '2018-01-02T00:00:00.000Z'),
      iw(4, 3, '2018-01-03T00:00:00.000Z')
    ];

    const out = sortIncidents(input);
    expect(out.map((x) => x.incident.id)).toEqual([3, 2, 1, 4]);
  });

  it('builds view models with labels and local datetime', () => {
    const input = [iw(1, 3, '2018-01-01T00:00:00.000Z')];
    const out = buildIncidentViewModels(input);
    expect(out[0]).toMatchObject({ id: 1, priorityLabel: 'Low', locationName: 'Location' });
    expect(out[0].datetimeLocal).toBeTypeOf('string');
  });
});
