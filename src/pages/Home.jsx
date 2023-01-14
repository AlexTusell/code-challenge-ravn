import { Flex } from '@chakra-ui/react';
import React from 'react';
import Workspace from '../components/Workspace';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <Flex mt="2.5vh" px={8} gap={8}>
      <Sidebar />
      <Workspace />
    </Flex>
  );
};

export default Home;
