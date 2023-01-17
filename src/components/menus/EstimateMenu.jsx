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
import { numbersEstimatedPoints } from '../../util/Conversions';
import EstimateImg from '../../img/estimate.svg';

const EstimateMenu = ({ value, set, data }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" bgColor="gray.200">
        <Flex gap={2} overflow="hidden">
          <Image src={EstimateImg} />
          {value ? `${numbersEstimatedPoints[value]} Points` : 'Estimate'}
        </Flex>
      </MenuButton>
      <MenuList bgColor="gray.300">
        {data ? (
          data.__type.enumValues.map((item, idx) => (
            <MenuItem
              key={idx}
              bgColor="gray.300"
              onClick={() => set(item.name)}
            >
              {`${numbersEstimatedPoints[item.name]} Points`}
            </MenuItem>
          ))
        ) : (
          <Text fontStyle="italic">No Data Found</Text>
        )}
      </MenuList>
    </Menu>
  );
};

export default EstimateMenu;
