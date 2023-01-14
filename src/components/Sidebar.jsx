import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import logo from '../img/logo.svg';

const Sidebar = () => {
  return (
    <Flex
      bgColor="gray.400"
      pos="sticky"
      h="95vh"
      w="232px"
      flexDir="column"
      justifyContent="flex-start"
      gap={16}
      borderRadius="24px"
    >
      <Flex w="100%" justifyContent="center" alignItems="flex-start" mb={4}>
        <Image src={logo} mt={2}></Image>
      </Flex>
      <Flex flexDir="column">
        <Box h="56px">DASHBOARD</Box>
        <Box h="56px">MY TASK</Box>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
