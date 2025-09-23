import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function StockTableRow(props) {
  const { name, email, phone, address, city, package: packageType, discount, discountProvider, lastPurchase, medicinePeriod } = props;
  const textColor = useColorModeValue("gray.700", "white");



  return (
    <Tr py="12px">
             <Td width="9%" pl="0px">
         <Flex align="center" py="1rem" minWidth="100%" flexWrap="nowrap">
           <Flex direction="column">
             <Text
               fontSize="sm"
               color={textColor}
               fontWeight="bold"
               minWidth="100%"
             >
               {name}
             </Text>
           </Flex>
         </Flex>
       </Td>

      <Td width="13%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {email}
        </Text>
      </Td>

      <Td width="10%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {phone}
        </Text>
      </Td>

      <Td width="17%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {address}
        </Text>
      </Td>

      <Td width="7%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {city}
        </Text>
      </Td>

      <Td width="11%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {packageType}
        </Text>
      </Td>

      <Td width="7%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {discount}
        </Text>
      </Td>

      <Td width="15%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {discountProvider}
        </Text>
      </Td>

      <Td width="10%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {lastPurchase}
        </Text>
      </Td>

      <Td width="10%" px="12px">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {medicinePeriod}
        </Text>
      </Td>

      <Td width="6%" px="12px">
        <Button
          size="sm"
          colorScheme="brand"
          variant="outline"
          onClick={() => console.log("Edit customer:", name)}
        >
          Edit
        </Button>
      </Td>
    </Tr>
  );
}

export default StockTableRow;
