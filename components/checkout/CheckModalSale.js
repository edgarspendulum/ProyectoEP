import React from "react";

import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

const CheckModalSale = ({
  isOpen,
  onOpen,
  onClose,
  initialRef,
  backgroundColor,
  leftIcon,
  variant,
  size,
  border,
  w,
  textTransform,
  disabled,
  nameButton,
  bordes,
  // sale
  sale,
}) => {
  // Breakpoints
  const { full } = Breakpoints();

  return (
    <>
      <Button
        textTransform={textTransform}
        onClick={onOpen}
        backgroundColor={backgroundColor}
        leftIcon={leftIcon}
        variant={variant}
        size={size}
        border={border}
        w={w}
        disabled={disabled}
      >
        {nameButton}
      </Button>
      <Modal
        size={"lg"}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6} mt={10}>
            <Stack w={full} spacing={0}>
              <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
                Información del Vendedor
              </Heading>
              <Stack w={full} mt={5} spacing={5} border={bordes} p={5}>
                <HStack justifyContent={"space-between"} borderBottom={bordes}>
                  <Text fontWeight={"black"}>Nombre: </Text>
                  <Text>{sale?.na}</Text>
                </HStack>
                <HStack justifyContent={"space-between"} borderBottom={bordes}>
                  <Text fontWeight={"black"}>Telefono: </Text>
                  <Text>{sale?.te}</Text>
                </HStack>
                <HStack justifyContent={"space-between"} borderBottom={bordes}>
                  <Text fontWeight={"black"}>Correo: </Text>
                  <Text>{sale?.co}</Text>
                </HStack>
                <HStack justifyContent={"space-between"} borderBottom={bordes}>
                  <Text fontWeight={"black"}>Información adicional: </Text>
                  <Text>{sale?.dt}</Text>
                </HStack>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckModalSale;