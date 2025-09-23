import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  useColorModeValue,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";

const AddCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    package: "",
    discount: "",
    discountProvider: "",
    lastPurchase: "",
    medicinePeriod: "",
  });

  // Glassy background styling matching navbar
  const modalBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const modalBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  const modalShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  const textColor = useColorModeValue("gray.700", "white");
  const labelColor = useColorModeValue("gray.600", "gray.300");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onAddCustomer(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      package: "",
      discount: "",
      discountProvider: "",
      lastPurchase: "",
      medicinePeriod: "",
    });
    onClose();
  };

  const cities = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Faisalabad", "Multan", "Rawalpindi", "Quetta"];
  const packages = ["New Customer", "Diabetic Card", "Senior Citizen", "VIP Customer", "Regular Customer"];
  const medicinePeriods = ["15 days", "20 days", "25 days", "30 days", "45 days", "60 days", "90 days"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.3)" />
      <ModalContent
        bg={modalBg}
        border={modalBorder}
        boxShadow={modalShadow}
        backdropFilter="blur(21px)"
        borderRadius="20px"
        borderWidth="1.5px"
        borderStyle="solid"
        maxW="700px"
        mx="20px"
      >
        <ModalHeader
          color={textColor}
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          pb="4"
        >
          Add New Customer
        </ModalHeader>
        <ModalCloseButton color={textColor} />
        
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {/* Personal Information Section */}
            <Box>
                             <Text fontSize="lg" fontWeight="semibold" color={textColor} mb={3}>
                 Personal Information
               </Text>
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    Full Name
                  </FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    Email Address
                  </FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  />
                </FormControl>
              </HStack>
              
              <HStack spacing={4} mt={4}>
                <FormControl isRequired>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    Phone Number
                  </FormLabel>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+92 XXX XXXXXXX"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    City
                  </FormLabel>
                  <Select
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Select city"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
              
              <FormControl isRequired mt={4}>
                <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                  Complete Address
                </FormLabel>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter complete address"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "brand.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                  }}
                />
              </FormControl>
            </Box>

            <Divider borderColor="gray.200" />

            {/* Package & Discount Information */}
            <Box>
                             <Text fontSize="lg" fontWeight="semibold" color={textColor} mb={3}>
                 Package & Discount Information
               </Text>
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    Package Type
                  </FormLabel>
                  <Select
                    value={formData.package}
                    onChange={(e) => handleInputChange("package", e.target.value)}
                    placeholder="Select package"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  >
                    {packages.map(pkg => (
                      <option key={pkg} value={pkg}>{pkg}</option>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    Discount (%)
                  </FormLabel>
                  <Input
                    value={formData.discount}
                    onChange={(e) => handleInputChange("discount", e.target.value)}
                    placeholder="e.g., 15"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  />
                </FormControl>
              </HStack>
              
              <HStack spacing={4} mt={4}>
                <FormControl>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    Discount Provider
                  </FormLabel>
                  <Input
                    value={formData.discountProvider}
                    onChange={(e) => handleInputChange("discountProvider", e.target.value)}
                    placeholder="Enter provider name"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                    Medicine Period
                  </FormLabel>
                  <Select
                    value={formData.medicinePeriod}
                    onChange={(e) => handleInputChange("medicinePeriod", e.target.value)}
                    placeholder="Select period"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                  >
                    {medicinePeriods.map(period => (
                      <option key={period} value={period}>{period}</option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
              
              <FormControl mt={4}>
                <FormLabel color={labelColor} fontSize="sm" fontWeight="medium">
                  Last Purchase Date
                </FormLabel>
                <Input
                  type="date"
                  value={formData.lastPurchase}
                  onChange={(e) => handleInputChange("lastPurchase", e.target.value)}
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "brand.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                  }}
                />
              </FormControl>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter
          pt={0}
          pb={6}
          px={6}
          justifyContent="center"
          gap={4}
        >
          <Button
            onClick={onClose}
            variant="outline"
            colorScheme="gray"
            borderRadius="12px"
            px={8}
            py={3}
            fontSize="md"
            fontWeight="medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            colorScheme="brand"
            borderRadius="12px"
            px={8}
            py={3}
            fontSize="md"
            fontWeight="medium"
            bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
            color="white"
            _hover={{
              bg: "linear-gradient(81.62deg, #2a2f4f 2.25%, #0f141f 79.87%)",
              color: "white"
            }}
          >
            Add Customer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCustomerModal;
