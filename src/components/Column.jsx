import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Column = ({ status, tasks, index }) => {
  return (
    <Flex w="20%" flexDir="column" gap={6}>
      <Text
        fontSize="18px"
        fontWeight="600"
        lineHeight="32px"
      >{`${status} (${tasks.length})`}</Text>

      <Droppable droppableId={index}>
        {(droppableProvided) => (
          <Flex
            flexDir="column"
            gap={3}
            h="100%"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((item, idx) => (
              <Card key={idx} task={item} index={idx} />
            ))}
            {droppableProvided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
