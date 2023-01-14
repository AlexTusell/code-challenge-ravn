import { Box } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(draggableProvided, dragableSnapshot) => (
        <Box
          w="100%"
          borderRadius="8px"
          bgColor="gray.400"
          boxShadow={dragableSnapshot.isDragging ? 'dark-lg' : 'unset'}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          {task.name}
        </Box>
      )}
    </Draggable>
  );
};

export default Item;
