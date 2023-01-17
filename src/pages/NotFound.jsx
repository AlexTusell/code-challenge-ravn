import { Box, Button, Card, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Flex justifyContent="center" mt={20}>
      <Card p={4} w="500px" bgColor="gray.400" color="white">
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          gap={10}
        >
          <Text fontWeight="bold">Path Not Found</Text>
          <Box>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
};

export default NotFound;
