// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
  Badge,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
} from "@chakra-ui/react";
import { FaHeartbeat, FaWeight, FaChartLine, FaUserMd, FaDumbbell, FaPlus } from "react-icons/fa";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const HealthRecords = ({ customer }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("white", "gray.800");

  // Calculate BMI category
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "blue" };
    if (bmi < 25) return { category: "Normal", color: "green" };
    if (bmi < 30) return { category: "Overweight", color: "orange" };
    return { category: "Obese", color: "red" };
  };

  // Get latest health record
  const latestRecord = customer.healthRecords[customer.healthRecords.length - 1];
  const bmiCategory = getBMICategory(parseFloat(latestRecord.bmi));

  // Calculate weight change
  const weightChange = customer.healthRecords.length > 1 
    ? parseFloat(latestRecord.weight) - parseFloat(customer.healthRecords[0].weight)
    : 0;

  return (
    <VStack spacing={6} align="stretch">
      {/* Health Overview Cards */}
      <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                Current Weight
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                {latestRecord.weight}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={weightChange < 0 ? "decrease" : "increase"} />
                {Math.abs(weightChange).toFixed(1)} kg change
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                BMI
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                {latestRecord.bmi}
              </StatNumber>
              <StatHelpText>
                <Badge
                  colorScheme={bmiCategory.color}
                  variant="subtle"
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="semibold"
                >
                  {bmiCategory.category}
                </Badge>
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                Age
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                {customer.customerAge} years
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {customer.bloodGroup} blood type
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                Fitness Goals
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                {customer.fitnessGoals}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {customer.trainerRequired === "Yes" ? "With Trainer" : "Self-guided"}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Health Progress Chart */}
      <Card>
        <CardHeader p="12px 5px" mb="12px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Weight Progress
            </Text>
            <Button
              size="sm"
              colorScheme="teal"
              variant="outline"
              leftIcon={<FaPlus />}
            >
              Add Record
            </Button>
          </Flex>
        </CardHeader>
        <CardBody px="5px">
          <VStack spacing={4} align="stretch">
            {customer.healthRecords.map((record, index) => {
              const weight = parseFloat(record.weight);
              const maxWeight = Math.max(...customer.healthRecords.map(r => parseFloat(r.weight)));
              const minWeight = Math.min(...customer.healthRecords.map(r => parseFloat(r.weight)));
              const progress = ((weight - minWeight) / (maxWeight - minWeight)) * 100;
              
              return (
                <Box key={index} p={4} border="1px solid" borderColor={borderColor} borderRadius="md">
                  <HStack justifyContent="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.500" fontWeight="bold">
                      {record.date}
                    </Text>
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      {record.weight}
                    </Text>
                  </HStack>
                  <Progress
                    value={progress}
                    colorScheme="teal"
                    size="sm"
                    borderRadius="full"
                    mb={2}
                  />
                  <HStack justifyContent="space-between">
                    <Text fontSize="xs" color="gray.500">
                      BMI: {record.bmi}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {record.notes}
                    </Text>
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        </CardBody>
      </Card>

      {/* Health Records Table */}
      <Card>
        <CardHeader p="12px 5px" mb="12px">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Health Records History
          </Text>
        </CardHeader>
        <CardBody px="5px">
          <Table variant="simple" color={textColor} size="md">
            <Thead>
              <Tr bg={useColorModeValue("gray.50", "gray.700")} borderBottom="2px solid" borderColor={borderColor}>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Date
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Weight
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  BMI
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Category
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Notes
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {customer.healthRecords.map((record, index) => {
                const bmiCategory = getBMICategory(parseFloat(record.bmi));
                return (
                  <Tr key={index} _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}>
                    <Td>
                      <HStack spacing={2}>
                        <Icon as={FaChartLine} color="teal.500" boxSize={3} />
                        <Text fontSize="sm" color={textColor} fontWeight="bold">
                          {record.date}
                        </Text>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Icon as={FaWeight} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color={textColor} fontWeight="bold">
                          {record.weight}
                        </Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Text fontSize="sm" color={textColor} fontWeight="bold">
                        {record.bmi}
                      </Text>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={bmiCategory.color}
                        variant="subtle"
                        px={2}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {bmiCategory.category}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="sm" color="gray.500" noOfLines={1}>
                        {record.notes}
                      </Text>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button size="xs" colorScheme="blue" variant="outline">
                          Edit
                        </Button>
                        <Button size="xs" colorScheme="green" variant="outline">
                          View
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader p="12px 5px" mb="12px">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Medical Information
          </Text>
        </CardHeader>
        <CardBody px="5px">
          <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <VStack spacing={4} align="stretch">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                Health Details
              </Text>
              <HStack spacing={3} align="center">
                <Icon as={FaHeartbeat} color="red.500" boxSize={4} />
                <Text fontSize="sm" color={textColor} fontWeight="bold" minW="120px">
                  Blood Group:
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="400">
                  {customer.bloodGroup}
                </Text>
              </HStack>
              <HStack spacing={3} align="center">
                <Icon as={FaUserMd} color="blue.500" boxSize={4} />
                <Text fontSize="sm" color={textColor} fontWeight="bold" minW="120px">
                  Medical Conditions:
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="400">
                  {customer.medicalConditions}
                </Text>
              </HStack>
              <HStack spacing={3} align="center">
                <Icon as={FaDumbbell} color="green.500" boxSize={4} />
                <Text fontSize="sm" color={textColor} fontWeight="bold" minW="120px">
                  Fitness Goals:
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="400">
                  {customer.fitnessGoals}
                </Text>
              </HStack>
            </VStack>

            <VStack spacing={4} align="stretch">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                Quick Actions
              </Text>
              <Button
                colorScheme="teal"
                leftIcon={<FaPlus />}
                size="md"
              >
                Add Health Record
              </Button>
              <Button
                colorScheme="blue"
                leftIcon={<FaChartLine />}
                size="md"
                variant="outline"
              >
                Generate Report
              </Button>
              <Button
                colorScheme="green"
                leftIcon={<FaUserMd />}
                size="md"
                variant="outline"
              >
                Schedule Checkup
              </Button>
            </VStack>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default HealthRecords;
