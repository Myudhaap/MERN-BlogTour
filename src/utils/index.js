export const excerpt = (str, count = 45) => {
  if (str.length > count) {
    str = str.substring(0, 45) + "...";
  }
  return str;
};
