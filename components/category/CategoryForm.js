import React from "react";

import PropTypes from "prop-types";

import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const CategoryForm = ({
  HStack,
  VStack,
  onClose,
  handleSubmit,
  handleInputChangeEnEs,
  change,
  na,
  es,
  en,
  info,
}) => {
  return (
    <>
      <chakra.form onSubmit={handleSubmit} w="full" p={3}>
        <VStack spacing={7} mb={10}>
          <FormControl>
            <FormLabel htmlFor={change === true ? "en" : "es"}>
              {change === false ? en.name : es.name}
            </FormLabel>
            <Input
              name={change === false ? "en" : "es"}
              id={"na"}
              value={na}
              type={"text"}
              placeholder={change === false ? en.name : es.name}
              onChange={handleInputChangeEnEs}
            />
          </FormControl>
          <HStack w={"full"} justifyContent="flex-end">
            <Button variant={"secondary"} onClick={onClose}>
              {change === false ? en.close : es.close}
            </Button>
            <Button variant={"primary"} type="submit" ml={3}>
              {info}
            </Button>
          </HStack>
        </VStack>
      </chakra.form>
    </>
  );
};

CategoryForm.propTypes = {
  HStack: PropTypes.object.isRequired,
  VStack: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChangeEnEs: PropTypes.func.isRequired,
  change: PropTypes.bool.isRequired,
  na: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
  info: PropTypes.string,
};
