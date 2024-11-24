import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MyRanking = ({ displayData, myData, myRank }) => {

  // myData가 있을 때만 motion.div로 감싸서 애니메이션 적용
  const BoxComponent = myData ? motion(Box) : Box;

  return (
    <BoxComponent
      initial={{ backgroundColor: "#E1FEFB" }} 
      animate={{
        backgroundColor: myData ? ["#FFFFFF", "#E1FEFB", "#FFFFFF"] : "#FFFFFF",
      }}
      transition={{
        duration: 0.7, // 1초마다 깜빡이기
        repeat: 1, // 무한 반복
        repeatType: "loop", // 애니메이션 방향을 반대로
      }}

      bg={"#FFFFFF"}
      boxShadow={myData ? "0 4px 10px rgba(0, 0, 0, 0.4)" : "none"} // 내 랭킹만 그림자
      borderRadius={myData ? "lg" : "none"}
      p={6}
      width="360px"
      height={myData ? "70px" : "60px"}
      display="flex" // Flex 컨테이너
      alignItems="center" // 세로 정렬
      borderBottom={myData ? "none" : "2px solid #DFDFDF"} // 내 랭킹은 가로줄 없음, 나머지는 회색
      borderLeft="2px solid white" // 세로줄 흰색
      borderRight="2px solid white" // 세로줄 흰색
      position={myData ? "relative" : "static"} // myData일 때 relative로 위치 설정
      zIndex={myData ? 1 : "auto"} // 내 랭킹을 제일 앞으로 설정
      transform={myData ? "translateY(-5px)" : "none"} // myData일 때만 살짝 위로 이동
    >
      <Flex justifyContent="space-between" width="100%">
        <Flex>
          <Text fontSize="xl" fontWeight={myData ? "bold" : "normal"} transform="translateY(-3px)">
            {myRank} {/* 순위 표시 */}
          </Text>
          <Text ml={4} fontSize="lg" fontWeight={myData ? "bold" : "normal"}>
            {displayData.name} {/* 이름 표시 */}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="xl" fontWeight={myData ? "bold" : "normal"}>
            {displayData.score} {/* 점수 표시 */}
        </Text>
        </Flex>
      </Flex>
    </BoxComponent>
  );
};

export default MyRanking;