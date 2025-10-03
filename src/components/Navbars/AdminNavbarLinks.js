// Chakra Icons
import { BellIcon, SearchIcon, SettingsIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  Box,
  VStack,
  HStack,
  Select,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import routes from "routes.js";
import { useSearch } from "contexts/SearchContext";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const location = useLocation();
  const { searchQuery, filters, updateSearchQuery, updateFilters, clearFilters, resetSearch } = useSearch();
  const { colorMode, toggleColorMode } = useColorMode();

  // Chakra Color Mode
  let mainTeal = useColorModeValue("#319795", "#319795");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = useColorModeValue("gray.700", "gray.100");
    mainText = useColorModeValue("gray.800", "gray.100");
  }
  const settingsRef = React.useRef();

  // Get current page context for search
  const getCurrentPageContext = () => {
    const path = location.pathname;
    if (path.includes('customer-management')) return 'customers';
    if (path.includes('stock-management')) return 'stock';
    if (path.includes('billing')) return 'billing';
    return 'general';
  };

  const currentContext = getCurrentPageContext();

  // Get search placeholder based on context
  const getSearchPlaceholder = () => {
    switch (currentContext) {
      case 'customers':
        return 'Search customers by name, email, or phone...';
      case 'stock':
        return 'Search products by name or SKU...';
      case 'billing':
        return 'Search invoices or transactions...';
      default:
        return 'Search...';
    }
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  // Get filter count for badge
  const getFilterCount = () => {
    return Object.values(filters).filter(filter => filter !== '').length;
  };
  return (
    <Flex
      pe={{ sm: "0px", md: "0px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      gap="12px"
    >
      <HStack spacing={3} me={{ sm: "auto", md: "20px" }}>
        <InputGroup
          cursor="pointer"
          bg={useColorModeValue("rgba(255, 255, 255, 0.15)", "rgba(26, 32, 44, 0.15)")}
          backdropFilter="blur(30px) saturate(180%)"
          borderRadius="16px"
          border="1px solid"
          borderColor={useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)")}
          boxShadow={useColorModeValue(
            "0px 8px 32px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            "0px 8px 32px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          )}
          w={{
            sm: "200px",
            md: "300px",
          }}
          _focus={{
            borderColor: mainTeal,
            boxShadow: `0 0 0 1px ${mainTeal}, 0px 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
            bg: useColorModeValue("rgba(255, 255, 255, 0.2)", "rgba(26, 32, 44, 0.2)"),
          }}
          _active={{
            borderColor: mainTeal,
          }}
          _hover={{
            bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(26, 32, 44, 0.25)"),
            boxShadow: useColorModeValue(
              "0px 12px 40px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              "0px 12px 40px rgba(0, 0, 0, 0.25), 0px 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            )
          }}
          transition="all 0.3s ease"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "16px",
            background: useColorModeValue(
              "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)"
            ),
            pointerEvents: "none",
            zIndex: -1
          }}
        >
          <InputLeftElement
            children={
              <IconButton
                bg="inherit"
                borderRadius="inherit"
                _hover="none"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
              ></IconButton>
            }
          />
          <Input
            fontSize="xs"
            py="11px"
            color={mainText}
            placeholder={getSearchPlaceholder()}
            borderRadius="inherit"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
        </InputGroup>

      </HStack>
      <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            ) : (
              ""
            )
          }
        >
          <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
        </Button>
      </NavLink>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        color={navbarIcon}
        size="sm"
        borderRadius="16px"
        bg={useColorModeValue("rgba(255, 255, 255, 0.2)", "rgba(26, 32, 44, 0.2)")}
        backdropFilter="blur(30px) saturate(180%)"
        border="1px solid"
        borderColor={useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)")}
        boxShadow={useColorModeValue(
          "0px 8px 24px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          "0px 8px 24px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        )}
        _hover={{ 
          bg: useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(26, 32, 44, 0.3)"),
          transform: "scale(1.08)",
          boxShadow: useColorModeValue(
            "0px 12px 32px rgba(0, 0, 0, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            "0px 12px 32px rgba(0, 0, 0, 0.3), 0px 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
          )
        }}
        transition="all 0.3s ease"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "16px",
          background: useColorModeValue(
            "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)",
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)"
          ),
          pointerEvents: "none",
          zIndex: -1
        }}
      />
      <Menu>
        <MenuButton>
          <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            variant="ghost"
            color={navbarIcon}
            size="sm"
            borderRadius="16px"
            bg={useColorModeValue("rgba(255, 255, 255, 0.2)", "rgba(26, 32, 44, 0.2)")}
            backdropFilter="blur(30px) saturate(180%)"
            border="1px solid"
            borderColor={useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)")}
            boxShadow={useColorModeValue(
              "0px 8px 24px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              "0px 8px 24px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            )}
            _hover={{ 
              bg: useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(26, 32, 44, 0.3)"),
              transform: "scale(1.08)",
              boxShadow: useColorModeValue(
                "0px 12px 32px rgba(0, 0, 0, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                "0px 12px 32px rgba(0, 0, 0, 0.3), 0px 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
              )
            }}
            transition="all 0.3s ease"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "16px",
              background: useColorModeValue(
                "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)",
                "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)"
              ),
              pointerEvents: "none",
              zIndex: -1
            }}
          />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
