import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  formatDate,
  numbersEstimatedPoints,
  taskTimeIndicator,
} from '../util/Conversions';
import Avatar from './Avatar';
import TagsContainer from './TagsContainer';

const Item = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(draggableProvided, dragableSnapshot) => (
        <Flex
          boxShadow={dragableSnapshot.isDragging ? 'dark-lg' : 'unset'}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
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
            px={5}
            borderWidth={2}
            borderStyle="solid"
            borderColor="gray.300"
            borderRadius="4px 0px 0px 4px "
            overflow="hidden"
          >
            <Text>{task.name}</Text>
          </Flex>
          <Flex
            w="20%"
            border="1px"
            alignItems="center"
            px={5}
            borderWidth={2}
            borderStyle="solid"
            borderColor="gray.300"
          >
            <TagsContainer tags={task.tags} />
          </Flex>
          <Flex
            w="20%"
            border="1px"
            alignItems="center"
            px={5}
            borderWidth={2}
            borderStyle="solid"
            borderColor="gray.300"
          >
            <Text>{`${
              numbersEstimatedPoints[task.pointEstimate]
            } Points`}</Text>
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
            {task.assignee ? (
              <Flex gap={2} alignItems="center">
                <Avatar image={task.assignee.avatar} />
                <Text>{task.assignee.fullName}</Text>
              </Flex>
            ) : (
              <Text fontStyle="italic">Not Assigned</Text>
            )}
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
            {task.dueDate && (
              <Flex
                bgColor={`${taskTimeIndicator(task.dueDate)}.200`}
                color={`${taskTimeIndicator(task.dueDate)}.500`}
                justifyContent="center"
                alignItems="center"
                py={1}
                px={4}
                borderRadius="4px"
              >
                <Text>{formatDate(task.dueDate)}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
};

export default Item;
