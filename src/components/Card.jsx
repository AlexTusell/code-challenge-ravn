import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { format, isSameDay, isYesterday, isTomorrow } from 'date-fns';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Avatar from './Avatar';

const Card = ({ task, index }) => {
  const formatDate = (date) => {
    const dateNow = new Date();
    const dateParsed = Date.parse(date);

    if (isSameDay(dateParsed, dateNow)) return 'Today';
    if (isTomorrow(dateParsed, dateNow)) return 'Tomorrow';
    if (isYesterday(dateParsed, dateNow)) return 'Yesteday';
    return format(Date.parse(date), 'PP');
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
          <Flex justifyContent="space-between">
            <Text>{task.name}</Text>
            <Text>...</Text>
          </Flex>
          <Box textAlign="right">
            <Text>{formatDate(task.dueDate)}</Text>
          </Box>
          <Flex gap={2}>
            {task.tags.map((tag, idx) => (
              <Text key={idx}>{tag}</Text>
            ))}
          </Flex>
          <Avatar image={task.assignee.avatar} />
        </Stack>
      )}
    </Draggable>
  );
};

export default Card;
