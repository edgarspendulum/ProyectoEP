import { HStack, Tag } from "@chakra-ui/react";

const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag, key) => {
        return (
          <Tag
            key={key}
            size={"md"}
            variant="solid"
            colorScheme="brand"
            color={"brand.900"}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default BlogTags;