import React, { useEffect, useState } from "react";
import RankingModal from "../components/ranking/RankingModal";
import Quiz from "../components/ranking/Quiz";
import QuizComp from "../components/ranking/QuizComp";

const Ranking = ({ name = "서연" }) => { // 타이핑제목, 링크주소, 유저이름, 유저점수, 키워드, 키워드 설명 받아와야 함
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("rankingData");
    const storedData = JSON.parse(data);

    // 로컬스토리지에 데이터가 없으면 기본 데이터 저장
    if (!storedData) {
      const mockRankingData = [
        { name: "미정", score: 542 },
        { name: "희연", score: 360 },
        { name: "경민", score: 278 },
        { name: "서연", score: 140 },
        { name: "지수", score: 102 },
        { name: "규림", score: 68 },
      ];
      localStorage.setItem("rankingData", JSON.stringify(mockRankingData));
      setRankingData(mockRankingData); // 기본 데이터를 상태로 설정
    } else {
      setRankingData(storedData); // 로컬스토리지에 저장된 데이터를 상태로 설정
    }
  }, []); // 초기 렌더링 시에만 실행

  useEffect(() => {
    console.log("Updated rankingData:", rankingData); // rankingData 변경 시마다 실행
  }, [rankingData]);

  

  return (
    <>
      <Quiz /> 
      <RankingModal
        rankingData={rankingData}
        title="안중근이 독립 기원하며 쓴 글씨, 15년만에 국내 공개"
        link="https://example.com"
        name={name}
      />
    </>
  );
};

export default Ranking;
