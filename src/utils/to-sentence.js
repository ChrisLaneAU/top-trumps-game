export default function toSentence(camelCaseStr) {
  const result = camelCaseStr
    .replace(/([A-Z])/g, ' $1')
    .replace(/percent/g, '%');

  return result.charAt(0).toUpperCase() + result.slice(1);
}
