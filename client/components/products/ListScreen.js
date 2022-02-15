import React, { useState } from "react";

import Image from "next/image";

import {
  AspectRatio,
  Box,
  Button,
  GridItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";

import NavLink from "../../helpers/Navlink";

import { useModality } from "../../hooks/useModality";

const initialStates = {
  image: "",
  name: "",
  description: "",
};
const ListScreen = (props) => {
  // Modality
  const { modality, setModality } = useModality();
  // almacenar cart
  const [cart, setCart] = useState(initialStates);

  const handleCart = (data) => {
    setCart({
      ...cart,
      image: data.image,
      name: data.nombre,
      description: data.descripcion,
    });
  };
  return (
    <GridItem
      height={"410px"}
      onMouseEnter={() => setModality(true)}
      onMouseLeave={() => setModality(false)}
    >
      <Box width="full" position={"relative"}>
        <VStack
          width="full"
          position={"absolute"}
          spacing={5}
          display={"block"}
          transition={"height .1s ease-out"}
          boxShadow="lg"
          backgroundColor={"Brand.800"}
          rounded="md"
          margin="auto"
          _hover={{
            height: "auto",
            maxHeight: "410px",
            minHeight: "330px",
            zIndex: "2",
            boxShadow: "dark-lg",
          }}
        >
          <AspectRatio ratio={1} w="full" h={224}>
            <Image
              src={`/img/${props.image}.jpg`}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
          <Stat width={"full"} p={3}>
            <StatLabel>{props.nombre}</StatLabel>
            <StatNumber>${props.precio}</StatNumber>
            {modality ? (
              <StatHelpText mt={2}>
                <VStack spacing={3}>
                  <NavLink
                    href={`/products/cart?v=${props.id}`}
                    w={"full"}
                    size={"sm"}
                    variant={"primary"}
                    name={"Agregar Carrito"}
                  />

                  <NavLink
                    href={`/products/details/?v=${props.id}`}
                    border={"solid 1px #00020f"}
                    w={"full"}
                    size={"sm"}
                    variant={"secondary"}
                    name={"Mas Información"}
                  />
                </VStack>
              </StatHelpText>
            ) : (
              ""
            )}
          </Stat>
        </VStack>
      </Box>
    </GridItem>
  );
};
export default ListScreen;
