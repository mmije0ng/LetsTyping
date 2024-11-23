import React from "react";
import styled from "styled-components";

import Lottie from "lottie-react";
import MovingCat from "../../assets/images/MovingCat.json";
import Pgbar from "../../assets/images/progressbar.png";

const TypingProgress = ({ progress }) => {
  const maxProgress = 85;
  const adjustedProgress = (progress / 100) * maxProgress;

  return (
    <>
      <ProgressBar>
        <Cat style={{ left: `${adjustedProgress}%` }}>
          <Lottie  animationData={MovingCat} style={style}  />
        </Cat>
        <Progress style={{ width: (`${93-adjustedProgress}%`) }} />
      </ProgressBar>
    </>
  );
};

export default TypingProgress;


const Cat = styled.div`
  position: absolute;
  top: -0px; /* 고양이를 ProgressBar 위로 배치 */
  transition: left 0.3s ease; /* 부드러운 이동 효과 */
`;

const ProgressBar = styled.div`
  background-image: url(${Pgbar});
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 40px;
  position: relative;
  background-size: contain; /* 이미지 크기를 조정 */
  background-repeat: no-repeat; /* 반복 금지 */
`;

const Progress = styled.div`
  height: 10%;
  background: #85b6ff;
  position: absolute; /* 위치를 고정 */
  bottom: 20px; /* 고양이 발과 일치하도록 위치 설정 */
  right: 0; /* 오른쪽에 고정 */
  transition: width 0.3s ease; /* 부드러운 애니메이션 효과 */
  border-radius: 10px 10px 10px 10px;
`;


const style = {
  height: 80,
  width: 80,
};