import React, { useState } from 'react';
import { Box, Input, SimpleGrid } from '@chakra-ui/react';

const Quiz = () => {
  const [inputs, setInputs] = useState(Array(5).fill(''));
  const [colors, setColors] = useState(Array(5).fill('gray.800'));

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    if (/^[가-힣]$/.test(value) || value === '') {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    }
  };

  return (
    <SimpleGrid columns={5} spacing={4} m={4}>
      {inputs.map((letter, index) => (
        <Input
          key={index}
          maxLength={1}
          value={letter}
          onChange={(e) => handleChange(e, index)}
          textAlign="center"
          bg={colors[index]}
          color="white"
          fontSize="2xl"
          size="lg"
        />
      ))}
    </SimpleGrid>
  );
};

export default Quiz;