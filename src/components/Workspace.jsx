import {
  Avatar as AvatarChakra,
  Box,
  Flex,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import MagnifyingGlass from '../img/magnifying glass.svg';
import Bell from '../img/bell.svg';
import Plus from '../img/plus.svg';
import { gql, useQuery } from '@apollo/client';
import Dashboard from './Dashboard';
import { ViewContext } from '../contexts/ViewContext';
import MyTask from './MyTask';
import Avatar from './Avatar';

const GET_PROFILE = gql`
  query {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;

const GET_TASKS = gql`
  query {
    tasks(input: {}) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTask = Array.from(sourceCol.tasks);
  const [removed] = newTask.splice(startIndex, 1);
  newTask.splice(endIndex, 0, removed);

  return newTask;
};

const Workspace = () => {
  const {
    loading: loadingTasks,
    error: errorTasks,
    data: dataTasks,
  } = useQuery(GET_TASKS);
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: dataProfile,
  } = useQuery(GET_PROFILE);
  const [dataSorted, setDataSorted] = useState([]);

  const { isDashboard } = useContext(ViewContext);

  useEffect(() => {
    if (dataTasks) {
      const backLogColumn = {
        status: 'BACKLOG',
        tasks: dataTasks.tasks.filter((item) => item.status === 'BACKLOG'),
      };
      const cancelledColumn = {
        status: 'CANCELLED',
        tasks: dataTasks.tasks.filter((item) => item.status === 'CANCELLED'),
      };
      const todoColumn = {
        status: 'TODO',
        tasks: dataTasks.tasks.filter((item) => item.status === 'TODO'),
      };
      const inProgressColumn = {
        status: 'IN_PROGRESS',
        tasks: dataTasks.tasks.filter((item) => item.status === 'IN_PROGRESS'),
      };
      const doneColumn = {
        status: 'DONE',
        tasks: dataTasks.tasks.filter((item) => item.status === 'DONE'),
      };
      setDataSorted([
        backLogColumn,
        cancelledColumn,
        todoColumn,
        inProgressColumn,
        doneColumn,
      ]);
    }
  }, [dataTasks, loadingTasks]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    //Rules of Dragging

    //when does'nt have any destination
    if (!destination) return;
    //when the destination and order are the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //when the destination is the same but the order is new
    const sourceCol = dataSorted[source.droppableId];
    const destinationCol = dataSorted[destination.droppableId];
    if (sourceCol.status === destinationCol.status) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newDataSorted = [...dataSorted];
      newDataSorted[source.droppableId].tasks = newColumn;
      setDataSorted(newDataSorted);
      return;
    }
    //when the destination is other STATUS
    const startTasks = Array.from(sourceCol.tasks);
    const [removed] = startTasks.splice(source.index, 1);

    const endTasks = Array.from(destinationCol.tasks);
    endTasks.splice(destination.index, 0, removed);

    const newDataSorted = [...dataSorted];
    newDataSorted[source.droppableId].tasks = startTasks;
    newDataSorted[destination.droppableId].tasks = endTasks;
    setDataSorted(newDataSorted);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box w="100%">
        <Flex
          w="100%"
          h="64px"
          borderRadius="16px"
          bgColor="gray.400"
          alignItems="center"
          justifyContent="space-between"
          gap={5}
          px={5}
        >
          <Image src={MagnifyingGlass} />
          <Input variant="unstyled" placeholder="Search" />
          <Image src={Bell} />
          {loadingProfile ? (
            <AvatarChakra size="sm" />
          ) : (
            <Avatar image={dataProfile.avatar} />
          )}
        </Flex>
        <Flex justifyContent="space-between" my={8}>
          <Flex gap={3}>
            <Box
              w="40px"
              h="40px"
              bgColor="orange.500"
              borderRadius="8px"
            ></Box>
            <Box
              w="40px"
              h="40px"
              bgColor="orange.500"
              borderRadius="8px"
            ></Box>
          </Flex>
          <Flex
            w="40px"
            h="40px"
            bgColor="orange.500"
            borderRadius="8px"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Plus} />
          </Flex>
        </Flex>
        {loadingTasks ? (
          <Text>Loading</Text>
        ) : isDashboard ? (
          <Dashboard data={dataSorted} />
        ) : (
          <MyTask data={dataSorted} />
        )}
      </Box>
    </DragDropContext>
  );
};

export default Workspace;
