import React from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import NavLink from "../../../utils/Navlink";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../../helpers/IconNew";

import ListRoute from "../nav/ListRoute";

import en from "../../../translations/en";
import es from "../../../translations/es";
import NavbarLocal from "../nav/NavbarLocal";

const Footer = () => {
  // useRouter
  const { locale } = useRouter();
  // Breakpoints
  const {
    repeat2,
    points3,
    points7,
    points8,
    points11,
    points14,
    content3,
    bordes,
  } = Breakpoints();

  const { dataRoute } = ListRoute();

  return (
    <Container maxW={"full"} px={{ base: 0, sm: 4 }} mt={20} pb={4}>
      <Grid
        templateColumns={repeat2}
        columnGap={points3}
        gridAutoRows={"minmax(50px, auto)"}
        gap={4}
        alignItems={"center"}
        py={3}
        border={bordes}
        boxShadow={"lg"}
      >
        <GridItem colSpan={points8} px={5}>
          <VStack spacing={5}>
            <Box position={"relative"} display={"flex"} alignItems={"center"}>
              <Image
                src={"/img/logo.png"}
                alt="Picture of the author"
                width={150}
                height={110}
                priority={true}
              />
            </Box>
            <Text
              fontSize={"sm"}
              color={"brand.900"}
              textTransform={"capitalize"}
            >
              © {new Date().getFullYear()}{" "}
              {locale === "en" ? en.footer.fA : es.footer.fA}
            </Text>
            <List display="flex" alignItems={"center"}>
              <ListItem mr={3}>
                <Link
                  href="https://www.facebook.com/edgar.marcanosantodomingo"
                  target={"_blank"}
                  rel="noreferrer"
                  isExternal
                >
                  <Button
                    color={"brand.900"}
                    as={"span"}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    <FacebookIcon boxSize={points11} />
                  </Button>
                </Link>
              </ListItem>
              <ListItem mx={3}>
                <Link
                  href="https://www.instagram.com/p/CYcsvrVgEC5/?utm_medium=share_sheet"
                  target={"_blank"}
                  rel="noreferrer"
                  isExternal
                >
                  <Button
                    color={"brand.900"}
                    as={"span"}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    <InstagramIcon boxSize={points11} />
                  </Button>
                </Link>
              </ListItem>
              <ListItem ml={3}>
                <Link
                  href="https://twitter.com/edgarspendulum?t=PmWj-xl1JJ407GU2Lk8wDg&s=09"
                  target={"_blank"}
                  rel="noreferrer"
                  isExternal
                >
                  <Button
                    color={"brand.900"}
                    as={"span"}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    <TwitterIcon boxSize={points11} />
                  </Button>
                </Link>
              </ListItem>
            </List>
          </VStack>
        </GridItem>
        <GridItem colSpan={points7}>
          <Stack
            flexDirection={content3}
            justifyContent="space-evenly"
            alignItems={"center"}
            spacing={0}
          >
            <List px={points14} py={5} w="full" spacing={1}>
              <VStack spacing={5}>
                <Heading
                  w="full"
                  color={"brand.900"}
                  size={"sm"}
                  textTransform={"uppercase"}
                >
                  {locale === "en" ? en.footer.fB : es.footer.fB}
                </Heading>
                <ListItem w="full">
                  <Text color={"brand.900"}>Tel +1 9735108452</Text>
                </ListItem>
                <ListItem w="full">
                  <Text color={"brand.900"}>
                    {" "}
                    {locale === "en" ? en.footer.fC : es.footer.fC}
                  </Text>
                </ListItem>
              </VStack>
            </List>
            <List px={points14} py={5} w="full" spacing={1}>
              {dataRoute.map(({ icon, ref, as, nam, rol }, key) => (
                <ListItem key={key} display={rol && rol}>
                  <NavLink
                    color={"brand.900"}
                    display={"inline"}
                    leftIcon={icon}
                    fontWeight={"normal"}
                    variant={"secondary"}
                    size="sm"
                    href={ref}
                    as={as}
                    name={nam}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        </GridItem>
      </Grid>
      <Box px={{ base: 3, sm: 10 }} backgroundColor={"brand.800"}>
        <NavbarLocal />
      </Box>
    </Container>
  );
};

export default Footer;
