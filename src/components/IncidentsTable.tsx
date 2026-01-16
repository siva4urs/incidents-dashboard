import styles from './IncidentsTable.module.scss';
import type { IncidentViewModel } from '@/domain/types';
import { PriorityIcon } from '@/components/PriorityIcon';

export function IncidentsTable({ items }: { items: readonly IncidentViewModel[] }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th aria-label="Priority" />
            <th>Incident Name</th>
            <th>Date and Time</th>
            <th>Priority</th>
            <th>Location Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={styles.row} data-testid="incident-row">
              <td className={styles.iconCell}>
                <PriorityIcon priority={item.priority} alt={`${item.priorityLabel} priority`} />
              </td>
              <td>{item.name}</td>
              <td>{item.datetimeLocal}</td>
              <td>{item.priorityLabel}</td>
              <td>{item.locationName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
