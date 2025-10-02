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
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  PhoneIcon,
  EmailIcon,
  StarIcon,
  CloseIcon,
  CheckIcon,
  WarningIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import React from "react";

function StockTableRow(props) {
  const { 
    id,
    picture, 
    memberName,
    memberType,
    mobileNo, 
    email, 
    address, 
    registrationDate, 
    membershipStatus, 
    trainerRequired, 
    customerPlan, 
    customerWeight, 
    customerAge,
    monthlyFee,
    nextDueDate,
    onMouseEnter,
    onMouseLeave,
    onClick
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("teal.50", "teal.900");

  // Check if customer fee is overdue
  const isFeeOverdue = (nextDueDate) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    return dueDate < today;
  };

  // Get fee status with days
  const getFeeStatus = (nextDueDate) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { status: 'overdue', days: Math.abs(diffDays), color: 'red', icon: WarningIcon };
    } else if (diffDays === 0) {
      return { status: 'due_today', days: 0, color: 'orange', icon: TimeIcon };
    } else if (diffDays <= 7) {
      return { status: 'due_soon', days: diffDays, color: 'yellow', icon: TimeIcon };
    } else {
      return { status: 'paid', days: diffDays, color: 'green', icon: CheckIcon };
    }
  };

  const feeStatus = getFeeStatus(nextDueDate);



  return (
    <Tr 
      py="8px" 
      cursor="pointer"
      onClick={onClick}
      borderBottom="1px solid"
      borderBottomColor={borderColor}
      _hover={{ 
        bg: useColorModeValue("teal.50", "teal.900"),
        transform: "translateX(4px)",
        boxShadow: "0 4px 12px rgba(56, 178, 172, 0.2)",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _even={{
        bg: useColorModeValue("gray.25", "gray.750")
      }}
    >
      {/* Picture */}
      <Td width="8%" px="12px" textAlign="center">
        <Box
          w="40px"
          h="40px"
          borderRadius="full"
          overflow="hidden"
          border="2px solid"
          borderColor="gray.200"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          cursor="pointer"
          _hover={{
            borderColor: "teal.300",
            transform: "scale(1.1)",
          }}
          transition="all 0.2s ease-in-out"
          mx="auto"
        >
          <Image
            src={picture}
            alt={memberName}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Td>

      {/* Member Name */}
      <Td width="18%" px="12px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {memberName}
        </Text>
      </Td>

      {/* Member Type */}
      <Td width="8%" px="12px" py="12px" textAlign="center">
        <Badge
          colorScheme={memberType === "New" ? "blue" : "purple"}
          variant="subtle"
          px={2}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="semibold"
        >
          {memberType}
        </Badge>
      </Td>

      {/* Mobile No */}
      <Td width="14%" px="12px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="medium">
          {mobileNo}
        </Text>
      </Td>

      {/* Email */}
      <Td width="16%" px="12px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="medium">
          {email}
        </Text>
      </Td>

      {/* Address */}
      <Td width="20%" px="12px" py="12px">
        <Text fontSize="sm" color={textColor} fontWeight="medium">
          {address}
        </Text>
      </Td>


      {/* Membership Status */}
      <Td width="8%" px="12px" py="12px" textAlign="center">
        <Badge
          colorScheme={membershipStatus === "Active" ? "green" : "red"}
          variant="subtle"
          px={2}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="semibold"
        >
          {membershipStatus}
        </Badge>
      </Td>

      {/* Trainer Required */}
      <Td width="8%" px="12px" py="12px" textAlign="center">
        <Text fontSize="sm" color={textColor} fontWeight="medium">
          {trainerRequired}
        </Text>
      </Td>

      {/* Customer Plan */}
      <Td width="10%" px="12px" py="12px" textAlign="center">
        <Badge
          colorScheme={
            customerPlan === "Premium" ? "purple" : 
            customerPlan === "Basic" ? "blue" : "orange"
          }
          variant="subtle"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="xs"
          fontWeight="semibold"
        >
          {customerPlan}
        </Badge>
      </Td>

      {/* Fee Status */}
      <Td width="10%" px="12px" py="12px">
        <HStack spacing={1} justify="center">
          <Icon as={feeStatus.icon} color={`${feeStatus.color}.500`} boxSize={3} />
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color={`${feeStatus.color}.600`} fontWeight="semibold" textTransform="uppercase">
              {feeStatus.status.replace('_', ' ')}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {feeStatus.days === 0 ? 'Today' : feeStatus.days === 1 ? '1 day' : `${feeStatus.days} days`}
            </Text>
          </VStack>
        </HStack>
      </Td>

      {/* Actions */}
      <Td width="8%" px="12px" py="12px" textAlign="center">
        <HStack spacing={1} justify="center">
          <Button
            size="xs"
            colorScheme="blue"
            variant="outline"
            leftIcon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Edit customer:", memberName);
            }}
            _hover={{
              bg: "blue.50",
              borderColor: "blue.300"
            }}
          >
            Edit
          </Button>
          <Button
            size="xs"
            colorScheme="red"
            variant="outline"
            leftIcon={<DeleteIcon />}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete customer:", memberName);
            }}
            _hover={{
              bg: "red.50",
              borderColor: "red.300"
            }}
          >
            Delete
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default StockTableRow;
