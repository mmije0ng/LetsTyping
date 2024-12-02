import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { SpotLight, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';

const MyLight = ({ vec = new Vector3(), position, color, ...props }) => {
  const light = useRef();
  const { viewport } = useThree(); // viewport를 useThree로 가져옴

  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0),
      0.1
    );
    light.current.target.updateMatrixWorld();
  });

  return (
    <SpotLight
      ref={light}
      penumbra={1}
      distance={15} // 조명의 거리
      angle={0.8} // 각도 조절
      attenuation={3.5} // 빛의 세기가 거리와 함께 얼마나 빠르게 감소할지
      anglePower={5} // 퍼짐
      intensity={10} // 조명의 밝기
      position={position} // 조명의 초기 위치
      color={color}
      {...props}
    />
  );
};

const Light = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100%' }}>

      <ambientLight intensity={0.1} />
      <Suspense fallback={null}>
        {/* 왼쪽 조명 */}
        <MyLight position={[-1.5, 4, 0]} color="#FF80A5" />
        {/* 가운데 조명 */}
        <MyLight position={[0, 4, 0]} color="#A0A3FF" />
        {/* 오른쪽 조명 */}
        <MyLight position={[1.5, 4, 0]} color="#80FFEB" />
      </Suspense>
      <OrbitControls enableZoom={false}/>
    </Canvas>
  );
};

export default Light;