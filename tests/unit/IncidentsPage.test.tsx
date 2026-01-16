import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { IncidentsPage } from '@/pages/IncidentsPage';

// 1) Mock API once (stable async data)
vi.mock('@/api/incidentsApi', () => ({
  incidentsApi: {
    getAllIncidents: vi.fn(async () => [
      {
        incident: {
          id: 1,
          name: 'Fire',
          priority: 1,
          datetime: '2018-01-22T11:25:18.000Z',
          locationId: 'loc1',
        },
        location: { id: 'loc1', name: 'T1 Lobby' },
      },
    ]),
  },
}));

// 2) Mock media hook with a controllable function
const useMediaQueryMock = vi.fn<boolean, [string]>();

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: (query: string) => useMediaQueryMock(query),
}));

describe('IncidentsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows table on desktop', async () => {
    useMediaQueryMock.mockReturnValue(false); // desktop

    render(<IncidentsPage />);

    const row = await screen.findByTestId('incident-row');
    expect(row).toBeInTheDocument();
    expect(within(row).getByText('Fire')).toBeInTheDocument();
  });

  it('shows list on small screens', async () => {
    useMediaQueryMock.mockReturnValue(true); // mobile

    render(<IncidentsPage />);

    const item = await screen.findByTestId('incident-item');
    expect(item).toBeInTheDocument();
    expect(within(item).getByText('T1 Lobby')).toBeInTheDocument();
  });
});
