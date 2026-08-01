export type RecentChangeInput = {
  id: string;
  changedAt: Date | string;
  label: string;
  direction?: "up" | "down" | "neutral";
  href?: string | null;
};

const CHANGE_WINDOW_MS = 48 * 60 * 60 * 1000;
const MAX_CHANGES = 6;

export function buildRecentChanges(changes: RecentChangeInput[], asOf: Date) {
  const floor = asOf.getTime() - CHANGE_WINDOW_MS;
  return changes
    .filter((change) => {
      const changedAt = new Date(change.changedAt).getTime();
      return changedAt >= floor && changedAt <= asOf.getTime();
    })
    .sort((left, right) => new Date(right.changedAt).getTime() - new Date(left.changedAt).getTime())
    .slice(0, MAX_CHANGES);
}
