import React, { useState } from "react";

import Image from "next/image";

import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import {
  Button,
  Heading,
  HStack,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
  chakra,
  FormLabel,
  Input,
  Textarea,
  GridItem,
  Grid,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import Breakpoints from "../../helpers/Breakpoints";

import { WhatsAppIcon } from "../../helpers/IconNew";

import ModeColor from "../../helpers/ModeColor";

import useFormAll from "../../hooks/useFormAll";

import { validShop } from "../../actions/checkout";

import Toast from "../../helpers/Toast";
import FileAll from "../../utils/FileAll";

const initialStates = {
  nap: "",
  na: "",
  co: "",
  te: "",
  imp: "",
  fer: "",
  cor: "",
  inf: "",
  tip: "",
  ref: "",
};

const CheckVerify = ({
  bordes,
  // id del buy product
  idThree = "",
  // product
  product = {},
}) => {
  // selector
  const { activeSelect: a = "" } = useSelector(({ auth }) => auth);

  const [urlImage, setUrlImage] = useState("");
  // router
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { repeat1, points3, full } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();

  // useForm
  const { values, reset, handleInputChange } = useFormAll(initialStates);
  // agrega imagen
  values.imp = urlImage ? urlImage : values.imp;
  // values
  const { nap, imp, fer, cor, inf, ref, na, co, te } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nap === "" ||
      imp === "" ||
      fer === "" ||
      cor === "" ||
      na === "" ||
      co === "" ||
      te === "" ||
      ref === ""
    ) {
      return Toast("Todos los campos son obligatorios", "error", 5000);
    }

    const shop = {
      nap,
      imp,
      fer,
      cor,
      inf,
      ref,
      na,
      co,
      te,
      // información del producto
      product,
      // uid del comprador que se encuentra logeado
      uidBuy: a.uid.toString(),
      // idThree es id del la compra del producto
      idThree,
    };

    dispatch(validShop(shop));

    Toast("Enviada Verificación", "success", 5000);

    reset();

    router.push({
      pathname: "/checkout/[checkout]",
      query: {
        checkout: a?.uid,
      },
    });
  };

  const closeVerify = () => {
    router.push({
      pathname: "/checkout/[checkout]",
      query: {
        checkout: a?.uid,
      },
    });
  };

  return (
    <>
      <VStack mr={5} w={full} alignContent={"center"} h={"full"} spacing={0}>
        <chakra.form onSubmit={handleSubmit} w={full} p={3} border={bordes}>
          <Grid
            templateColumns={repeat1}
            alignItems={"center"}
            columnGap={points3}
          >
            <GridItem mb={3} colSpan={2}>
              <Heading
                border={bordes}
                p={2}
                size={"xs"}
                textTransform={"uppercase"}
                fontWeight={"normal"}
                mb={5}
              >
                informacion pago para la tienda
              </Heading>
            </GridItem>

            <GridItem mb={3} colSpan={2}>
              <FormLabel htmlFor="imp" textTransform={"uppercase"}>
                Imagen del recibo
              </FormLabel>
              <HStack>
                {/* save file */}
                <FileAll setUrlImage={setUrlImage} fileName={"fotosRecibo"} />
                <Flex w={"20%"} justifyContent={"center"}>
                  {imp && (
                    <AspectRatio
                      border={bordes}
                      ratio={1}
                      w={59}
                      h={59}
                      position={"relative"}
                    >
                      <Image
                        src={imp}
                        alt="Recibo pago"
                        layout="fill"
                        objectFit="contain"
                      />
                    </AspectRatio>
                  )}
                </Flex>
              </HStack>
            </GridItem>
            <GridItem mb={3} colSpan={2}>
              <FormLabel htmlFor="nap" textTransform={"uppercase"}>
                Nombre realizo pago
              </FormLabel>
              <Input
                name="nap"
                id="nap"
                onChange={handleInputChange}
                value={nap}
                type={"text"}
                placeholder="Nombre"
              />
            </GridItem>
            <GridItem mb={3} colSpan={2}>
              <FormLabel htmlFor="ref" textTransform={"uppercase"}>
                Referencia
              </FormLabel>
              <Input
                name="ref"
                id="ref"
                onChange={handleInputChange}
                value={ref}
                type={"text"}
                placeholder="N° Referencia"
              />
            </GridItem>
            <GridItem mb={3} colSpan={2}>
              <FormLabel htmlFor="cor" textTransform={"uppercase"}>
                Correo
              </FormLabel>
              <Input
                name="cor"
                id="cor"
                onChange={handleInputChange}
                value={cor}
                type={"text"}
                placeholder="Correo"
              />
            </GridItem>
            <GridItem mb={3} colSpan={2}>
              <FormLabel htmlFor="fer" textTransform={"uppercase"}>
                Fecha de pago
              </FormLabel>
              <Input
                name="fer"
                id="fer"
                onChange={handleInputChange}
                value={fer}
                type={"date"}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <Heading
                p={2}
                my={5}
                size={"xs"}
                textTransform={"uppercase"}
                fontWeight={"normal"}
                border={bordes}
                w={"full"}
              >
                informacion Personal para el vendedor
              </Heading>
            </GridItem>

            <GridItem colSpan={2}>
              <FormLabel htmlFor="na">Nombre </FormLabel>
              <Input
                name="na"
                id="na"
                onChange={handleInputChange}
                value={na}
                type={"text"}
                placeholder="Nombre"
              />
            </GridItem>

            <GridItem colSpan={2}>
              <FormLabel htmlFor="co">Correo</FormLabel>
              <Input
                name="co"
                id="co"
                onChange={handleInputChange}
                value={co}
                type={"text"}
                placeholder="Nombre"
              />
            </GridItem>

            <GridItem colSpan={2}>
              <FormLabel htmlFor="te">Telefono</FormLabel>
              <Input
                name="te"
                id="te"
                onChange={handleInputChange}
                value={te}
                type={"tel"}
                placeholder="numero de telefono (+569) 99999999"
              />
            </GridItem>
            <GridItem mb={5} colSpan={2}>
              <FormLabel htmlFor="inf" textTransform={"uppercase"}>
                Informacion Adicional
              </FormLabel>
              <Textarea
                bg={bg}
                _focus={brand}
                variant="filled"
                name="inf"
                id="inf"
                value={inf}
                onChange={handleInputChange}
                placeholder="Informacion Adicional"
                size="xs"
              />
            </GridItem>

            <GridItem mb={3} colSpan={2}>
              <HStack w={"full"} justifyContent="flex-end" spacing={10}>
                <Button variant={"secondary"} onClick={closeVerify}>
                  Close
                </Button>
                <Button variant={"primary"} type="submit" ml={3}>
                  Envio del recibo
                </Button>
              </HStack>
            </GridItem>
          </Grid>
        </chakra.form>
      </VStack>

      <VStack w={full} spacing={0}>
        <Heading w={full} mb={5} size={"sm"} border={bordes} p={2}>
          Información de Pago
        </Heading>
        <Stack w={full} mt={5} spacing={2} border={bordes} p={5}>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Nombre: </Text>
            <Text>{product?.na}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Precio: </Text>
            <Text>${product?.pr}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Cantidad: </Text>
            <Text>{product?.cn}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} borderBottom={bordes}>
            <Text fontWeight={"black"}>Pagar a la tienda: </Text>
            <Text>${product?.to}</Text>
          </HStack>
        </Stack>

        <Stack w={full} spacing={3}>
          <Heading mt={5} size={"sm"} border={bordes} p={2}>
            Información de la tienda
          </Heading>
          <HStack w={full} justifyContent={"space-between"}>
            <Heading size={"sm"}>Telefono:</Heading>
            <Text>
              +1 973 510 8452{" "}
              <Link
                href="https://wa.me/19735108452?text=Hola%20Edgar%20Marcano%20voy%20a%20"
                isExternal
              >
                Ir a<WhatsAppIcon mx="2px" />
              </Link>
            </Text>
          </HStack>
          <Stack w={full} spacing={2} border={bordes} p={5}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.700" />
                Transferencia por Zelle
              </ListItem>
            </List>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Heading size={"sm"}>Nombre:</Heading>
              <Text>Edgar Marcano</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Heading size={"sm"}>Correo:</Heading>
              <Text>ehms1975@gmail.com</Text>
            </HStack>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="brand.700" />
                Desde la aplicación móvil
              </ListItem>
            </List>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Heading size={"sm"}>Información:</Heading>
              <Link
                href="https://www.bankofamerica.com/online-banking/mobile-and-online-banking-features/money-transfer/es/#:~:text=Seleccione%20Transferir%20%7C%20Enviar%20y%20despu%C3%A9s,transferencia%20y%20luego%20toque%20Continuar."
                isExternal
              >
                Ir a<ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Heading size={"sm"}>Nombre:</Heading>
              <Text>Edgar Marcano</Text>
            </HStack>
            <HStack justifyContent={"space-between"} borderBottom={bordes}>
              <Heading size={"sm"}>N° Cuenta:</Heading>
              <Text>381053465609</Text>
            </HStack>
          </Stack>
        </Stack>
      </VStack>
    </>
  );
};

export default CheckVerify;