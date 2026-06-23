/** ISO timestamp (`2026-02-14...`) → dot-separated date `2026·02·14`. */
export function fmtDate(iso: string | null): string {
  return iso ? iso.slice(0, 10).replace(/-/g, '·') : '';
}
