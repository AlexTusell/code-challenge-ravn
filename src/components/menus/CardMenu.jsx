import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import EditImg from '../../img/edit.svg';
import DeleteImg from '../../img/delete.svg';
import DotsImg from '../../img/dots.svg';

const CardMenu = ({ updateAction, deleteAction }) => {
  return (
    <Menu placement="bottom-end" size="sm" offset={[0, -5]}>
      <MenuButton as={Button} variant="ghost">
        <Image src={DotsImg} />
      </MenuButton>
      <MenuList bgColor="gray.300" minW="0" w="100%">
        <MenuItem bgColor="gray.300" onClick={() => updateAction()}>
          <Flex gap={2} justifyContent="end">
            <Image src={EditImg} />
            <Text>Edit</Text>
          </Flex>
        </MenuItem>
        <MenuItem bgColor="gray.300" onClick={() => deleteAction()}>
          <Flex gap={2}>
            <Image src={DeleteImg} />
            <Text>Delete</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CardMenu;
