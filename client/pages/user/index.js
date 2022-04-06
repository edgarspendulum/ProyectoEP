import React, { useRef } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  InputGroup,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

import ModeColor from "../../helpers/ModeColor";

import Layout from "../../components/layout/layout";

import useAuth from "../../hooks/useAuth";

import useFormUser from "../../hooks/useFormUser";

import { changeNameImgTel } from "../../actions/auth";

import Breakpoints from "../../helpers/Breakpoints";

const initialStates = {
  uid: "",
  photoURL: "",
  displayName: "",
};

const User = () => {
  // toast
  const toast = useToast();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // useAuth
  const { isloggedIn } = useAuth();
  // dispatch
  const dispatch = useDispatch();
  // mode Color
  const { bg, bg2 } = ModeColor();
  // Breakpoints
  const { content5, points23, porcent3, porcent4 } = Breakpoints();
  // file
  const file = useRef();
  // useForm

  const el = activeSelect;
  // values
  el?.photoURL === null ? (el?.photoURL = "") : el?.photoURL;
  el?.displayName === null ? (el?.displayName = "") : el?.displayName;

  const [
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
  ] = useFormUser(initialStates, activeSelect);
  // agrega imagen
  values.photoURL = urlImage ? urlImage : values.photoURL;
  // values
  const { uid, photoURL, displayName } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeNameImgTel(uid, photoURL, displayName, el.email, el.rol));
    toast({
      description: "Datos actualizados",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Layout>
      {isloggedIn === true && activeSelect?.rol === "owner" ? (
        <Container maxW={"container.xl"} my={10}>
          <VStack>
            <Heading size={"lg"} textAlign="center">
              Perfil público
            </Heading>
            <Heading size={"sm"} fontWeight={"normal"}>
              Información Basica
            </Heading>
          </VStack>
          <Divider
            orientation="horizontal"
            mt={10}
            variant={"dashed"}
            bg={bg2}
          />
          <Stack
            flexDirection={content5}
            boxShadow="2xl"
            justifyContent={"space-around"}
            p={points23}
            spacing={10}
          >
            <VStack spacing={12} h={"full"} w={porcent4}>
              <Box>
                {!photoURL ? (
                  <Avatar size="2xl" name={displayName} />
                ) : (
                  <AspectRatio
                    ratio={16 / 9}
                    w={70}
                    h={70}
                    position={"relative"}
                  >
                    <Image
                      src={photoURL}
                      alt="Perfil"
                      layout="fill"
                      objectFit="contain"
                    />
                  </AspectRatio>
                )}
              </Box>
              <VStack>
                <Heading size={"md"}>Perfil Usuario</Heading>
                <Heading size={"sm"} fontWeight={"normal"}>
                  {displayName}
                </Heading>
              </VStack>
            </VStack>
            <chakra.form w={porcent3} onSubmit={handleSubmit}>
              <VStack spacing={10}>
                <Heading size={"xs"} w={"full"} fontWeight={"normal"}>
                  Información Basica
                </Heading>
                <InputGroup>
                  <Button
                    w={"full"}
                    rightIcon={<DownloadIcon w={6} h={6} />}
                    variant={"outline"}
                    textTransform={"uppercase"}
                    onClick={() => file.current.click()}
                    size="md"
                    fontWeight={"normal"}
                    _hover={{ border: bg }}
                    p={1}
                  >
                    Foto de Perfil : {progress}%
                  </Button>
                  <chakra.input
                    onChange={handleInputChange2}
                    name="photoURL"
                    type={"file"}
                    ref={file}
                    display="none"
                  />
                </InputGroup>

                <Input
                  onChange={handleInputChange}
                  value={displayName}
                  name={"displayName"}
                  placeholder="Escribe tu nombre"
                />
                <Button variant={"primary"} type="submit" ml={3}>
                  Guardar
                </Button>
              </VStack>
            </chakra.form>
          </Stack>
        </Container>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default User;
