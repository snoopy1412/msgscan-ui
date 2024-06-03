export const formatNumber = (
  value: number,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 2,
  }).format(value);
};
