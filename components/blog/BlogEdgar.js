import { useSelector } from "react-redux";

import { Heading, Stack, Text } from "@chakra-ui/react";

const BlogEdgar = () => {
  // useSelector
  const { t } = useSelector(({ translate }) => translate);
  return (
    <Stack pt={20} spacing={10}>
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
        color={"brand.900"}
      >
        Edgars{" "}
        <Text as={"span"} color={"brand.500"}>
          Pendulum
        </Text>
      </Heading>
      <Text
        fontSize={{ base: "md", sm: "lg" }}
        textAlign="justify"
        color={"gray.500"}
        style={{ textIndent: "2em" }}
      >
        {t.blog.bE}
      </Text>
    </Stack>
  );
};

export default BlogEdgar;
