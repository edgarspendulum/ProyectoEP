import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Container,
  Heading,
  HStack,
  chakra,
  VStack,
  Textarea,
  Button,
} from "@chakra-ui/react";

import { Rating } from "react-simple-star-rating";

import ShopLayout from "../../../components/layout/ShopLayout";

import ModeColor from "../../../helpers/ModeColor";
import Breakpoints from "../../../helpers/Breakpoints";
import Calculate from "../../../helpers/Calculate";

import {
  checkoutAdd,
  checkoutEdit,
  valueInProduct,
} from "../../../actions/checkout";

const Rate = () => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const router = useRouter();
  // useState
  const [ratingValue, setRatingValue] = useState(0);
  // useState
  const [comentario, setComentario] = useState("");
  // useState
  const [carga, setCarga] = useState([]);

  // mode Color
  const { bg, brand } = ModeColor();
  // Breakpoints
  const { full, bordes } = Breakpoints();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComentario(inputValue);
  };

  const handleRating = (rate) => {
    setRatingValue(Number(rate));
  };

  useEffect(() => {
    if (router.query.word === "Edit") {
      setRatingValue(router.query.ratD);
      setComentario(router.query.com);
    } else {
      setRatingValue(0);
      setComentario("");
    }
  }, [setRatingValue, setComentario, router.query]);

  useEffect(() => {
    const saveRat =
      typeof router.query.rat === "string"
        ? [router.query.rat]
        : router.query.rat;

    if (saveRat !== undefined) {
      setCarga([...saveRat, ratingValue]);
    }
  }, [setCarga, router.query, ratingValue]);

  const tooltipArray = [
    "Terrible",
    "Terrible+",
    "Bad",
    "Bad+",
    "Average",
    "Average+",
    "Great",
    "Great+",
    "Awesome",
    "Awesome+",
  ];

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
  ];

  // usuario del store
  const { uid, displayName, photoURL } = activeSelect;

  // crea una referencia de lista de rat
  const lisRat = carga.map((item) => ({
    rat: Number(item) || 0,
    nam: String(item) || "0",
  }));

  const list =
    lisRat[0]?.rat === 0 && lisRat[0]?.nam === "0"
      ? [{ rat: lisRat[1].rat || 0, nam: lisRat[1].nam || "0" }]
      : lisRat;

  // Calculate product price
  const { listRang, listRang2 } = Calculate(list);
  console.log(router.query.rate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (router.query.word === "Edit") {
      // edit review
      dispatch(
        checkoutEdit({
          // id del mensaje
          id: router.query.idm,
          // id del producto
          idC: router.query.m,
          // raiting
          rat: ratingValue,
          // comentario nuevo
          com: comentario,
          // creado
          cre: Date.now(),
        })
      );
      dispatch(
        valueInProduct({
          id: router.query.m,
          rat: {
            est: listRang2,
            nam: listRang,
          },
        })
      );
      router.push("/");
    } else {
      // add review
      dispatch(
        checkoutAdd({
          // uid Comprador
          uidC: uid,
          // id del producto en venta
          idPV: router.query.rate,
          // cuando fue creado
          cre: Date.now(),
          // photo
          pho: photoURL,
          // nombre del usuario
          nam: displayName,
          // nombre usuario
          rat: ratingValue,
          // comentario
          com: comentario,
          // los que quedan en el proceso
          li: router.query.li,
          // cierre de proceso
          close: router.query.close,
          // uid vendedor
          uidV: router.query.ve,
          // id global
          idGlobal: router.query.glo,
        })
      );

      dispatch(
        valueInProduct({
          id: router.query.rate,
          rat: {
            est: listRang2,
            nam: listRang,
          },
        })
      );

      if (router.query.li === "1") {
        router.push("/");
      } else {
        router.push({
          pathname: "/checkout/[checkout]",
          query: {
            checkout: uid,
          },
        });
      }
    }
  };

  return (
    <ShopLayout>
      <Container maxW={"container.sm"}>
        <HStack my={20}>
          <chakra.form onSubmit={handleSubmit} w={full} border={bordes} p={5}>
            <VStack spacing={10}>
              <Heading
                w={full}
                size={"md"}
                textTransform={"uppercase"}
                fontWeight={"normal"}
              >
                Como calificarias esta compra
              </Heading>
              <Box w={full}>
                <Rating
                  emptyColor="gray"
                  onClick={handleRating}
                  ratingValue={ratingValue}
                  size={50}
                  transition
                  allowHalfIcon
                  showTooltip
                  tooltipArray={tooltipArray}
                  fillColorArray={fillColorArray}
                />
              </Box>
              <Heading
                w={full}
                size={"md"}
                textTransform={"uppercase"}
                fontWeight={"normal"}
              >
                Puedes dejar un comentario
              </Heading>
              <Textarea
                value={comentario}
                onChange={handleInputChange}
                placeholder="Escribe tu comentario"
                size="sm"
                variant="filled"
                bg={bg}
                _focus={brand}
              />
              <Button type={"submit"} variant={"primary"}>
                Enviar
              </Button>
            </VStack>
          </chakra.form>
        </HStack>
      </Container>
    </ShopLayout>
  );
};

export default Rate;