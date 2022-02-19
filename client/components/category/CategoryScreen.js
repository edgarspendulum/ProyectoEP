import React from "react";

import { useRouter } from "next/router";

import {
  ScaleFade,
  Td,
  Text,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import {
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  NotAllowedIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

const CategoryScreen = (props) => {
  // router
  const router = useRouter();
  // disclosure
  const { isOpen, onToggle } = useDisclosure();
  // breakpoints
  const { points18 } = Breakpoints();

  // edit
  const handleEdit = () => {
    router.push({
      pathname: "/category/[pid]",
      query: { pid: props.id, word: "Edit" },
    });
  };

  return (
    <>
      <Tr>
        <Td>
          <Text>{props.nombre}</Text>
        </Td>
        <Td
          position={"relative"}
          onMouseEnter={() => onToggle()}
          onMouseLeave={() => onToggle()}
        >
          <PlusSquareIcon
            w={points18}
            h={points18}
            position={"absolute"}
            top={"35%"}
            left={"40%"}
            opacity={isOpen ? 0 : 1}
            zIndex={isOpen ? 0 : 100}
          />
          <ScaleFade initialScale={0.12} in={isOpen}>
            <VStack opacity={isOpen ? 1 : 0} zIndex={isOpen ? 100 : 0}>
              {isOpen ? (
                <CheckCircleIcon cursor={"pointer"} color={"green.500"} />
              ) : (
                <NotAllowedIcon cursor={"pointer"} color={"red.500"} />
              )}
              <ExternalLinkIcon
                zIndex={isOpen ? 100 : 0}
                cursor={"pointer"}
                color={"blue.500"}
              />
              <EditIcon
                cursor={"pointer"}
                color={"blue.500"}
                onClick={handleEdit}
              />
              <DeleteIcon cursor={"pointer"} color={"red.500"} />
            </VStack>
          </ScaleFade>
        </Td>
      </Tr>
    </>
  );
};

export default CategoryScreen;
