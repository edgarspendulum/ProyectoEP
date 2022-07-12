import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import ListRoute from "./ListRoute";

import NavLink from "../../../utils/Navlink";

import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  chakra,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { Global } from "../../../helpers/IconNew";

import { logout } from "../../../actions/auth";

import en from "../../../translations/en";
import es from "../../../translations/es";
import LogoutAllClear from "./LogoutAllClear";
import NavbarLocal from "./NavbarLocal";

const MenuNavButton = () => {
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale, locales, asPath } = useRouter();
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // ListRoute
  const { dataRoute } = ListRoute();
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();

  const handleLogout = () => {
    const err = locale === "en" ? en.error : es.error;
    dispatch(logout(err));
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} name={a?.displayName} src={a?.photoURL} />
      </MenuButton>
      <MenuList zIndex={10}>
        <MenuItem as={"div"}>
          <HStack spacing={6}>
            <Heading size={"md"}>{a?.displayName}</Heading>
            <Button
              onClick={toggleColorMode}
              size="xs"
              px={0}
              variant={"secondary"}
            >
              {colorMode === "light" ? (
                <MoonIcon boxSize={6} />
              ) : (
                <SunIcon boxSize={6} />
              )}
            </Button>
          </HStack>
        </MenuItem>
        <MenuDivider />
        {dataRoute.map(({ icon, ref, as, nam, rol }, key) => (
          <MenuItem as={"div"} key={key} display={rol && rol}>
            <NavLink
              leftIcon={icon}
              fontWeight={"normal"}
              variant={"secondary"}
              href={ref}
              as={as}
              name={nam}
            />
          </MenuItem>
        ))}

        <MenuItem as={"div"}>
          <LogoutAllClear />
        </MenuItem>

        <MenuItem as={"div"}>
          <NavbarLocal />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuNavButton;
