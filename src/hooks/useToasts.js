import { useToast } from '@chakra-ui/react';

export function useToasts() {
  const toast = useToast({
    position: 'top',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });

  return toast;
}
