import type { Priority } from '@/domain/types';
import highIcon from '@/assets/alarm-high.svg';
import mediumIcon from '@/assets/alarm-medium.svg';
import lowIcon from '@/assets/alarm-low.svg';

const ICON_BY_PRIORITY: Record<Priority, string> = {
  1: highIcon,
  2: mediumIcon,
  3: lowIcon
};

export function PriorityIcon({ priority, alt }: { priority: Priority; alt: string }) {
  return <img src={ICON_BY_PRIORITY[priority]} alt={alt} width={16} height={16} />;
}
