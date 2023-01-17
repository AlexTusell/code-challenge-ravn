import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IDContext } from '../contexts/IDContext';
import {
  formatDate,
  numbersEstimatedPoints,
  taskTimeIndicator,
} from '../util/Conversions';
import Avatar from './Avatar';
import CardMenu from './menus/CardMenu';
import TagsContainer from './TagsContainer';

const Card = ({ task, index }) => {
  const { setIdDelete, setIdUpdate } = useContext(IDContext);

  const handleDelete = () => {
    setIdDelete(task.id);
  };
  const handleUpdate = () => {
    setIdUpdate(task.id);
  };

  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(draggableProvided, dragableSnapshot) => (
        <Stack
          w="100%"
          p={4}
          dir="column"
          gap={2}
          borderRadius="8px"
          bgColor="gray.400"
          boxShadow={dragableSnapshot.isDragging ? 'dark-lg' : 'unset'}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box overflow="hidden">
              <Text fontSize="18px" fontWeight="600" lineHeight="32px">
                {task.name}
              </Text>
            </Box>
            <CardMenu deleteAction={handleDelete} updateAction={handleUpdate} />
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontSize="15px" fontWeight="600" lineHeight="24px">{`${
              numbersEstimatedPoints[task.pointEstimate]
            } Points`}</Text>
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
                <Text fontSize="15px" fontWeight="600" lineHeight="24px">
                  {formatDate(task.dueDate)}
                </Text>
              </Flex>
            )}
          </Flex>
          <TagsContainer tags={task.tags} />
          {task.assignee ? (
            <Avatar image={task.assignee.avatar} />
          ) : (
            <Text fontStyle="italic">Not Assigned</Text>
          )}
        </Stack>
      )}
    </Draggable>
  );
};

export default Card;
