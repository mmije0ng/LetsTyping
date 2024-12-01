import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ReactTyped } from "react-typed";
import { motion } from 'framer-motion';

const UserList = ({ users }) => {
    const [typedStrings, setTypedStrings] = useState([]);
    const [showThanks, setShowThanks] = useState(false);
    useEffect(() => {
        const allNames = users.map(user => `${user.name} 님`).join(", ");  // 공백으로 이어 붙이기
        setTypedStrings([allNames]);  // 한 문자열로 저장
    }, [users]);

    const handleTypingComplete = () => {
        setShowThanks(true);  // 타이핑 애니메이션 끝난 후 "감사합니다" 텍스트 보이기
    };     

  return (
    <Box position="relative" top={-100}  width="100%" height="100%" overflow="visible" pt="20px" >
        <motion.div
                initial={{ opacity: 0 }} // 초기 상태: opacity 0 (투명)
                animate={{ opacity: 1 }} // 애니메이션 끝: opacity 1 (보이게)
                transition={{ duration: 1.5 }} // 애니메이션 지속 시간: 2초
        >
            <Text fontSize="xl" mb={10} color="#757575" >
                Let's Typing을 빛낸 명예의 전당
            </Text>
        </motion.div>

        <ReactTyped
            strings={typedStrings} // 사용자별로 타이핑할 문자열 배열
            typeSpeed={85} // 타이핑 속도 (ms)
            startDelay={500} // 시작 전 대기 시간 (ms)
            showCursor={true} // 커서 표시
            loop={false} // 반복하지 않도록 설정
            onComplete={handleTypingComplete}
        />
      
      {showThanks && (
            <motion.div
            initial={{ opacity: 0 }} // 초기 상태: opacity 0 (투명)
            animate={{ opacity: 1 }} // 애니메이션 끝: opacity 1 (보이게)
            transition={{ duration: 1.5 }} // 애니메이션 지속 시간: 2초
            >
                <Text mt={4} color="#757575">
                    찾아주셔서 감사합니다
                </Text>
            </motion.div>
            )}
    </Box>
  );
};

export default UserList;