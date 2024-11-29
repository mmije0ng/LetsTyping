import React from "react";
import { HStack, VStack, Box, Badge, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import firstPlaceImage from "../../assets/images/1위.png";
import secondPlaceImage from "../../assets/images/2위.png";
import thirdPlaceImage from "../../assets/images/3위.png";

const MotionImage = motion.img;

const TopRanking = ({ rankingData }) => {
  // 순위를 2위, 1위, 3위로 재정렬
  const orderedRankingData = rankingData
    .map((rank, index) => {
      return {
        ...rank,
        order: index === 0 ? 1 : index === 1 ? 0 : 2, // 2위, 1위, 3위 순서로 변경
      };
    })
    .sort((a, b) => a.order - b.order); // 순위를 정렬하여 2위, 1위, 3위 순서대로 배치

  return (
    <HStack spacing={[2, 5]} justify="center" align="flex-end">
      {orderedRankingData.map((rank, index) => (
        <VStack key={rank.id} align="center" spacing={2}>
          {/* 순위 박스 */}
          <Box
            bg="#DFDFDF"
            borderRadius="md"
            p={[1, 2]}
            textAlign="center"
            boxShadow="md"
            width={["70px", "80px", "100px"]}
            height={index === 0 ? "190px" : index === 1 ? "260px" : "150px"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            >

            <img
              src={
                index === 0 ? secondPlaceImage : index === 1 ? firstPlaceImage : thirdPlaceImage
              }
              alt={`${index === 0 ? "2위" : index === 1 ? "1위" : "3위"} 순위`}
              width="80px" 
              height="80px"
              style={{ marginBottom: "10px" }}
            />

            {/* 점수 표시 */}
            <Text fontSize={["lg", "2xl", "3xl"]} fontWeight="bold" color="white" mt="auto">{rank.score}</Text>
          </Box>

          {/* 이름을 Box로 빼고 스타일을 동일하게 적용 */}
          <Box
            bg="#BBBBBB"
            color="white"  // 폰트 색 하양
            borderRadius="md"
            p={[2, 3]}
            textAlign="center"
            boxShadow="md"
            width={["60px", "80px", "100px"]}
            height="30px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold">{rank.name}</Text>
          </Box>
        </VStack>
      ))}
    </HStack>
  );
};

export default TopRanking;
