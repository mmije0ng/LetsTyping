import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RankingModal from "../components/ranking/RankingModal";
import Quiz from "../components/ranking/Quiz";

const Ranking = () => { // 타이핑제목, 링크주소, 유저이름, 유저점수, 키워드, 키워드 설명 받아와야 함
  const location = useLocation();
  const { state } = location; // location.state 구조 분해
  const [rankingData, setRankingData] = useState([]);

  console.log('랭킹페이지에서 받음 : ', state); // { title: ~~, name: ~~, score: ~~, keywords: ~~ }

  useEffect(() => {
    // 로컬스토리지에서 데이터를 가져옵니다.
    const data = localStorage.getItem("rankingData");
    const storedData = JSON.parse(data);

    // 로컬스토리지에 데이터 없으면 기본 데이터셋 설정
    const initialData = storedData || [
      { name: "미정", score: 360 },
      { name: "희연", score: 178 },
      { name: "경민", score: 82 },
      { name: "지수", score: 18 },
      { name: "규림", score: -31 },
    ];

    // 기본 데이터나 기존 데이터를 상태에 설정
    setRankingData(initialData);

    // 만약 state가 존재하면 새로운 데이터 추가
    if (state) {
      const newEntry = { name: state.name, score: state.score };

      // 중복된 데이터가 없는지 확인
      const isDuplicate = initialData.some(
        (entry) => entry.name === newEntry.name && entry.score === newEntry.score
      );

      if (!isDuplicate) {
        const updatedData = [...initialData, newEntry];
        setRankingData(updatedData);
        localStorage.setItem("rankingData", JSON.stringify(updatedData)); // 로컬스토리지 업데이트
      }
    }
  }, [state]); // state가 변경될 때 실행


  return (
    <>
      <Quiz keywords={state.keywords} /> 
      <RankingModal
        rankingData={rankingData}
        title={state?.title || " "}
        name={state?.name || "YOU"}
        score={state?.score || 0}
      />
    </>
  );
};

export default Ranking;
