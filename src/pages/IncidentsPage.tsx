import { useEffect, useMemo, useState } from 'react';
import styles from './IncidentsPage.module.scss';
import type { IncidentViewModel } from '@/domain/types';
import { buildIncidentViewModels } from '@/domain/transform';
import { incidentsApi } from '@/api/incidentsApi';
import { IncidentsTable } from '@/components/IncidentsTable';
import { IncidentsList } from '@/components/IncidentsList';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function IncidentsPage() {
  const [items, setItems] = useState<IncidentViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 599px)');

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const raw = await incidentsApi.getAllIncidents();
        const vm = buildIncidentViewModels(raw);
        if (!isCancelled) setItems(vm);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        if (!isCancelled) setError(message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, []);

  const content = useMemo(() => {
    if (isLoading) return <div className={styles.status}>Loading incidents…</div>;
    if (error) return <div className={styles.statusError}>Failed to load: {error}</div>;
    if (items.length === 0) return <div className={styles.status}>No incidents.</div>;

    return isMobile ? <IncidentsList items={items} /> : <IncidentsTable items={items} />;
  }, [error, isLoading, isMobile, items]);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Incidents</h1>
      <section className={styles.card} aria-live="polite">
        {content}
      </section>
    </main>
  );
}
