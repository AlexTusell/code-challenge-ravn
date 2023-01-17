import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const TagsContainer = ({ tags }) => {
  return (
    <Flex gap={2} wrap="wrap">
      {tags.map((tag, idx) => (
        <Flex
          key={idx}
          bgColor={`${tag}.200`}
          color={`${tag}.500`}
          justifyContent="center"
          alignItems="center"
          py={1}
          px={4}
          borderRadius="4px"
        >
          <Text fontSize="15px" fontWeight="600" lineHeight="24px">
            {tag}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default TagsContainer;
