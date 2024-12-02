# 타이핑 연습 사이트 Let’s typing  ⌨️

### 개요

- **프로젝트 이름**:  Let’s typing
- **설명**: 이 프로젝트는 스마트폰 사용의 증가로 인해 학생들의 컴퓨터 키보드 타이핑 능력이 저하되어 문서 작업에서 어려움을 겪는 문제를 해결하기 위해 개발된 React 기반의 타이핑 연습 웹 사이트입니다. 타이핑 연습을 통해 속도와 정확성을 향상시키는 한편, 타이핑 문장에서 주요 키워드와 설명을 제공하여 학생들의 문해력을 높이고, 학업 및 의사소통 능력을 개선하는 것을 목표로 하고 있습니다.
- **주요 기능**
    - 글 목록 & 고양이 선택
        - 사이트에서 제공하는 다양한 글(상식, 역사, 문학 등)을 선택해 타이핑 연습 가능
        - 직접 연습하고 싶은 글이 있다면, 복사하여 타이핑 연습에 활용
        - 고양이 캐릭터를 선택하여 친근하고 재미있는 학습 환경을 제공다.
    - 타이핑 연습 환경
        - 제공되는 글 & 코드를 따라 타이핑 하며 사용자의 타이핑 속도 측정
        - 사용자의 문해력을 키울 수 있도록 어려운 단어가 포함된 문장 제공
        - 측정 종료 시 걸린 시간, 타수, 오타, 자주 틀리는 키 정보와 타이핑 문장에서 어려운 낱말 키워드와 해석을 제공
    - 랭킹 & 퀴즈
        - 타이핑 완료 후 타수와 오타수를 기반으로 점수를 합산하여 랭킹을 확인
        - 타이핑 후 제공된 키워드를 퀴즈로 풀어보며 어려운 단어를 복습  
&nbsp;

## 실행 환경

- **Node.js 버전**: `20.17.0`
- **npm 버전**:  `10.8.2`  
&nbsp;


## 사용 라이브러리

