import React from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import {
  CloseButton,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";
import Toast from "../../helpers/Toast";
import Validator from "../../helpers/Validator";

import useForm from "../../hooks/useForm";

import ProductForm from "./ProductForm";

import ProductFormWord from "./ProductFormWord";

import { addProduct, deleteProduct, editProduct } from "../../actions/product";

const initialStates = {
  na: "",
  pr: "",
  ds: "",
  ct: "",
  cn: "",
  dt: "",
  im: "",
};

const ProductData = () => {
  // selector
  const { activeSelect } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { points1, repeat1, points3, bordes } = Breakpoints();

  // useForm
  const [
    values,
    urlImage,
    progress,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
  ] = useForm(initialStates, activeSelect);
  // agrega imagen
  values.im = urlImage ? urlImage : values.im;
  // validar
  const { fiel, estado, ErrorRetur, ErrorRetur2 } = Validator(values);
  // values
  const { na, pr, ds, ct, cn, dt, im, es, id, word } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRetur2) {
      return Toast(estado, "error", 5000);
    }

    if (ErrorRetur) {
      return Toast(fiel, "error", 5000);
    } else {
      word === "Add" &&
        dispatch(addProduct({ na, pr, ds, ct, cn, dt, im, es: true }));
      word === "Edit" &&
        dispatch(editProduct({ na, pr, ds, ct, cn, dt, im, es, id }));
      word === "Delete" && dispatch(deleteProduct(id));
    }

    onClose();
  };
  // cerrar
  const onClose = () => {
    router.back();
  };

  return (
    <>
      <VStack spacing={5} w={"full"} border={bordes} p={3}>
        <HStack w={"full"}>
          <CloseButton size="md" onClick={onClose} />
          <Heading as="h1" size={"md"} textTransform={"uppercase"}>
            {word}
          </Heading>
        </HStack>
        {word === "Details" || word === "Delete" ? (
          <ProductFormWord
            handleSubmit={handleSubmit}
            HStack={HStack}
            dt={dt}
            word={word}
            onClose={onClose}
          />
        ) : (
          <ProductForm
            word={word}
            na={na}
            pr={pr}
            ds={ds}
            ct={ct}
            cn={cn}
            dt={dt}
            progress={progress}
            HStack={HStack}
            repeat1={repeat1}
            points1={points1}
            points3={points3}
            onClose={onClose}
            handleInputChange={handleInputChange}
            handleInputChange2={handleInputChange2}
            handleInputChange3={handleInputChange3}
            handleSubmit={handleSubmit}
          />
        )}
      </VStack>
    </>
  );
};

export default ProductData;
