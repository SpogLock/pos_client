// Chakra imports
import { 
  Flex, 
  Icon, 
  Link, 
  Text, 
  useColorModeValue, 
  Badge, 
  VStack, 
  HStack, 
  Divider, 
  Grid,
  Box,
  Avatar,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaDumbbell, 
  FaUserMd,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaStar,
  FaWeight,
  FaHeartbeat
} from "react-icons/fa";

const ProfileInformation = ({
  title,
  description,
  name,
  mobile,
  email,
  location,
  memberType,
  membershipStatus,
  customerPlan,
  trainerRequired,
  emergencyContact,
  bloodGroup,
  medicalConditions,
  fitnessGoals,
  trainerName,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <VStack spacing={6} align="stretch">
      {/* Information Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {/* Contact Information */}
        <Card p="20px" bg={useColorModeValue("white", "gray.800")} borderRadius="xl" boxShadow="md">
          <VStack spacing={4} align="stretch">
            <HStack spacing={3} align="center">
              <Icon as={FaPhone} color="teal.500" boxSize={5} />
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Contact Information
              </Text>
            </HStack>
            <Divider />
            <VStack spacing={3} align="stretch">
              <HStack spacing={3} align="start">
                <Icon as={FaPhone} color="teal.500" boxSize={4} mt={1} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Mobile
                  </Text>
                  <Text fontSize="md" color={textColor} fontWeight="semibold">
              {mobile}
            </Text>
                </VStack>
              </HStack>
              <HStack spacing={3} align="start">
                <Icon as={FaEnvelope} color="teal.500" boxSize={4} mt={1} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Email
            </Text>
                  <Text fontSize="md" color={textColor} fontWeight="semibold">
              {email}
            </Text>
                </VStack>
              </HStack>
              <HStack spacing={3} align="start">
                <Icon as={FaMapMarkerAlt} color="teal.500" boxSize={4} mt={1} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    Address
            </Text>
                  <Text fontSize="md" color={textColor} fontWeight="semibold">
              {location}
            </Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* Membership Details */}
        <Card p="20px" bg={useColorModeValue("white", "gray.800")} borderRadius="xl" boxShadow="md">
          <VStack spacing={4} align="stretch">
            <HStack spacing={3} align="center">
              <Icon as={FaShieldAlt} color="blue.500" boxSize={5} />
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Membership Details
              </Text>
            </HStack>
            <Divider />
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Member Type
                </Text>
                <Badge
                  colorScheme={memberType === "New" ? "blue" : "purple"}
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {memberType}
                </Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Status
                </Text>
                <Badge
                  colorScheme={membershipStatus === "Active" ? "green" : "red"}
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {membershipStatus}
                </Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Plan
                </Text>
                <Badge
                  colorScheme={
                    customerPlan === "Premium" ? "purple" : 
                    customerPlan === "Basic" ? "blue" : "orange"
                  }
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {customerPlan}
                </Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Trainer
                </Text>
                <Text fontSize="sm" color={textColor} fontWeight="semibold">
                  {trainerRequired === "Yes" ? `Yes (${trainerName})` : "No"}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* Health Information */}
        <Card p="20px" bg={useColorModeValue("white", "gray.800")} borderRadius="xl" boxShadow="md">
          <VStack spacing={4} align="stretch">
            <HStack spacing={3} align="center">
              <Icon as={FaHeartbeat} color="red.500" boxSize={5} />
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Health Information
              </Text>
            </HStack>
            <Divider />
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Blood Group
                </Text>
                <Text fontSize="sm" color={textColor} fontWeight="semibold">
                  {bloodGroup}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Medical Conditions
                </Text>
                <Text fontSize="sm" color={textColor} fontWeight="semibold">
                  {medicalConditions}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Fitness Goals
                </Text>
                <Text fontSize="sm" color={textColor} fontWeight="semibold">
                  {fitnessGoals}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Emergency Contact
                </Text>
                <Text fontSize="sm" color={textColor} fontWeight="semibold">
                  {emergencyContact}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </SimpleGrid>

    </VStack>
  );
};

export default ProfileInformation;
