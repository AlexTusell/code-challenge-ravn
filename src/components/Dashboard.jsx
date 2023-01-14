import { Flex } from '@chakra-ui/react';
import React from 'react';
import Column from './Column';

const Dashboard = ({ data }) => {
  return (
    <Flex justifyContent="space-between" gap={5}>
      {data.map((item, idx) => (
        <Column
          key={idx}
          status={item.status}
          tasks={item.tasks}
          index={`${idx}`}
        />
      ))}
    </Flex>
  );
};

export default Dashboard;
