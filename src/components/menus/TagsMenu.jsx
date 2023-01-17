import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import TagImg from '../../img/tag.svg';

const TagsMenu = ({ value, set, data }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" bgColor="gray.200">
        <Flex gap={2}>
          {!!value.length ? (
            <Text overflow="hidden">{value.join(', ')}</Text>
          ) : (
            <>
              <Image src={TagImg} />
              <Text>Label</Text>
            </>
          )}
        </Flex>
      </MenuButton>
      <MenuList bgColor="gray.300">
        <CheckboxGroup defaultValue={value}>
          <Stack spacing={[1, 5]} dir="column" p={4}>
            {data.__type.enumValues.map((item, idx) => (
              <Checkbox
                key={idx}
                value={item.name}
                onChange={() => set(item.name)}
              >
                {item.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
};

export default TagsMenu;
