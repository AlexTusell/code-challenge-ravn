import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './item';

const List = ({ status, tasks, index }) => {
  return (
    <Flex w="100%" flexDir="column">
      <Flex
        bgColor="gray.400"
        gap={2}
        h={14}
        borderRadius="4px"
        alignItems="center"
        pl={5}
        borderWidth={2}
        borderStyle="solid"
        borderColor="gray.300"
      >
        <Text fontSize="18px" fontWeight="600" lineHeight="32px">
          {status}
        </Text>
        <Text
          fontSize="18px"
          fontWeight="600"
          lineHeight="32px"
          color="gray.250"
        >{` (${tasks.length})`}</Text>
      </Flex>

      <Droppable droppableId={index}>
        {(droppableProvided) => (
          <Flex
            flexDir="column"
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
