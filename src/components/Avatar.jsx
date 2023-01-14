import { Image } from '@chakra-ui/react';
import React from 'react';

const Avatar = ({ image }) => {
  return (
    <Image
      src={image || 'https://source.unsplash.com/random'}
      w="32px"
      h="32px"
      borderRadius="99px"
    />
  );
};

export default Avatar;
