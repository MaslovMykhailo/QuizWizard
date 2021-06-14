declare module 'download-csv' {
  const downloadCSV: (
    data: unknown[],
    columns: Record<string, string>,
    filename?: string
  ) => void
  export default downloadCSV
}
