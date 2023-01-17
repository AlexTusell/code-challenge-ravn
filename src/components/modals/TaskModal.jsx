import { useQuery } from '@apollo/client';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { IDContext } from '../../contexts/IDContext';
import { toastErrorContext } from '../../contexts/ToastErrorContext';
import {
  GET_POINT_ESTIMATE,
  GET_TASK_TAG,
  GET_USERS,
} from '../../util/Queries';
import AssigneeMenu from '../menus/AssigneeMenu';
import DueDateMenu from '../menus/DueDateMenu';
import EstimateMenu from '../menus/EstimateMenu';
import TagsMenu from '../menus/TagsMenu';

const TaskModal = ({ task, isOpen, onClose, create, update }) => {
  const [name, setName] = useState('');
  const [pointEstimate, setPointEstimate] = useState('');
  const [assignee, setAssignee] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [dueDate, setDueDate] = useState(undefined);

  const { setIdUpdate } = useContext(IDContext);
  const { handleError } = useContext(toastErrorContext);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setPointEstimate(task.pointEstimate);
      setAssignee(task.assignee);
      setTags(task.tags);
      setDueDate(new Date(task.dueDate));
    }
  }, [task]);

  const {
    loading: loadingPoint,
    error: errorPoint,
    data: dataPoint,
  } = useQuery(GET_POINT_ESTIMATE);
  const {
    loading: loadingUsers,
    error: errorUsers,
    data: dataUsers,
  } = useQuery(GET_USERS);
  const {
    loading: loadingTag,
    error: errorTag,
    data: dataTag,
  } = useQuery(GET_TASK_TAG);

  const loadingModal = useMemo(
    () => loadingPoint || loadingUsers || loadingTag,
    [loadingPoint, loadingUsers, loadingTag]
  );

  useEffect(() => {
    if (errorPoint) handleError(errorPoint.message);
    if (errorUsers) handleError(errorUsers.message);
    if (errorTag) handleError(errorTag.message);
  }, [errorPoint, errorUsers, errorTag, handleError]);

  const readyToSend = useMemo(
    () =>
      name &&
      dueDate &&
      pointEstimate &&
      !errorPoint &&
      !errorUsers &&
      !errorTag,
    [name, dueDate, pointEstimate, errorPoint, errorUsers, errorTag]
  );

  const handleCheckBoxChange = (tag) => {
    let newTags = [];
    if (tags.indexOf(tag) === -1) {
      newTags = [...tags, tag];
    } else {
      newTags = tags.filter((item) => item !== tag);
    }
    setTags(newTags);
  };

  const handleClose = () => {
    setName('');
    setPointEstimate('');
    setAssignee(undefined);
    setTags([]);
    setDueDate(undefined);
    setIdUpdate('');
    onClose();
  };

  const handleSubmit = () => {
    const input = {
      name: name,
      dueDate: dueDate,
      pointEstimate: pointEstimate,
      status: 'TODO',
    };
    if (assignee) input.assigneeId = assignee.id;
    if (tags) input.tags = tags;
    if (task) {
      input.id = task.id;
      input.status = task.status;
      update(input);
    } else {
      create(input);
    }
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent bgColor="gray.300">
        <ModalBody>
          {loadingModal ? (
            <Flex justifyContent="center" mt={4}>
              <Spinner />
            </Flex>
          ) : (
            <Stack gap={2} py={4}>
              <Input
                variant="unstyled"
                placeholder="Task Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Flex gap={3} justifyContent="center">
                <EstimateMenu
                  value={pointEstimate}
                  set={setPointEstimate}
                  data={dataPoint}
                />
                <AssigneeMenu
                  value={assignee}
                  set={setAssignee}
                  data={dataUsers}
                />
                <TagsMenu
                  value={tags}
                  set={handleCheckBoxChange}
                  data={dataTag}
                />
                <DueDateMenu value={dueDate} set={setDueDate} />
              </Flex>
            </Stack>
          )}
        </ModalBody>
        <ModalFooter gap={4}>
          <Button onClick={handleClose} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm" isDisabled={!readyToSend} onClick={handleSubmit}>
            {task ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
