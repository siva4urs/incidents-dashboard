import type { Priority } from './types';

export function priorityToLabel(priority: Priority): 'High' | 'Medium' | 'Low' {
  switch (priority) {
    case 1:
      return 'High';
    case 2:
      return 'Medium';
    case 3:
      return 'Low';
    default: {
      const _exhaustive: never = priority;
      return _exhaustive;
    }
  }
}
