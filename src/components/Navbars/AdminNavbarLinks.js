// Chakra Icons
import { BellIcon, SearchIcon, SettingsIcon, CloseIcon } from "@chakra-ui/icons";
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

  // Chakra Color Mode
  let mainTeal = useColorModeValue("#319795", "#319795");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
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
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <HStack spacing={2} me={{ sm: "auto", md: "20px" }}>
        <InputGroup
          cursor="pointer"
          bg={inputBg}
          borderRadius="15px"
          w={{
            sm: "128px",
            md: "250px",
          }}
          _focus={{
            borderColor: { mainTeal },
          }}
          _active={{
            borderColor: { mainTeal },
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

        {/* Filter Button */}
        {currentContext === 'customers' && (
          <Popover>
            <PopoverTrigger>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<SettingsIcon />}
                bg={inputBg}
                borderColor={hasActiveFilters ? mainTeal : "gray.200"}
                color={hasActiveFilters ? mainTeal : mainText}
                _hover={{
                  borderColor: mainTeal,
                  color: mainTeal,
                }}
                position="relative"
              >
                Filters
                {hasActiveFilters && (
                  <Badge
                    position="absolute"
                    top="-8px"
                    right="-8px"
                    colorScheme="red"
                    borderRadius="full"
                    fontSize="10px"
                    minW="18px"
                    h="18px"
                  >
                    {getFilterCount()}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent w="300px">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="semibold">Customer Filters</Text>
                  {hasActiveFilters && (
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={clearFilters}
                      leftIcon={<CloseIcon />}
                    >
                      Clear All
                    </Button>
                  )}
                </HStack>
              </PopoverHeader>
              <PopoverBody>
                <VStack spacing={4} align="stretch">
                  {/* Membership Status Filter */}
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Membership Status</Text>
                    <Select
                      size="sm"
                      placeholder="All statuses"
                      value={filters.membershipStatus}
                      onChange={(e) => updateFilters({ membershipStatus: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </Box>

                  <Divider />

                  {/* Customer Plan Filter */}
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Customer Plan</Text>
                    <Select
                      size="sm"
                      placeholder="All plans"
                      value={filters.customerPlan}
                      onChange={(e) => updateFilters({ customerPlan: e.target.value })}
                    >
                      <option value="Premium">Premium</option>
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                    </Select>
                  </Box>

                  <Divider />

                  {/* Fee Status Filter */}
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Fee Status</Text>
                    <VStack spacing={2} align="stretch">
                      <Checkbox
                        size="sm"
                        isChecked={filters.feeStatus === 'overdue'}
                        onChange={(e) => updateFilters({ 
                          feeStatus: e.target.checked ? 'overdue' : '' 
                        })}
                      >
                        Overdue Payments
                      </Checkbox>
                      <Checkbox
                        size="sm"
                        isChecked={filters.feeStatus === 'paid'}
                        onChange={(e) => updateFilters({ 
                          feeStatus: e.target.checked ? 'paid' : '' 
                        })}
                      >
                        Up to Date
                      </Checkbox>
                    </VStack>
                  </Box>

                  <Divider />

                  {/* Trainer Required Filter */}
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Trainer Required</Text>
                    <Select
                      size="sm"
                      placeholder="All customers"
                      value={filters.trainerRequired}
                      onChange={(e) => updateFilters({ trainerRequired: e.target.value })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </Box>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
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
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
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
