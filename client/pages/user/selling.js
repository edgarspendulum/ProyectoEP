import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import Layout from "../../components/layout/layout";

import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  List,
  VStack,
} from "@chakra-ui/react";

import { Step, Steps, useSteps } from "chakra-ui-steps";

import StepsContent from "../../components/user/StepsContent";

const Selling = () => {
  // router
  const router = useRouter();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // useSteps
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  // StepsContent
  const { stepsData } = StepsContent();

  const [activo, setActivo] = useState(false);

  const [select, setSelect] = useState(false);

  const [form, setForm] = useState(false);

  useEffect(() => {
    const { uid, email, rol } = activeSelect;
    setActivo(uid && email && rol ? false : true);
  }, [setActivo]);

  useEffect(() => {
    stepsData.map(({ flag1, flag2, items }, i) => {
      if (i === 0 && activeStep === 0) {
        setActivo(items);
      } else if (i === 1 && activeStep === 1) {
        setSelect(flag1 || flag2 ? false : true);
      } else if (i === 2 && activeStep === 2) {
        const { create } = router.query;
        setForm(create ? false : true);
      }
    });
  }, [setSelect, stepsData]);

  const handleReset = () => {
    reset();
    router.push("/user/selling");
  };
  const handleList = () => {
    router.push("/user/list");
  };

  return (
    <Layout>
      <Container maxW={"container.sm"} py={20}>
        <VStack w={"full"} spacing={10}>
          <Heading
            w={"full"}
            size={"md"}
            fontWeight={"normal"}
            textTransform={"uppercase"}
          >
            Pasos para poder vender en nuestro sitio
          </Heading>
          <Flex flexDir="column" width="100%">
            <Steps activeStep={activeStep} colorScheme={"brand"}>
              {stepsData.map(({ label, icon, content }, i) => (
                <Step label={label} key={label} icon={icon}>
                  <List spacing={3} w={"full"} my={10}>
                    {content}
                  </List>
                </Step>
              ))}
            </Steps>
            {activeStep === stepsData.length ? (
              <Flex
                px={4}
                py={4}
                alignItems={"center"}
                justifyContent={"center"}
                width="100%"
                flexDirection="column"
              >
                <Heading fontSize="xl" textAlign="center">
                  Congratulations! All steps completed!
                </Heading>
                <HStack spacing={5} py={5}>
                  <Button
                    w={"full"}
                    variant={"primary"}
                    size="sm"
                    onClick={handleReset}
                  >
                    Crear un producto
                  </Button>
                  <Button
                    w={"full"}
                    variant={"primary"}
                    size="sm"
                    onClick={handleList}
                  >
                    Ver productos
                  </Button>
                </HStack>
              </Flex>
            ) : (
              <Flex width="100%" justify="flex-end">
                <Button
                  size="sm"
                  mr={4}
                  variant="secondary"
                  onClick={prevStep}
                  isDisabled={activeStep === 0}
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant={"primary"}
                  onClick={nextStep}
                  isDisabled={activo || select || form}
                >
                  {activeStep === stepsData.length - 1 ? "Finish" : "Next"}
                </Button>
              </Flex>
            )}
          </Flex>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Selling;