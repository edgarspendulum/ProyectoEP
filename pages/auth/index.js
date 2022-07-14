import React from "react";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";

import LoginUser from "../../components/log/loginUser";

import Breakpoints from "../../helpers/Breakpoints";

import es from "../../translations/es";
import en from "../../translations/en";

const Account = () => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);

  // router
  const { locale, push, back } = useRouter();

  const { uid, displayName, email } = activeSelect;

  if (uid || displayName || email !== undefined) {
    push("/");
  }

  // handleReview
  const handleReview = () => {
    push("/auth/review");
  };

  // Breakpoints
  const { calc } = Breakpoints();

  return (
    <Container maxW="container.sm">
      <Flex
        h={calc}
        alignItems={["top", "center"]}
        justifyContent="center"
        py={5}
      >
        <LoginUser
          handleReview={handleReview}
          locale={locale}
          back={back}
          es={es}
          en={en}
        />
      </Flex>
    </Container>
  );
};

export default Account;
