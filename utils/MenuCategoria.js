import React from "react";

import { useRouter } from "next/router";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";

import { NavLink } from "../utils/Navlink";

import { useSelector } from "react-redux";

import { Breakpoints } from "../helpers/Breakpoints";

import { CategoryAll } from "../helpers/IconNew";

import { en } from "../translations/en";
import { es } from "../translations/es";

export const MenuCategoria = () => {
  // useRouter
  const { locale, push } = useRouter();
  // Breakpoints
  const { displayOff2, bordes } = Breakpoints();
  // selector
  const { listData = [] } = useSelector(({ listca }) => listca);

  if(!listData[0]) {
    push("/")
  }
  
  return (
    <Menu>
      <MenuButton
        size={"sm"}
        leftIcon={<CategoryAll />}
        variant={"primary"}
        as={Button}
        textTransform={"uppercase"}
        minWidth={"fit-content"}
      >
        {locale === "en" ? en.categories : es.categories}
      </MenuButton>
      <Portal>
        <MenuList display={displayOff2} minWidth={0} border={bordes}>
          {listData.map(({ na, id }) => (
            <MenuItem key={id}>
              <NavLink
                href={{
                  pathname: "/search",
                  query: { n: id, c: locale === "en" ? na.en : na.es },
                }}
                name={locale === "en" ? na.en : na.es}
                variant={"secondary"}
                fontWeight={"normal"}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};
