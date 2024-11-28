import React, { useState } from "react";
import { Flex, Box, Tooltip, Text } from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import TopRanking from "./TopRanking";
import MyRanking from "./MyRanking";

const RankingModal = ({ rankingData, title, name, score }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

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
      <Tooltip
        label=" 창을 닫으면, 재미있는 워들 게임이 있습니다 "
        isOpen={isTooltipOpen} // Tooltip이 열려있도록 설정
        closeOnMouseLeave={true} // 마우스를 떼면 닫히도록 설정
        hasArrow
        placement="top-end" // 툴팁이 상단이 아닌 하단에 배치되도록 변경
        bg="#696969"
        color="white"
        sx={{
          whiteSpace: "pre-wrap",
          padding: "0.3rem", 
          top: "-14rem", 
          right: "-48rem", 
          
        }}
      >
      </Tooltip>

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
          {myData ? (  // myData가 있을 때만 MyRanking 렌더링
            displayedRankings.map((rank, index) => (
              <MyRanking
                key={index}
                displayData={rank}
                myData={rank.name === myData.name && rank.score === myData.score}  // 내 랭킹 강조 여부 전달
                myRank={sortedRankingData.findIndex((r) => r.name === rank.name && r.score === rank.score) + 1}  // 내 순위
              />
            ))
          ) : (  // myData가 없을 경우 MyRanking 대신 띄울 화면
            <Text fontSize="lg" textAlign="center"> 타이핑 후 나의 랭킹 확인이 가능합니다 </Text>
          )}
        </Box>
      </Flex>
    </CustomModal>
  );
};

export default RankingModal;