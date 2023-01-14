const baseButtonStyle = (prop) => {
  return {
    _hover: {
      transform: 'scale(1.03)',
    },
    _active: {
      transform: 'scale(1)',
    },
    _focus: {
      boxShadow: 'none',
    },
  };
};

const buttonStyle = {
  baseStyle: baseButtonStyle,
  variants: {
    solid: {
      borderStyle: 'solid',
      bgColor: 'orange.500',
      _hover: {
        bgColor: 'orange.500',
        opacity: '0.8',
      },
      _active: {
        bgColor: 'orange.500',
        opacity: '1',
      },
    },
    outline: {
      borderStyle: 'outline',
      borderColor: 'orange.500',
      _hover: { bgColor: 'transparent' },
      _active: {
        bgColor: 'transparent',
      },
    },
    ghost: {
      borderStyle: 'ghost',
      _hover: { bgColor: 'transparent' },
      _active: {
        bgColor: 'transparent',
      },
    },
  },
  defaultProps: {
    variant: 'solid',
  },
};

export default buttonStyle;
