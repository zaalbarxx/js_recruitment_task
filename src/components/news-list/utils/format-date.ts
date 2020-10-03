export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
  const day = (parsedDate.getDate()).toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}
