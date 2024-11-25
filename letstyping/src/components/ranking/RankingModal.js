import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
} from "@chakra-ui/react";
import ModalTitle from "./ModalTitle";
import TopRanking from "./TopRanking";
import MyRanking from "./MyRanking";

const RankingModal = ({ rankingData, title = "안중근이 독립기원하며" , link = "", name }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // rankingData를 score 기준으로 내림차순
  const sortedRankingData = [...rankingData].sort((a, b) => b.score - a.score);

  // 내 랭킹 찾기
  const myIndex = sortedRankingData.findIndex((rank) => rank.name === name);
  const myData = sortedRankingData[myIndex];
  const myRank = myIndex + 1;

  // 내 랭킹 위아래로 2명씩 가져오기
  const displayedRankings = sortedRankingData.slice(
    Math.max(0, myIndex - 2), // 배열의 시작 인덱스
    myIndex + 3               // 배열의 끝 인덱스 (slice는 끝 인덱스 제외)
  );
  console.log(displayedRankings);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      size="xl"
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0)" />
      <ModalContent
        position="fixed"   // 화면 기준으로 고정 위치
        top="20%"          // 상단 기준 20%
        left="20%"         // 왼쪽 기준 20%

        maxWidth="1100px"
        width={["90%", "80%", "70%", "955px"]}
        height="550px"
        background="#FFFFFF"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.15)"
        borderRadius="md"
        marginBottom="10px"
      >
        <ModalTitle title={title} link={link} />
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            {/* Left Side: TopRanking */}
            <Box flex="1.2">
              <TopRanking rankingData={sortedRankingData.slice(0, 3)} />
            </Box>
            {/* Right Side: MyRanking */}
            <Box flex="1" transform="translateY(-30px)">
              {displayedRankings.map((rank, index) => (
                <MyRanking
                  key={index}
                  displayData={rank}
                  myData={rank.name === name} // 내 랭킹 강조 여부 전달
                  myRank={sortedRankingData.findIndex((r) => r.name === rank.name) + 1} // 내 순위
                />
              ))}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RankingModal;
