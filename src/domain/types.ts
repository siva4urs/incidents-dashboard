export type Priority = 1 | 2 | 3;

export interface LocationDto {
  id: string;
  name: string;
}

export interface IncidentDto {
  id: number;
  name: string;
  priority: Priority;
  datetime: string; 
  locationId: string;
}

export interface IncidentWithLocation {
  incident: IncidentDto;
  location: LocationDto;
}

export interface IncidentViewModel {
  id: number;
  name: string;
  datetimeIso: string;
  datetimeLocal: string;
  priority: Priority;
  priorityLabel: string;
  locationId: string;
  locationName: string;
}
