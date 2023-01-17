import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import List from './List';

const MyTask = ({ data }) => {
  return (
    <Flex justifyContent="space-between" gap={5} flexDir="column">
      <Flex
        bgColor="gray.400"
        h={14}
        borderRadius="4px"
        fontSize="15px"
        fontWeight="400"
        lineHeight="24px"
        textAlign="left"
      >
        <Flex
          w="20%"
          border="1px"
          alignItems="center"
          pl={5}
          borderWidth={2}
          borderStyle="solid"
          borderColor="gray.300"
          borderRadius="4px 0px 0px 4px "
        >
          <Text># Task Name</Text>
        </Flex>
        <Flex
          w="20%"
          border="1px"
          alignItems="center"
          pl={5}
          borderWidth={2}
          borderStyle="solid"
          borderColor="gray.300"
        >
          <Text>Task tags</Text>
        </Flex>
        <Flex
          w="20%"
          border="1px"
          alignItems="center"
          pl={5}
          borderWidth={2}
          borderStyle="solid"
          borderColor="gray.300"
        >
          <Text>Estimate</Text>
        </Flex>
        <Flex
          w="20%"
          border="1px"
          alignItems="center"
          pl={5}
          borderWidth={2}
          borderStyle="solid"
          borderColor="gray.300"
        >
          <Text>task Assign Name</Text>
        </Flex>
        <Flex
          w="20%"
          border="1px"
          alignItems="center"
          pl={5}
          borderWidth={2}
          borderStyle="solid"
          borderColor="gray.300"
          borderRadius="4px 0px 0px 4px "
        >
          <Text>Due Date</Text>
        </Flex>
      </Flex>
      {data.map((item, idx) => (
        <List
          key={idx}
          status={item.status}
          tasks={item.tasks}
          index={`${idx}`}
        />
      ))}
    </Flex>
  );
};

export default MyTask;
