export function formatReleaseDate(value) {
  if (!value) {
    return 'Seasonal release';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

export function getStockStatusTone(status) {
  const normalizedStatus = status?.toLowerCase() ?? '';

  if (normalizedStatus.includes('low')) {
    return 'text-amber-700 dark:text-amber-200';
  }

  if (
    normalizedStatus.includes('pre-order') ||
    normalizedStatus.includes('preorder')
  ) {
    return 'text-sky-700 dark:text-sky-200';
  }

  if (normalizedStatus.includes('out')) {
    return 'text-rose-600 dark:text-rose-300';
  }

  return 'text-emerald-600 dark:text-emerald-300';
}
