import type { IncidentDto, IncidentWithLocation, LocationDto } from '@/domain/types';
// NOTE: We keep the provided fake API file content unchanged as required.
import fakeApi from '@/js/fake-api';

type FakeApi = {
  getLocations: () => Promise<LocationDto[]>;
  getIncidentsByLocationId: (locationId: string) => Promise<IncidentDto[]>;
};

const api = fakeApi as unknown as FakeApi;

async function getAllIncidents(): Promise<IncidentWithLocation[]> {
  const locations = await api.getLocations();

  // Fetch incidents for each location concurrently.
  const incidentSets = await Promise.all(
    locations.map(async (loc) => {
      const incidents = await api.getIncidentsByLocationId(loc.id);
      return incidents.map((incident) => ({ incident, location: loc }));
    })
  );

  return incidentSets.flat();
}

export const incidentsApi = {
  getAllIncidents
};
