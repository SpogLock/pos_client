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
} from "@chakra-ui/react";
import React from "react";

function StockTableRow(props) {
  const { 
    id,
    picture, 
    memberName, 
    mobileNo, 
    email, 
    address, 
    registrationDate, 
    membershipStatus, 
    trainerRequired, 
    customerPlan, 
    customerWeight, 
    customerAge,
    onMouseEnter,
    onMouseLeave
  } = props;
  const textColor = useColorModeValue("gray.700", "white");



  return (
    <Tr py="12px">
      {/* Picture */}
      <Td width="8%" pl="0px">
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
      <Td width="12%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {memberName}
        </Text>
      </Td>

      {/* Mobile No */}
      <Td width="10%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {mobileNo}
        </Text>
      </Td>

      {/* Email */}
      <Td width="12%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {email}
        </Text>
      </Td>

      {/* Address */}
      <Td width="15%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold" noOfLines={2}>
          {address}
        </Text>
      </Td>

      {/* Registration Date */}
      <Td width="10%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {registrationDate}
        </Text>
      </Td>

      {/* Membership Status */}
      <Td width="10%" px="12px">
        <Badge
          colorScheme={membershipStatus === "Active" ? "green" : "red"}
          variant="subtle"
          px={2}
          py={1}
          borderRadius="full"
          fontSize="xs"
        >
          {membershipStatus}
        </Badge>
      </Td>

      {/* Trainer Required */}
      <Td width="8%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {trainerRequired}
        </Text>
      </Td>

      {/* Customer Plan */}
      <Td width="8%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {customerPlan}
        </Text>
      </Td>

      {/* Customer Weight */}
      <Td width="8%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {customerWeight}
        </Text>
      </Td>

      {/* Customer Age */}
      <Td width="6%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {customerAge}
        </Text>
      </Td>

      {/* Actions */}
      <Td width="6%" px="12px">
        <Button
          size="sm"
          colorScheme="brand"
          variant="outline"
          onClick={() => console.log("Edit customer:", memberName)}
        >
          Edit
        </Button>
      </Td>
    </Tr>
  );
}

export default StockTableRow;
