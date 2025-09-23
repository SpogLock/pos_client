// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Flex,
  Button,
  useDisclosure,
  Box,
  VStack,
  HStack,
  Badge,
  Divider,
  useBreakpointValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import StockTableRow from "components/Tables/StockTableRow";
import AddCustomerModal from "components/Modals/AddCustomerModal";
import React, { useState } from "react";


const Authors = ({ title, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardTextColor = useColorModeValue("gray.700", "white");
  const cardLabelColor = useColorModeValue("gray.600", "gray.300");
  const cardIconColor = useColorModeValue("gray.500", "gray.400");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Customer management data
  const [stockData, setStockData] = useState([
    {
      name: "Asim",
      email: "asim@gmail.com",
      phone: "+92 321 2345678",
      address: "House no. 123, Street no. 123, City, Country",
      city: "Lahore",
      package: "Diabetic Card",
      discount: "15%",
      discountProvider: "Ahmed Imran Najam",
      lastPurchase: "2024-01-15",
      medicinePeriod: "30 days"
    },
    {
      name: "Fatima",
      email: "fatima@yahoo.com",
      phone: "+92 300 1234567",
      address: "Apartment 45, Block 7, Gulberg III",
      city: "Karachi",
      package: "New Customer",
      discount: "-",
      discountProvider: "-",
      lastPurchase: "2024-01-20",
      medicinePeriod: "15 days"
    },
    {
      name: "Ahmed",
      email: "ahmed@hotmail.com",
      phone: "+92 333 9876543",
      address: "Villa 12, Phase 5, DHA",
      city: "Islamabad",
      package: "New Customer",
      discount: "-",
      discountProvider: "-",
      lastPurchase: "2024-01-18",
      medicinePeriod: "20 days"
    },
    {
      name: "Sara",
      email: "sara@gmail.com",
      phone: "+92 301 4567890",
      address: "Flat 8, Building 3, Gulshan-e-Iqbal",
      city: "Peshawar",
      package: "New Customer",
      discount: "-",
      discountProvider: "-",
      lastPurchase: "2024-01-22",
      medicinePeriod: "25 days"
    },
    {
      name: "Usman",
      email: "usman@outlook.com",
      phone: "+92 302 7890123",
      address: "House 67, Street 15, Model Town",
      city: "Faisalabad",
      package: "Diabetic Card",
      discount: "18%",
      discountProvider: "Ahmed Imran Najam",
      lastPurchase: "2024-01-12",
      medicinePeriod: "30 days"
    },
    {
      name: "Ayesha",
      email: "ayesha@gmail.com",
      phone: "+92 304 3210987",
      address: "Apartment 23, Block 2, Johar Town",
      city: "Multan",
      package: "Diabetic Card",
      discount: "12%",
      discountProvider: "Ahmed Imran Najam",
      lastPurchase: "2024-01-25",
      medicinePeriod: "45 days"
    }
  ]);

  const handleAddCustomer = (newCustomer) => {
    setStockData(prev => [...prev, newCustomer]);
  };

  // Mobile Customer Card Component
  const CustomerCard = ({ customer, index }) => (
    <Box
      bg={cardBg}
      borderRadius="16px"
      border="1px solid"
      borderColor={borderColor}
      p={4}
      mb={4}
      w="100%"
      maxW="400px"
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
      _hover={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s ease-in-out"
    >
      {/* Header with Name and Package */}
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <VStack align="start" spacing={1}>
          <Text fontSize="lg" fontWeight="bold" color={cardTextColor}>
            {customer.name}
          </Text>
          <Badge
            colorScheme={customer.package === "Diabetic Card" ? "green" : "blue"}
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
          >
            {customer.package}
          </Badge>
        </VStack>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<ChevronDownIcon />}
            variant="ghost"
            size="sm"
            color={textColor}
          />
          <MenuList>
            <MenuItem onClick={() => console.log("Edit customer:", customer.name)}>
              Edit Customer
            </MenuItem>
            <MenuItem onClick={() => console.log("View details:", customer.name)}>
              View Details
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Divider mb={3} />

      {/* Contact Information */}
      <VStack align="start" spacing={2} mb={3}>
        <HStack spacing={2}>
          <EmailIcon color={cardIconColor} boxSize={4} />
          <Text fontSize="sm" color={cardLabelColor} noOfLines={1}>
            {customer.email}
          </Text>
        </HStack>
        <HStack spacing={2}>
          <PhoneIcon color={cardIconColor} boxSize={4} />
          <Text fontSize="sm" color={cardLabelColor}>
            {customer.phone}
          </Text>
        </HStack>
        <HStack spacing={2} alignItems="start">
          <Box color={cardIconColor} fontSize="sm" fontWeight="bold">📍</Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" color={cardLabelColor} fontWeight="medium">
              {customer.city}
            </Text>
            <Text fontSize="xs" color={cardIconColor} noOfLines={2}>
              {customer.address}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <Divider mb={3} />

      {/* Package Details */}
      <VStack align="start" spacing={2}>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm" color={cardLabelColor}>
            Discount:
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color={cardTextColor}>
            {customer.discount}
          </Text>
        </HStack>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm" color={cardLabelColor}>
            Provider:
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color={cardTextColor} noOfLines={1}>
            {customer.discountProvider}
          </Text>
        </HStack>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm" color={cardLabelColor}>
            Last Purchase:
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color={cardTextColor}>
            {customer.lastPurchase}
          </Text>
        </HStack>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm" color={cardLabelColor}>
            Medicine Period:
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color={cardTextColor}>
            {customer.medicinePeriod}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );

  // Customer management captions
  const stockCaptions = ["Name", "Email", "Phone", "Address", "City", "Package", "Discount", "Discount Provider", "Last Purchase", "Medicine Period", "Actions"];

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
        <Flex justifyContent="space-between" alignItems="center" width="100%" flexWrap="wrap" gap={2}>
          <Text fontSize='md' color={textColor} fontWeight='bold' flexShrink={0}>
            Customer Management
          </Text>
          <Flex gap="4px" flexShrink={0}>
            <Button
              variant="outline"
              colorScheme="brand"
              size="xs"
              onClick={() => console.log("Import CSV clicked")}
              px={2}
              fontSize="xs"
            >
              Import CSV
            </Button>
            <Button
              colorScheme="brand"
              size="xs"
              onClick={onOpen}
              px={2}
              fontSize="xs"
            >
              Add Customer
            </Button>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {isMobile ? (
          // Mobile Card View
          <VStack spacing={4} align="stretch" maxW="400px" mx="auto">
            {stockData.map((customer, index) => (
              <CustomerCard key={`${customer.name}-${index}`} customer={customer} index={index} />
            ))}
          </VStack>
        ) : (
          // Desktop Table View
          <Table variant='simple' color={textColor}>
            <Thead>
              <Tr my='1rem' pl='0px' color='gray.400' py="16px">
                {stockCaptions.map((caption, idx) => {
                  const widths = ["8%", "12%", "9%", "16%", "6%", "10%", "6%", "15%", "10%", "10%", "6%"];
                  return (
                    <Th color='gray.400' key={idx} width={widths[idx]} ps={idx === 0 ? "0px" : null} px="12px">
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {stockData.map((row, index) => {
                return (
                  <StockTableRow
                    key={`${row.name}-${index}`}
                    name={row.name}
                    email={row.email}
                    phone={row.phone}
                    address={row.address}
                    city={row.city}
                    package={row.package}
                    discount={row.discount}
                    discountProvider={row.discountProvider}
                    lastPurchase={row.lastPurchase}
                    medicinePeriod={row.medicinePeriod}
                  />
                );
              })}
            </Tbody>
          </Table>
        )}
      </CardBody>
      
      <AddCustomerModal
        isOpen={isOpen}
        onClose={onClose}
        onAddCustomer={handleAddCustomer}
      />
    </Card>
  );
};

export default Authors;
