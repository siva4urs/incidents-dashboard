import styles from './IncidentsList.module.scss';
import type { IncidentViewModel } from '@/domain/types';
import { PriorityIcon } from '@/components/PriorityIcon';

export function IncidentsList({ items }: { items: readonly IncidentViewModel[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item} data-testid="incident-item">
          <div className={styles.headerRow}>
            <PriorityIcon priority={item.priority} alt={`${item.priorityLabel} priority`} />
            <span className={styles.date}>{item.datetimeLocal}</span>
          </div>
          <div className={styles.location}>{item.locationName}</div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.meta}>{item.priorityLabel} priority</div>
        </li>
      ))}
    </ul>
  );
}
