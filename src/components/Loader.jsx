import { Flex, Image } from '@chakra-ui/react';
import logo from '../img/logo.svg';

const Loader = () => {
  return (
    <Flex gap={5} h="50%" justifyContent="center" alignItems="center">
      <Image src={logo} className="loader" />
    </Flex>
  );
};

export default Loader;
