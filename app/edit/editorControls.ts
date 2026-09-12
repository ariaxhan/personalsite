export function isDraftSaveDisabled({
  busy,
  dirty,
  editing,
}: {
  busy: boolean;
  dirty: boolean;
  editing: boolean;
}): boolean {
  return busy || (!dirty && !editing);
}
