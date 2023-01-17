import { useQuery } from '@apollo/client';
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Avatar from '../components/Avatar';
import Loader from '../components/Loader';
import { toastErrorContext } from '../contexts/ToastErrorContext';
import { formatDate } from '../util/Conversions';
import { GET_PROFILE } from '../util/Queries';

const Profile = () => {
  const navigate = useNavigate();
  const { handleError } = useContext(toastErrorContext);
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: dataProfile,
  } = useQuery(GET_PROFILE);

  useEffect(() => {
    if (errorProfile) handleError(errorProfile.message);
  }, [errorProfile, handleError]);

  return (
    <Flex justifyContent="center" mt={20}>
      {loadingProfile ? (
        <Loader />
      ) : (
        <Card p={4} w="500px" bgColor="gray.400" color="white">
          <Stack gap={5}>
            <Flex justifyContent="center" alignItems="center" gap={5}>
              <Heading>Profile</Heading>
              <Avatar image={dataProfile.profile.avatar} />
            </Flex>
            <Grid templateColumns="repeat(2, 1fr)" px={10} gap={4}>
              <Text fontWeight="bold">Full Name:</Text>
              <Text>{dataProfile.profile.fullName}</Text>

              <Text fontWeight="bold">Email:</Text>
              <Text>{dataProfile.profile.email}</Text>

              <Text fontWeight="bold">Type:</Text>
              <Text>{dataProfile.profile.type}</Text>

              <Text fontWeight="bold">Created Date:</Text>
              <Text>{formatDate(dataProfile.profile.createdAt)}</Text>

              <Text fontWeight="bold">Updated Date:</Text>
              <Text>{formatDate(dataProfile.profile.updatedAt)}</Text>
            </Grid>
            <Flex justifyContent="center">
              <Button onClick={() => navigate('/')}>Go Home</Button>
            </Flex>
          </Stack>
        </Card>
      )}
    </Flex>
  );
};

export default Profile;
