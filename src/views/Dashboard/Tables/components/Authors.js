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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Tooltip,
  Portal,
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
  const [hoveredCustomer, setHoveredCustomer] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  
  // Customer management data
  const [stockData, setStockData] = useState([
    {
      id: 1,
      picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      memberName: "Asim Khan",
      mobileNo: "+92 321 2345678",
      email: "asim@gmail.com",
      address: "House no. 123, Street no. 123, Lahore",
      registrationDate: "2024-01-15",
      membershipStatus: "Active",
      trainerRequired: "Yes",
      customerPlan: "Premium",
      customerWeight: "75 kg",
      customerAge: "28"
    },
    {
      id: 2,
      picture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      memberName: "Fatima Ali",
      mobileNo: "+92 300 1234567",
      email: "fatima@yahoo.com",
      address: "Apartment 45, Block 7, Karachi",
      registrationDate: "2024-01-20",
      membershipStatus: "Active",
      trainerRequired: "No",
      customerPlan: "Basic",
      customerWeight: "65 kg",
      customerAge: "25"
    },
    {
      id: 3,
      picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      memberName: "Ahmed Hassan",
      mobileNo: "+92 333 9876543",
      email: "ahmed@hotmail.com",
      address: "Villa 12, Phase 5, Islamabad",
      registrationDate: "2024-01-18",
      membershipStatus: "Inactive",
      trainerRequired: "Yes",
      customerPlan: "Standard",
      customerWeight: "80 kg",
      customerAge: "32"
    },
    {
      id: 4,
      picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      memberName: "Sara Ahmed",
      mobileNo: "+92 301 4567890",
      email: "sara@gmail.com",
      address: "Flat 8, Building 3, Peshawar",
      registrationDate: "2024-01-22",
      membershipStatus: "Active",
      trainerRequired: "Yes",
      customerPlan: "Premium",
      customerWeight: "60 kg",
      customerAge: "26"
    },
    {
      id: 5,
      picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      memberName: "Usman Sheikh",
      mobileNo: "+92 302 7890123",
      email: "usman@outlook.com",
      address: "House 67, Street 15, Faisalabad",
      registrationDate: "2024-01-12",
      membershipStatus: "Active",
      trainerRequired: "No",
      customerPlan: "Basic",
      customerWeight: "85 kg",
      customerAge: "35"
    },
    {
      id: 6,
      picture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      memberName: "Ayesha Malik",
      mobileNo: "+92 304 3210987",
      email: "ayesha@gmail.com",
      address: "Apartment 23, Block 2, Multan",
      registrationDate: "2024-01-25",
      membershipStatus: "Active",
      trainerRequired: "Yes",
      customerPlan: "Standard",
      customerWeight: "55 kg",
      customerAge: "23"
    }
  ]);

  const handleAddCustomer = (newCustomer) => {
    setStockData(prev => [...prev, newCustomer]);
  };

  // Hover modal handlers
  const handleMouseEnter = (customer, event) => {
    setHoveredCustomer(customer);
    // Get the profile image element position
    const profileImage = event.currentTarget.querySelector('img');
    if (profileImage) {
      const rect = profileImage.getBoundingClientRect();
      setHoverPosition({
        x: rect.right + 10, // Show to the right of the image
        y: rect.top - 10   // Align with top of the image
      });
    } else {
      // Fallback to mouse position if no image found
      setHoverPosition({
        x: event.clientX + 20,
        y: event.clientY - 20
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCustomer(null);
  };

  // Hover Modal Component
  const HoverModal = () => {
    if (!hoveredCustomer) return null;

    return (
      <Portal>
        <Box
          position="fixed"
          top={`${hoverPosition.y}px`}
          left={`${hoverPosition.x}px`}
          zIndex={9999}
          bg={cardBg}
          borderRadius="xl"
          boxShadow="0 10px 25px rgba(0, 0, 0, 0.15)"
          border="1px solid"
          borderColor={borderColor}
          p={6}
          minW="250px"
          transform="scale(0.9)"
          opacity={0}
          animation="fadeInScale 0.2s ease-out forwards"
          _before={{
            content: '""',
            position: "absolute",
            top: "30px",
            left: "-8px",
            width: "0",
            height: "0",
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: `8px solid ${borderColor}`,
          }}
          _after={{
            content: '""',
            position: "absolute",
            top: "30px",
            left: "-7px",
            width: "0",
            height: "0",
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderRight: `7px solid ${cardBg}`,
          }}
        >
          <VStack spacing={4} align="center">
            <Box
              w="120px"
              h="120px"
              borderRadius="full"
              overflow="hidden"
              border="4px solid"
              borderColor="teal.300"
              boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
            >
              <Image
                src={hoveredCustomer.picture}
                alt={hoveredCustomer.memberName}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
            <VStack spacing={2} align="center">
              <Text fontSize="xl" fontWeight="bold" color={cardTextColor} textAlign="center">
                {hoveredCustomer.memberName}
              </Text>
              <Badge
                colorScheme={hoveredCustomer.membershipStatus === "Active" ? "green" : "red"}
                variant="subtle"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="sm"
                fontWeight="semibold"
              >
                {hoveredCustomer.membershipStatus}
              </Badge>
              <Text fontSize="md" color={cardLabelColor} textAlign="center" fontWeight="medium">
                {hoveredCustomer.customerPlan} Plan
              </Text>
              <Text fontSize="sm" color={cardLabelColor} textAlign="center">
                {hoveredCustomer.customerAge} years • {hoveredCustomer.customerWeight}
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Portal>
    );
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
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
      _hover={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s ease-in-out"
    >
      {/* Header with Picture, Name and Status */}
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <HStack spacing={3}>
          <Box
            w="50px"
            h="50px"
            borderRadius="full"
            overflow="hidden"
            border="2px solid"
            borderColor={borderColor}
            onMouseEnter={(e) => handleMouseEnter(customer, e)}
            onMouseLeave={handleMouseLeave}
            cursor="pointer"
            _hover={{
              borderColor: "teal.300",
              transform: "scale(1.1)",
            }}
            transition="all 0.2s ease-in-out"
          >
            <img
              src={customer.picture}
              alt={customer.memberName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </Box>
          <VStack align="start" spacing={1}>
            <Text fontSize="lg" fontWeight="bold" color={cardTextColor}>
              {customer.memberName}
            </Text>
            <Badge
              colorScheme={customer.membershipStatus === "Active" ? "green" : "red"}
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
            >
              {customer.membershipStatus}
            </Badge>
          </VStack>
        </HStack>
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

      {/* Contact Information - Expanded Layout */}
      <VStack align="stretch" spacing={3} mb={4}>
        <HStack spacing={3} align="start">
          <EmailIcon color={cardIconColor} boxSize={4} mt={0.5} />
          <VStack align="start" spacing={0} flex={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Email
            </Text>
            <Text fontSize="sm" color={cardLabelColor} noOfLines={1}>
              {customer.email}
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={3} align="start">
          <PhoneIcon color={cardIconColor} boxSize={4} mt={0.5} />
          <VStack align="start" spacing={0} flex={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Mobile
            </Text>
            <Text fontSize="sm" color={cardLabelColor}>
              {customer.mobileNo}
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={3} align="start">
          <Box color={cardIconColor} fontSize="sm" fontWeight="bold" mt={0.5}>📍</Box>
          <VStack align="start" spacing={1} flex={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Address
            </Text>
            <Text fontSize="xs" color={cardIconColor} noOfLines={2}>
              {customer.address}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <Divider mb={3} />

      {/* Customer Details - Grid Layout for Better Space Usage */}
      <Box>
        <Text fontSize="xs" color={cardIconColor} fontWeight="bold" textTransform="uppercase" mb={3}>
          Customer Details
        </Text>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Registration Date
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={cardTextColor}>
              {customer.registrationDate}
            </Text>
          </VStack>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Customer Plan
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={cardTextColor}>
              {customer.customerPlan}
            </Text>
          </VStack>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Trainer Required
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={cardTextColor}>
              {customer.trainerRequired}
            </Text>
          </VStack>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Age
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={cardTextColor}>
              {customer.customerAge} years
            </Text>
          </VStack>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color={cardIconColor} fontWeight="medium" textTransform="uppercase">
              Weight
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={cardTextColor}>
              {customer.customerWeight}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );

  // Customer management captions
  const stockCaptions = ["Picture", "Member Name", "Mobile No", "Email", "Address", "Registration Date", "Membership Status", "Trainer Required", "Customer Plan", "Customer Weight", "Customer Age", "Actions"];

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
          // Mobile Card View - Expanded and Full Width
          <VStack spacing={4} align="stretch" w="100%">
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
                    key={`${row.memberName}-${index}`}
                    id={row.id}
                    picture={row.picture}
                    memberName={row.memberName}
                    mobileNo={row.mobileNo}
                    email={row.email}
                    address={row.address}
                    registrationDate={row.registrationDate}
                    membershipStatus={row.membershipStatus}
                    trainerRequired={row.trainerRequired}
                    customerPlan={row.customerPlan}
                    customerWeight={row.customerWeight}
                    customerAge={row.customerAge}
                    onMouseEnter={(e) => handleMouseEnter(row, e)}
                    onMouseLeave={handleMouseLeave}
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
      
      {/* Hover Modal */}
      <HoverModal />
      
      {/* CSS Animation */}
      <style jsx global>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Card>
  );
};

export default Authors;
