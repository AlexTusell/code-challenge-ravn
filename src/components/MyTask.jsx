import { Flex } from '@chakra-ui/react';
import React from 'react';
import List from './List';

const MyTask = ({ data }) => {
  return (
    <Flex justifyContent="space-between" gap={5} flexDir="column">
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
