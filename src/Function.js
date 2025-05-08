// breakText 函数用于将一段文字按最大长度进行分行（默认最多每行 14 字符）
// The breakText function splits long text into multiple lines, each no longer than maxLength (default 14)
export function breakText(text, maxLength = 14) {
  // 先按空格将文字拆成一个个单词
  // Split the input text into words by spaces
  const words = text.split(" ");

  const lines = []; // 存放换行后的每一行 // Array to hold resulting lines
  let line = ""; // 当前正在拼接的这一行 // Current line being built

  // 遍历每个单词 // Iterate through each word
  for (let word of words) {
    // 如果当前行加上这个词仍小于等于最大长度，就加进去
    // If the line plus the new word is within the limit, append it
    if ((line + " " + word).trim().length <= maxLength) {
      line += (line ? " " : "") + word; // 注意首词不加空格 // Add space only if line is not empty
    } else {
      // 否则把当前行存入结果，并用这个词开始新的一行
      // Otherwise, save current line and start a new one with this word
      lines.push(line);
      line = word;
    }
  }

  // 把最后一个未处理的 line 加进去
  // Add the last remaining line, if any
  if (line) lines.push(line);

  return lines; // 返回换行后的字符串数组 // Return array of lines
}
