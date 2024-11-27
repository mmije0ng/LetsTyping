import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import TopRanking from "./TopRanking";
import MyRanking from "./MyRanking";

const RankingModal = ({ rankingData, title, name, score }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // rankingData를 score 기준으로 내림차순
  const sortedRankingData = [...rankingData].sort((a, b) => b.score - a.score);
  console.log('sortedRankingData : ', sortedRankingData);

  // 내 순위 찾기 (이름과 점수가 일치하는 데이터)
  const myIndex = sortedRankingData.findIndex(
    (rank) => rank.name === name && rank.score === score
  );
  const myData = sortedRankingData[myIndex];
  const myRank = myIndex + 1;

  // 내 랭킹 위아래로 2명씩 가져오기
  const displayedRankings = sortedRankingData.slice(
    Math.max(0, myIndex - 2), // 배열의 시작 인덱스
    myIndex + 3               // 배열의 끝 인덱스 (slice는 끝 인덱스 제외)
  );
  console.log('displayedRankings : ', displayedRankings);

  return (
    <CustomModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={title}
      link={""}
    >
      <Flex
        direction={["column", "row"]} // 좁은 화면에서는 세로 정렬
        justify="space-around"
        align="center"
        
        gap="20px" // 요소 간 간격
      >
        {/* 왼쪽 컴포넌트: TopRanking */}
        <Box flex="1.2" width={["100%", "50%"]}>
          <TopRanking rankingData={sortedRankingData.slice(0, 3)} />
        </Box>

        {/* 오른쪽 컴포넌트: MyRanking */}
        <Box flex="1" width={["100%", "50%"]} transform="translateY(-30px)">
          {displayedRankings.map((rank, index) => (
            <MyRanking
              key={index}
              displayData={rank}
              myData={rank.name === myData.name && rank.score === myData.score} // 내 랭킹 강조 여부 전달
              myRank={sortedRankingData.findIndex((r) => r.name === rank.name && r.score === rank.score) + 1} // 내 순위
            />
          ))}
        </Box>
      </Flex>
    </CustomModal>
  );
};

export default RankingModal;