| **종류** | **라이브러리** | **설명** |
| --- | --- | --- |
| **스타일링** | [styled-components](https://styled-components.com/) | 컴포넌트 기반의 스타일 적용으로 재사용성과 유지보수성 향상. |
| **UI 컴포넌트** | [Chakra UI](https://www.chakra-ui.com/) | 접근성과 유연성을 갖춘 UI 컴포넌트 제공. |
| **한글 처리** | [hangul-js](https://www.npmjs.com/package/hangul-js) | 한글 타이핑 모션 구현 및 자소 단위 분리. |
| **아이콘** | [Font Awesome](https://fontawesome.com/), [React Icons](https://www.npmjs.com/package/react-icons) | 다양한 아이콘 제공으로 시각적 완성도 향상. |
| **타이핑 인터랙션** | [react-simple-keyboard](https://www.npmjs.com/package/react-simple-keyboard) | 타이핑 결과에서 자주 틀린 키를 가상 키보드로 표시. |
| **오디오** | [howler.js](https://howlerjs.com/) | 배경 음악 재생으로 몰입감 향상. |
| **애니메이션** | [lottie-react](https://www.npmjs.com/package/lottie-react) | progress bar에 고양이 GIF를 추가해 재미를 더함. |
|  | [framer-motion](https://motion.dev/) | 부드러운 컴포넌트 이동 애니메이션 구현. |
| **타이핑 효과** | [react-typed](https://www.npmjs.com/package/react-typed) | 실제 타이핑하는 듯한 애니메이션 효과. |
| **효과** | [JSConfetti](https://www.npmjs.com/package/js-confetti) | 목표 달성 시 컨페티 효과로 사용자에게 성취감을 제공. |
| **3D 효과** | [three.js](https://threejs.org/) | 조명 효과를 추가해 생동감 있는 UI 연출.  |  

&nbsp;


## 설치 및 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm start
```
&nbsp;


## 프로젝트 구조

디렉토리 구조 및 주요 파일

```
/public
	|
	├── audio/background.mp3 #배경음악 관리
	├── typingdatas-en.yaml   #미리 저장되어있는 텍스트 데이터들(영어)
	└── typingdatas-kr.yaml   #미리 저장되어있는 텍스트 데이터들(한글)
/src
	|
	|
  ├── components/       # 재사용 가능한 컴포넌트
  │   ├── homecomps/    # 홈 화면 관련 컴포넌트
  |   |   ├── copytxt.jsx  #직접 텍스트 가져오는 컴포넌트
  |   |   ├── goButton.jsx #copytxt 와 roadtxt의 버튼을 공유하기 위한 컴포넌트
  |   |   ├── home.jsx     #로고 있는 홈화면 메인 컴포넌트
  |   |   ├── listitem.jsx #roadtxt의 아이템 각 요소 관리하는 컴포넌트 
  |   |   ├── responsecomp.jsx #이름 입력하면 호출되는 컴포넌트 
  |   |   └── roadtxt.jsx  # yaml 파일에 적힌 타이핑 데이터 담긴 컴포넌트 
  │   ├── navigation/   # 네비게이션 컴포넌트
  |   |   └── navbar.jsx
  │   ├── ranking/      # 랭킹 관련 컴포넌트
  │   |   ├── CustomModal.jsx # 커스텀 모달
  │   |   ├── InputRow.jsx # 퀴즈 정답 입력칸
  │   |   ├── ModalTitle.jsx # 커스텀 모달 제목
  │   |   ├── MyRanking.jsx # 사용자 자신의 랭킹 표시
  │   |   ├── Quiz.jsx # 퀴즈 로직과 UI
  │   |   ├── QuizComp.jsx # 퀴즈 개별 항목 렌더링
  │   |   ├── RankingModal.jsx # 랭킹 정보 표시
  │   |   ├── SpotLight.jsx # 조명 컴포넌트
  │   |   ├── TopRanking.jsx # 1,2,3위 컴포넌트
  │   |   └── UserList.jsx # 명예의 전당 컴포넌트
  │   ├── result/       # 타이핑 결과 관련 컴포넌트
  │   |   ├── RankButton.jsx # 랭킹 버튼
  │   |   ├── ResultDetail.jsx # 시간,타수,정확도 항목
  │   |   ├── ResultDetailList.jsx # 시간,타수,정확도 항목 리스트
  │   |   ├── TypingKeyword.jsx # 타이핑한 글의 키워드 & 설명
  │   |   ├── TypingKeywordList.jsx # 키워드&설명 리스트
  │   |   ├── TypingResult.jsx # 타이핑 결과 컴포넌트 
  │   |   ├── TypingResultCat.jsx # 타이핑 결과 모달 창의 고양이 캐릭터
  │   |   └── TypingResultKeyboard.jsx # 자주 틀린 키를 키보드에 표시
  │   └── typingcomps/       # 타이핑 관련 컴포넌트
  │       ├── Typingprogress.jsx # 타이핑 진행도 표시
  │       └── Typingtxt.jsx # 키보드 타이핑
  |
  ├── context/
  |   └── username.js # 사용자 이름을 전역 변수로 관리 
  |
  ├── layouts/
  |   └── root-layout.jsx # 애플리케이션 기본 레이아웃 관리
  |
  ├── pages/            # 페이지 단위 컴포넌트
  │   ├── home.jsx      # 홈 페이지
  │   ├── Ranking.jsx   # 랭킹 페이지
  │   └── Result.jsx    # 타이핑 결과 페이지
  │   └── typing.jsx    # 타잎 페이지
  ├── assets/           # 이미지, 폰트 등 정적 파일
  │   ├── images/
  │   └── fonts/
  ├── styles/           # 전역 및 컴포넌트별 스타일 파일
  ├── App.js            # 애플리케이션 진입점
  └── index.js          # ReactDOM 렌더링 포인트

```
&nbsp;


## 홈 화면

![image](https://github.com/user-attachments/assets/ca9064f6-d7d1-4651-8a09-61e1d51093b9)

![image](https://github.com/user-attachments/assets/4a70fef9-345c-448b-bd0e-66275174de68)
&nbsp;

## 타이핑 화면

![image](https://github.com/user-attachments/assets/8b96df60-c083-44a8-a6ed-a9f72e8885a5)
&nbsp;

## 결과 화면

![image](https://github.com/user-attachments/assets/72993afc-0b80-4a78-b0bd-1aba3a8366c9)
&nbsp;

## 순위 & 퀴즈

![image](https://github.com/user-attachments/assets/804a15ee-64bf-442b-9a5a-8f8245fc675d)

![image](https://github.com/user-attachments/assets/1ac421a2-44f4-45b6-ad60-f47380ea6029)

![image](https://github.com/user-attachments/assets/344ec361-35dd-42ec-bd65-19ae970d6104)
&nbsp;

## 기타

배경음악 출처

- 🎵 Music provided by 브금대통령
- 🎵 Track : 호기심 천국 - https://youtu.be/U0iC-ayP2K0

사진 출처

- 고양이 이미지 - https://www.figma.com/community/file/968135477952191207/catch-the-yarn

피그마 

- https://www.figma.com/design/oGdWXrR9qB9BdiE6ai6ntp/Untitled?node-id=0-1&node-type=canvas&t=mcOiSbptPxad3OsK-0