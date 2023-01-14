import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './item';

const List = ({ status, tasks, index }) => {
  return (
    <Flex w="100%" gap={6} flexDir="column">
      <Text>{`${status} (${tasks.length})`}</Text>

      <Droppable droppableId={index}>
        {(droppableProvided) => (
          <Flex
            flexDir="column"
            gap={4}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((item, idx) => (
              <Item key={idx} task={item} index={idx} />
            ))}
            {droppableProvided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default List;
