/** @type {import("prettier").Config} */
module.exports = {
  // 기본 스타일
  singleQuote: false, // " 사용
  semi: true, // 세미콜론 필수
  trailingComma: "all",
  printWidth: 80, // 한 줄 최대 80자
  tabWidth: 2,
  useTabs: false,

  // JSX
  jsxSingleQuote: false,

  // 개행
  endOfLine: "lf",
};
