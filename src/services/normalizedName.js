export const normalizedName = name => {
  if (name === '') return '';

  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ');
};
