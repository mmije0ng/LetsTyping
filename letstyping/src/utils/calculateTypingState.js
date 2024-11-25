// calculateTypingState.js
import { diff_match_patch } from "diff-match-patch";
import Hangul from "hangul-js";

const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const JUNG = [
  "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ",
];
const JONG = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ",
  "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];

// 유니코드 분리 함수
export const splitToUnicode = (text) => {
  const splitText = [];
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const baseCode = code - 0xac00;
      const cho = CHO[Math.floor(baseCode / 588)];
      const jung = JUNG[Math.floor((baseCode % 588) / 28)];
      const jong = JONG[baseCode % 28];
      splitText.push(cho, jung, jong);
    } else {
      splitText.push(char);
    }
  }
  return splitText;
};

// 오타 및 진행 계산 함수
export const calculateTypingState = (targetText, userInput, startTime, mistakeKeys = {}, processedIndices = new Set()) => {
  const dmp = new diff_match_patch();
  const updatedMistakeKeys = { ...mistakeKeys };
  const mistakePositions = []; // 오타 위치를 저장할 배열
  const targetUnicode = splitToUnicode(targetText);
  const inputUnicode = splitToUnicode(userInput);

  const diffs = dmp.diff_main(targetUnicode.join(""), inputUnicode.join(""));
  dmp.diff_cleanupSemantic(diffs);

  diffs.forEach(([op, text], diffIndex) => {
    if (op !== 0) { // 추가된 문자(op === 1) 또는 누락된 문자(op === -1)
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charIndex = diffIndex * targetUnicode.length + i;

        if (!processedIndices.has(charIndex)) {
          if (op === 1) { // 입력된 문자에서 추가된 경우
            updatedMistakeKeys[char] = (updatedMistakeKeys[char] || 0) + 1;
            mistakePositions.push(charIndex); // 오타 위치 추가
          }
          processedIndices.add(charIndex);
        }
      }
    }
  });

  const progress = Math.min((userInput.length / targetText.length) * 100, 100);
  const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
  const totalCharacters = Hangul.disassemble(userInput).length;
  const wpm = timeElapsed ? Math.round((totalCharacters / 5) / (timeElapsed / 60)) : 0;
  const cpm = timeElapsed ? Math.round(totalCharacters / timeElapsed) : 0;

  return {
    updatedMistakeKeys,
    progress,
    totalMistakes: Object.values(updatedMistakeKeys).reduce((a, b) => a + b, 0),
    wpm,
    cpm,
    mistakePositions, // 추가된 반환값
  };
};

