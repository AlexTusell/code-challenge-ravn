import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import DueDateImg from '../../img/due date.svg';

const css = `
  .selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .today { 
    font-weight: bold;
    font-size: 140%; 
  }
`;

const DueDateMenu = ({ value, set }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" bgColor="gray.200">
        <Flex gap={2}>
          {value ? (
            <Text overflow="hidden">{format(value, 'PP')}</Text>
          ) : (
            <>
              <Image src={DueDateImg} />
              <Text>Due Date</Text>
            </>
          )}
        </Flex>
      </MenuButton>
      <MenuList bgColor="gray.300">
        <style>{css}</style>
        <DayPicker
          modifiersClassNames={{
            selected: 'selected',
            today: 'today',
          }}
          mode="single"
          selected={value}
          onSelect={set}
        />
      </MenuList>
    </Menu>
  );
};

export default DueDateMenu;
