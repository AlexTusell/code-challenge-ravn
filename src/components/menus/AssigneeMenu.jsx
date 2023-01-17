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
import AssigneeImg from '../../img/assignee.svg';
import Avatar from '../Avatar';

const AssigneeMenu = ({ value, set, data }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" bgColor="gray.200">
        <Flex gap={2}>
          {value ? (
            <Flex gap={2} alignItems="center" overflow="hidden">
              <Avatar image={value.avatar} />
              <Text>{value.fullName}</Text>
            </Flex>
          ) : (
            <>
              <Image src={AssigneeImg} />
              <Text>Assignee</Text>
            </>
          )}
        </Flex>
      </MenuButton>
      <MenuList bgColor="gray.300">
        {data ? (
          data.users.map((item, idx) => (
            <MenuItem key={idx} bgColor="gray.300" onClick={() => set(item)}>
              <Flex gap={2}>
                <Avatar image={item.avatar} />
                <Text>{item.fullName}</Text>
              </Flex>
            </MenuItem>
          ))
        ) : (
          <Text fontStyle="italic">No Data Found</Text>
        )}
      </MenuList>
    </Menu>
  );
};

export default AssigneeMenu;
