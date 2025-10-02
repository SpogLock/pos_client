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
} from "@chakra-ui/react";
import { FaCreditCard, FaMoneyBillWave, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const PaymentInfo = ({ customer }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("white", "gray.800");

  // Check if payment is overdue
  const isPaymentOverdue = (nextDueDate) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    return dueDate < today;
  };

  // Get days until due or days overdue
  const getPaymentStatus = (nextDueDate) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { status: 'overdue', days: Math.abs(diffDays), color: 'red' };
    } else if (diffDays === 0) {
      return { status: 'due_today', days: 0, color: 'orange' };
    } else if (diffDays <= 7) {
      return { status: 'due_soon', days: diffDays, color: 'yellow' };
    } else {
      return { status: 'paid', days: diffDays, color: 'green' };
    }
  };

  const paymentStatus = getPaymentStatus(customer.nextDueDate);

  return (
    <VStack spacing={6} align="stretch">
      {/* Payment Overview Cards */}
      <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                Monthly Fee
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                {customer.monthlyFee}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {customer.customerPlan} Plan
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                Payment Status
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                <Badge
                  colorScheme={paymentStatus.color}
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {paymentStatus.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </StatNumber>
              <StatHelpText>
                {paymentStatus.days === 0 ? 'Due Today' : 
                 paymentStatus.days === 1 ? '1 day' : 
                 `${paymentStatus.days} days`} {paymentStatus.status === 'overdue' ? 'overdue' : 'remaining'}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                Last Payment
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                {customer.feePaidDate}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {customer.monthlyFee}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" fontWeight="bold">
                Next Due Date
              </StatLabel>
              <StatNumber fontSize="xl" color={textColor} fontWeight="bold">
                {customer.nextDueDate}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                {paymentStatus.days} days {paymentStatus.status === 'overdue' ? 'overdue' : 'remaining'}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Payment History Table */}
      <Card>
        <CardHeader p="12px 5px" mb="12px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Payment History
            </Text>
            <Button
              size="sm"
              colorScheme="teal"
              variant="outline"
              leftIcon={<FaCreditCard />}
            >
              Add Payment
            </Button>
          </Flex>
        </CardHeader>
        <CardBody px="5px">
          <Table variant="simple" color={textColor} size="md">
            <Thead>
              <Tr bg={useColorModeValue("gray.50", "gray.700")} borderBottom="2px solid" borderColor={borderColor}>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Date
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Amount
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Method
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Status
                </Th>
                <Th color="gray.600" fontWeight="semibold" fontSize="sm" textTransform="none">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {customer.paymentHistory.map((payment, index) => (
                <Tr key={index} _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}>
                  <Td>
                    <HStack spacing={2}>
                      <Icon as={FaCalendarAlt} color="teal.500" boxSize={3} />
                      <Text fontSize="sm" color={textColor} fontWeight="bold">
                        {payment.date}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Icon as={FaMoneyBillWave} color="green.500" boxSize={3} />
                      <Text fontSize="sm" color={textColor} fontWeight="bold">
                        {payment.amount}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.500" fontWeight="400">
                      {payment.method}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={payment.status === "Paid" ? "green" : "red"}
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      {payment.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button size="xs" colorScheme="blue" variant="outline">
                        View
                      </Button>
                      <Button size="xs" colorScheme="green" variant="outline">
                        Receipt
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Payment Actions */}
      <Card>
        <CardHeader p="12px 5px" mb="12px">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Payment Actions
          </Text>
        </CardHeader>
        <CardBody px="5px">
          <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <VStack spacing={4} align="stretch">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                Quick Actions
              </Text>
              <Button
                colorScheme="green"
                leftIcon={<FaCheckCircle />}
                size="md"
                isDisabled={!isPaymentOverdue(customer.nextDueDate)}
              >
                Mark as Paid
              </Button>
              <Button
                colorScheme="blue"
                leftIcon={<FaCreditCard />}
                size="md"
              >
                Process Payment
              </Button>
              <Button
                colorScheme="orange"
                leftIcon={<FaExclamationTriangle />}
                size="md"
                variant="outline"
              >
                Send Reminder
              </Button>
            </VStack>

            <VStack spacing={4} align="stretch">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                Payment Methods
              </Text>
              <HStack spacing={2}>
                <Button size="sm" variant="outline" colorScheme="blue">
                  Cash
                </Button>
                <Button size="sm" variant="outline" colorScheme="green">
                  Bank Transfer
                </Button>
                <Button size="sm" variant="outline" colorScheme="purple">
                  Card
                </Button>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                Last payment method: {customer.paymentHistory[0]?.method || "N/A"}
              </Text>
            </VStack>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default PaymentInfo;
