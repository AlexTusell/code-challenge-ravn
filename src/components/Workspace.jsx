import {
  Avatar as AvatarChakra,
  Box,
  Button,
  Flex,
  Image,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import MagnifyingGlass from '../img/magnifying glass.svg';
import Bell from '../img/bell.svg';
import Plus from '../img/plus.svg';
import Column from '../img/column.svg';
import List from '../img/list.svg';
import ColumnSelected from '../img/column selected.svg';
import ListSelected from '../img/list selected.svg';
import { useMutation, useQuery } from '@apollo/client';
import Dashboard from './Dashboard';
import { ViewContext } from '../contexts/ViewContext';
import MyTask from './MyTask';
import Avatar from './Avatar';
import TaskModal from './modals/TaskModal';
import Loader from './Loader';
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_PROFILE,
  GET_TASKS,
  UPDATE_TASK,
} from '../util/Queries';
import ConfirmModal from './modals/ConfirmModal';
import { IDContext } from '../contexts/IDContext';
import { columnOrder, reorderColumnList } from '../util/Conversions';

const Workspace = () => {
  const [dataSorted, setDataSorted] = useState(undefined);
  const [updatingBoard, setUpdatingBoard] = useState(false);
  const { isDashboard, setIsDashboard } = useContext(ViewContext);
  const { idDelete, setIdDelete, idUpdate, setIdUpdate } =
    useContext(IDContext);
  const {
    isOpen: isOpenTaskModal,
    onOpen: onOpenTaskModal,
    onClose: onCloseTaskModal,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal,
  } = useDisclosure();

  const {
    loading: loadingTasks,
    error: errorTasks,
    data: dataTasks,
    refetch,
  } = useQuery(GET_TASKS);
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: dataProfile,
  } = useQuery(GET_PROFILE);
  const [
    createTask,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_TASK);
  const [
    updateTask,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_TASK);
  const [
    deleteTask,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_TASK);

  const isLoading = useMemo(
    () => loadingTasks || loadingProfile || !dataSorted,
    [loadingTasks, loadingProfile, dataSorted]
  );

  useEffect(() => {
    if (idDelete) onOpenConfirmModal();
    if (idUpdate) onOpenTaskModal();
  }, [idDelete, idUpdate, onOpenConfirmModal, onOpenTaskModal]);

  const handleCreate = (input) => {
    createTask({
      variables: {
        input: input,
      },
    });
  };
  const handleUpdate = (input) => {
    updateTask({
      variables: {
        input: input,
      },
    });
    setIdUpdate('');
  };

  const handleDelete = () => {
    deleteTask({
      variables: {
        input: { id: idDelete },
      },
    });
    setIdDelete('');
  };

  useEffect(() => {
    if (dataCreate || dataUpdate || dataDelete) {
      refetch();
    }
  }, [dataCreate, dataUpdate, dataDelete, refetch]);

  useEffect(() => {
    if (dataTasks && dataSorted && updatingBoard) {
      setDataSorted([...dataSorted], columnOrder(dataTasks));
      setUpdatingBoard(false);
      return;
    }
    if (dataTasks && dataSorted && (dataCreate || dataUpdate || dataDelete)) {
      setDataSorted(columnOrder(dataTasks));
      return;
    }
    if (dataTasks && !dataSorted) {
      setDataSorted(columnOrder(dataTasks));
    }
  }, [dataTasks]);

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

      handleUpdate({
        id: newColumn[destination.index].id,
        position: destination.index + 1,
      });
      setUpdatingBoard(true);
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

    handleUpdate({
      id: endTasks[destination.index].id,
      status: destinationCol.status,
      position: destination.index + 1,
    });
    setUpdatingBoard(true);
    return;
  };

  return (
    <>
      <TaskModal
        isOpen={isOpenTaskModal}
        onClose={onCloseTaskModal}
        task={
          idUpdate
            ? dataTasks.tasks.find((task) => task.id === idUpdate)
            : undefined
        }
        create={handleCreate}
        update={handleUpdate}
      />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={onCloseConfirmModal}
        confirm={handleDelete}
      />
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
            {isLoading ? (
              <AvatarChakra size="sm" />
            ) : (
              <Avatar image={dataProfile.avatar} />
            )}
          </Flex>
          <Flex justifyContent="space-between" my={8}>
            <Flex gap={3}>
              <Button
                variant={!isDashboard ? 'outline' : 'ghost'}
                onClick={() => setIsDashboard(false)}
              >
                <Image src={!isDashboard ? ListSelected : List} />
              </Button>
              <Button
                variant={isDashboard ? 'outline' : 'ghost'}
                onClick={() => setIsDashboard(true)}
              >
                <Image src={isDashboard ? ColumnSelected : Column} />
              </Button>
            </Flex>
            <Button onClick={onOpenTaskModal}>
              <Image src={Plus} />
            </Button>
          </Flex>
          {isLoading ? (
            <Loader />
          ) : isDashboard ? (
            <Dashboard data={dataSorted} />
          ) : (
            <MyTask data={dataSorted} />
          )}
        </Box>
      </DragDropContext>
    </>
  );
};

export default Workspace;
