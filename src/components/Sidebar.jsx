import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ViewContext } from '../contexts/ViewContext';
import logo from '../img/logo.svg';
import Column from '../img/column.svg';
import List from '../img/list.svg';
import ColumnSelected from '../img/column selected.svg';
import ListSelected from '../img/list selected.svg';

const Sidebar = () => {
  const { isDashboard, setIsDashboard } = useContext(ViewContext);
  return (
    <Flex
      bgColor="gray.400"
      pos="sticky"
      h="95vh"
      w="232px"
      flexDir="column"
      gap={16}
      borderRadius="24px"
    >
      <Flex w="232px" justifyContent="center" mb={4}>
        <Image src={logo} mt={3}></Image>
      </Flex>
      <Flex flexDir="column">
        <Flex
          h="56px"
          p={4}
          alignItems="center"
          bgGradient={
            isDashboard
              ? 'linear-gradient(90deg, rgba(186, 37, 37, 0) 0%, rgba(210, 77, 77, 0.1) 100%)'
              : 'none'
          }
          borderRightWidth={isDashboard ? 4 : 0}
          _hover={{ opacity: 1 }}
          borderColor="orange.500"
          color={isDashboard ? 'orange.500' : 'none'}
          opacity={isDashboard ? 1 : 0.5}
          onClick={() => setIsDashboard(true)}
          gap={4}
        >
          <Image src={isDashboard ? ColumnSelected : Column} />
          <Text fontSize="15px" fontWeight="600" lineHeight="24px">
            DASHBOARD
          </Text>
        </Flex>
        <Flex
          h="56px"
          p={4}
          alignItems="center"
          bgGradient={
            !isDashboard
              ? 'linear-gradient(90deg, rgba(186, 37, 37, 0) 0%, rgba(210, 77, 77, 0.1) 100%)'
              : 'none'
          }
          borderRightWidth={!isDashboard ? 4 : 0}
          _hover={{ opacity: 1 }}
          borderColor="orange.500"
          color={!isDashboard ? 'orange.500' : 'none'}
          opacity={!isDashboard ? 1 : 0.5}
          onClick={() => setIsDashboard(false)}
          gap={4}
        >
          <Image src={!isDashboard ? ListSelected : List} />
          <Text fontSize="15px" fontWeight="600" lineHeight="24px">
            MY TASK
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
