export function breakText(text, maxLength = 14) {
  const words = text.split(" ");

  const lines = [];
  let line = "";

  // Iterate through each word
  for (let word of words) {
    if ((line + " " + word).trim().length <= maxLength) {
      line += (line ? " " : "") + word;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);

  return lines;
}
