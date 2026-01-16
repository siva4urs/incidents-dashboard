import styles from './App.module.scss';
import { IncidentsPage } from '@/pages/IncidentsPage';

export default function App() {
  return (
    <div className={styles.appShell}>
      <IncidentsPage />
    </div>
  );
}
