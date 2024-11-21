// 타이핑 오타 계산 알고리즘

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { diff_match_patch } from "diff-match-patch";

const TypingCalculate = ({ data, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 입력 중인 문자열의 인덱스
    const [userInput, setUserInput] = useState(""); // 사용자가 입력한 문자열
    const [startTime, setStartTime] = useState(null); // 타이핑 시작 시간
    const [endTime, setEndTime] = useState(null); // 타이핑 종료 시간
    const [isComplete, setIsComplete] = useState(false); // 타이핑 완료 여부
    const [mistakeKeys, setMistakeKeys] = useState({}); // 누적된 오타 정보를 저장
    const [processedIndices, setProcessedIndices] = useState(new Set()); // 처리된 인덱스를 저장 (중복 방지)

    const inputRef = useRef(null); // 입력 필드 참조
    const navigate = useNavigate();
    const dmp = new diff_match_patch(); // diff-match-patch 라이브러리 객체 생성
    const targetText = data.stringData[currentIndex]; // 현재 타겟 텍스트

    // 초성, 중성, 종성 배열 정의
    const CHO = [
        "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
    ];
    const JUNG = [
        "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ",
    ];
    const JONG = [
        "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ",
        "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
    ];

    // 유니코드 변환 함수 (초성, 중성, 종성 분리)
    const splitToUnicode = (text) => {
        const splitText = [];
        for (const char of text) {
            const code = char.charCodeAt(0);
            if (code >= 0xac00 && code <= 0xd7a3) {
                // 한글 완성형 문자
                const baseCode = code - 0xac00;
                const cho = CHO[Math.floor(baseCode / 588)]; // 초성
                const jung = JUNG[Math.floor((baseCode % 588) / 28)]; // 중성
                const jong = JONG[baseCode % 28]; // 종성
                splitText.push(cho, jung, jong);
            } else {
                splitText.push(char); // 비한글 문자는 그대로
            }
        }
        return splitText;
    };

    useEffect(() => {
        if (endTime) {
            calculateResults(); // mistakeKeys를 기반으로 결과 계산
        }
    }, [endTime]);

    // currentIndex 변경 시 입력 필드 초기화 및 포커스 유지
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = ""; // DOM 레벨에서 입력 필드 초기화
            inputRef.current.focus(); // 입력 필드에 포커스 유지
        }
        setUserInput(""); // 상태 값도 초기화
    }, [currentIndex]);

    // 키 입력 시 오타 검증 함수
    const handleInputChange = (e) => {
        const value = e.target.value;

        if (!startTime) setStartTime(Date.now()); // 첫 입력 시 시간 기록

        const updatedMistakeKeys = { ...mistakeKeys };
        const currentMistakeKeys = {};
        const currentProcessedIndices = new Set(processedIndices);

        const targetUnicode = splitToUnicode(targetText); // 타겟 텍스트 유니코드 변환
        const inputUnicode = splitToUnicode(value); // 입력 텍스트 유니코드 변환

        // diff-match-patch를 활용하여 비교
        const diffs = dmp.diff_main(targetUnicode.join(""), inputUnicode.join(""));
        dmp.diff_cleanupSemantic(diffs);

        // 변경된 부분만 오타로 처리
        diffs.forEach(([op, text], diffIndex) => {
            if (op === 1) { // 입력된 문자 중 오타 처리
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const charIndex = diffIndex * targetUnicode.length + i;

                    // 중복 검증 방지
                    if (!currentProcessedIndices.has(charIndex)) {
                        currentMistakeKeys[char] = (currentMistakeKeys[char] || 0) + 1;
                        currentProcessedIndices.add(charIndex);
                    }
                }
            }
        });

        // 현재 발견된 오타를 기존 오타 정보에 병합
        for (const [key, count] of Object.entries(currentMistakeKeys)) {
            updatedMistakeKeys[key] = (updatedMistakeKeys[key] || 0) + count;
        }

        setUserInput(value);
        setMistakeKeys(updatedMistakeKeys);
        setProcessedIndices(currentProcessedIndices);

        // 입력이 타겟 텍스트와 일치할 경우 다음 단계로 이동
        if (value === targetText) {
            if (currentIndex < data.stringData.length - 1) {
                setTimeout(() => {
                    setUserInput(""); // 상태 초기화
                    setProcessedIndices(new Set()); // 처리된 인덱스 초기화
                    setCurrentIndex((prevIndex) => prevIndex + 1); // 다음 타겟 텍스트로 이동
                }, 0); // 상태 업데이트 강제 비동기 처리
            } else {
                setEndTime(Date.now());
                setIsComplete(true);
            }
        }
    };

    const calculateResults = () => {
        if (!startTime || !endTime) {
            console.error("startTime or endTime is not set.");
            return;
        }

        const timeTaken = (endTime - startTime) / 1000; // 시간
        const totalChars = data.stringData.join("").length; // 타수
        // 정확도
        const accuracy = Math.round(
            ((totalChars - Object.values(mistakeKeys).reduce((a, b) => a + b, 0)) / totalChars) * 100
        );
        
        // 타이핑 결과 페이지로 반환할 데이터
        const resultData = {
            time: `${Math.floor(timeTaken / 60)}분 ${Math.floor(timeTaken % 60)}초`,
            tasks: totalChars,
            accuracy: accuracy,
            keywords: data.keywords,
            mistakeKeys: { ...mistakeKeys },
            isKorean: data.isKorean,
        };

        console.log(resultData);

        // App.js의 handleTypingComplete 함수의 data를 useEffect로 상태를 바꾸어 result 페이지에 넘기기
        onComplete(resultData); 
        navigate("/result"); // 타이핑 결과 페이지로 이동
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Typing Challenge</h1>
            <p>Target Text: {targetText}</p>
            <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                style={{
                    width: "100%",
                    height: "100px",
                    margin: "10px 0",
                    fontSize: "16px",
                }}
            />
            <p>Mistakes:</p>
            <ul>
                {Object.entries(mistakeKeys).map(([key, count]) => (
                    <li key={key}>
                        {key}: {count} time(s)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TypingCalculate;
