// Transforma bytes em "850 KB" ou "1.8 MB"
export function formatarTamanho(bytes?: number) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}