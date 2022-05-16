export const formatDate = (date) => {
  const formattedDate = new Date(date.split('T')[0].split('-'));

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return formattedDate.toLocaleDateString('es-ES', options);
}