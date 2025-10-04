import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Image,
  Box,
  HStack,
  VStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  StarIcon,
  CloseIcon,
  CheckIcon,
  WarningIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import React from "react";

function InventoryTableRow(props) {
  const { 
    id,
    image, 
    productName,
    category,
    stockQuantity, 
    costPrice, 
    sellingPrice, 
    supplier, 
    lastUpdated,
    onMouseEnter,
    onMouseLeave,
    onClick
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("blue.50", "blue.900");

  // Check stock status
  const getStockStatus = (quantity) => {
    if (quantity < 10) {
      return { status: 'low', color: 'red' };
    } else if (quantity <= 30) {
      return { status: 'medium', color: 'yellow' };
    } else {
      return { status: 'high', color: 'green' };
    }
  };

  const stockStatus = getStockStatus(stockQuantity);

  return (
    <Tr 
      py="12px" 
      cursor="pointer"
      onClick={onClick}
      borderBottom="1px solid"
      borderBottomColor={borderColor}
      _hover={{ 
        bg: useColorModeValue("blue.50", "blue.900"),
        transform: "translateX(2px)",
        boxShadow: "0 2px 8px rgba(66, 153, 225, 0.15)",
      }}
      transition="all 0.2s ease-in-out"
      _even={{
        bg: useColorModeValue("gray.25", "gray.750")
      }}
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "4px",
        bg: "transparent",
        transition: "all 0.2s ease-in-out"
      }}
      _hover={{
        _after: {
          bg: "blue.400"
        }
      }}
    >
      {/* Image */}
      <Td width="8%" px="16px" textAlign="center">
        <Box
          w="44px"
          h="44px"
          borderRadius="md"
          overflow="hidden"
          border="2px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          cursor="pointer"
          _hover={{
            borderColor: "blue.400",
            transform: "scale(1.05)",
            boxShadow: "0 4px 12px rgba(66, 153, 225, 0.3)"
          }}
          transition="all 0.2s ease-in-out"
          mx="auto"
        >
          <Image
            src={image}
            alt={productName}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Td>

      {/* Product Name */}
      <Td width="18%" px="16px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="600">
          {productName}
        </Text>
      </Td>

      {/* Category */}
      <Td width="12%" px="16px" py="12px" textAlign="left">
        <Badge
          colorScheme="blue"
          variant="subtle"
          px={3}
          py={1}
          borderRadius="6px"
          fontSize="xs"
          fontWeight="600"
          minW="60px"
          h="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {category}
        </Badge>
      </Td>

      {/* Stock Quantity */}
      <Td width="10%" px="16px" py="12px" textAlign="left">
        <Badge
          colorScheme={stockStatus.color}
          variant="subtle"
          px={3}
          py={1}
          borderRadius="6px"
          fontSize="xs"
          fontWeight="600"
          minW="45px"
          h="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {stockQuantity}
        </Badge>
      </Td>

      {/* Cost Price */}
      <Td width="12%" px="16px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="500">
          PKR {costPrice.toLocaleString()}
        </Text>
      </Td>

      {/* Selling Price */}
      <Td width="12%" px="16px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="500">
          PKR {sellingPrice.toLocaleString()}
        </Text>
      </Td>

      {/* Supplier */}
      <Td width="14%" px="16px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="500">
          {supplier}
        </Text>
      </Td>

      {/* Last Updated */}
      <Td width="12%" px="16px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="500">
          {lastUpdated}
        </Text>
      </Td>

      {/* Actions */}
      <Td width="8%" px="16px" py="12px" textAlign="center">
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Box fontSize="lg" fontWeight="bold">⋮</Box>}
            variant="ghost"
            size="md"
            color="gray.600"
            w="40px"
            h="40px"
            _hover={{
              bg: "gray.100",
              color: "gray.800"
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <MenuList>
            <MenuItem
              icon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                console.log("Edit product:", productName);
              }}
              _hover={{
                bg: "blue.50"
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete product:", productName);
              }}
              _hover={{
                bg: "red.50"
              }}
              color="red.500"
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default InventoryTableRow;
