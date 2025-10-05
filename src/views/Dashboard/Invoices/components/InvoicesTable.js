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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon, ViewIcon, DownloadIcon, EmailIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import InvoicesTableRow from "./InvoicesTableRow";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const InvoicesTable = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardLabelColor = useColorModeValue("gray.600", "gray.300");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const history = useHistory();
  const toast = useToast();

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Sample invoices data
  const sampleInvoices = [
    {
      id: "INV-1704067200000",
      date: "2024-01-01",
      customer: { name: "Alex Martinez", phone: "+92 321 2345678", email: "alex@gmail.com" },
      total: 22500,
      paymentType: "Card",
      status: "Paid",
      items: [
        { productName: "Optimum Nutrition Gold Standard Whey", quantity: 3, price: 7500, total: 22500 }
      ],
      subtotal: 22500,
      discount: 0,
      tax: 3375,
      notes: "Card payment processed successfully"
    },
    {
      id: "INV-1703980800000",
      date: "2024-01-02",
      customer: { name: "Sarah Johnson", phone: "+92 300 1234567", email: "sarah@gmail.com" },
      total: 17000,
      paymentType: "Cash",
      status: "Paid",
      items: [
        { productName: "Dymatize ISO100 Whey Protein", quantity: 2, price: 8500, total: 17000 }
      ],
      subtotal: 17000,
      discount: 0,
      tax: 2550,
      notes: "Cash payment received"
    },
    {
      id: "INV-1703894400000",
      date: "2024-01-03",
      customer: { name: "Mike Chen", phone: "+92 333 9876543", email: "mike@gmail.com" },
      total: 9600,
      paymentType: "Card",
      status: "Paid",
      items: [
        { productName: "MuscleTech Creatine Monohydrate", quantity: 3, price: 3200, total: 9600 }
      ],
      subtotal: 9600,
      discount: 0,
      tax: 1440,
      notes: "Online payment"
    },
    {
      id: "INV-1703808000000",
      date: "2024-01-04",
      customer: { name: "Guest", phone: "", email: "" },
      total: 11000,
      paymentType: "Cash",
      status: "Paid",
      items: [
        { productName: "BSN N.O.-XPLODE Pre-Workout", quantity: 2, price: 5500, total: 11000 }
      ],
      subtotal: 11000,
      discount: 0,
      tax: 1650,
      notes: "Walk-in customer"
    },
    {
      id: "INV-1703721600000",
      date: "2024-01-05",
      customer: { name: "Emma Davis", phone: "+92 301 4567890", email: "emma@gmail.com" },
      total: 14400,
      paymentType: "Other",
      status: "Pending",
      items: [
        { productName: "Universal Animal Pak Multivitamin", quantity: 3, price: 4800, total: 14400 }
      ],
      subtotal: 14400,
      discount: 0,
      tax: 2160,
      notes: "Pending bank transfer"
    }
  ];

  // Filter invoices based on search and filters
  const getFilteredInvoices = () => {
    return sampleInvoices.filter(invoice => {
      const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || invoice.status === statusFilter;
      const matchesPayment = !paymentFilter || invoice.paymentType === paymentFilter;
      const matchesDate = !dateFilter || invoice.date.includes(dateFilter);
      
      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  };

  const handleInvoiceClick = (invoice) => {
    history.push(`/admin/invoice-detail?invoiceId=${invoice.id}`);
  };

  const handlePrintInvoice = (invoice) => {
    toast({
      title: "Print Invoice",
      description: `Printing invoice ${invoice.id}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEmailInvoice = (invoice) => {
    if (invoice.customer.email) {
      toast({
        title: "Email Sent",
        description: `Invoice ${invoice.id} sent to ${invoice.customer.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No Email Address",
        description: "Customer email not available",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteInvoice = (invoice) => {
    toast({
      title: "Invoice Deleted",
      description: `Invoice ${invoice.id} has been deleted`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          Invoices & Orders
        </Text>
      </Flex>

      <Card borderRadius="xl">
        <CardHeader>
          <VStack spacing={4} align="stretch">
            {/* Search and Filters */}
            <Flex direction={{ base: "column", md: "row" }} gap={3}>
              <InputGroup flex="1">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search by invoice ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  border="none"
                  borderRadius="lg"
                />
              </InputGroup>
              
              <Select
                placeholder="All Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                bg={useColorModeValue("gray.50", "gray.700")}
                border="none"
                borderRadius="lg"
                w={{ base: "full", md: "150px" }}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
              </Select>
              
              <Select
                placeholder="Payment Type"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                bg={useColorModeValue("gray.50", "gray.700")}
                border="none"
                borderRadius="lg"
                w={{ base: "full", md: "150px" }}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Other">Other</option>
              </Select>
              
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                bg={useColorModeValue("gray.50", "gray.700")}
                border="none"
                borderRadius="lg"
                w={{ base: "full", md: "150px" }}
              />
            </Flex>
          </VStack>
        </CardHeader>
        
        <CardBody pt={0}>
          {isMobile ? (
            // Mobile Card View
            <VStack spacing={4} align="stretch">
              {getFilteredInvoices().map((invoice, index) => (
                <Box
                  key={`${invoice.id}-${index}`}
                  bg={cardBg}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  p={4}
                  w="100%"
                  boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
                  cursor="pointer"
                  onClick={() => handleInvoiceClick(invoice)}
                  transition="all 0.2s ease"
                  _hover={{
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                  }}
                >
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="bold" color={textColor}>
                          {invoice.id}
                        </Text>
                        <Text fontSize="xs" color={cardLabelColor}>
                          {invoice.date}
                        </Text>
                      </VStack>
                      <Badge
                        colorScheme={
                          invoice.status === "Paid" ? "green" : 
                          invoice.status === "Pending" ? "yellow" : "red"
                        }
                        variant="subtle"
                        fontSize="xs"
                      >
                        {invoice.status}
                      </Badge>
                    </HStack>
                    
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                        {invoice.customer.name}
                      </Text>
                      <Text fontSize="xs" color={cardLabelColor}>
                        {invoice.paymentType} • PKR {invoice.total.toLocaleString()}
                      </Text>
                    </VStack>
                    
                    <HStack justify="space-between">
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<ViewIcon />}
                          variant="ghost"
                          size="xs"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <MenuList>
                          <MenuItem
                            icon={<ViewIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInvoiceClick(invoice);
                            }}
                          >
                            View Details
                          </MenuItem>
                          <MenuItem
                            icon={<DownloadIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrintInvoice(invoice);
                            }}
                          >
                            Print
                          </MenuItem>
                          {invoice.customer.email && (
                            <MenuItem
                              icon={<EmailIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmailInvoice(invoice);
                              }}
                            >
                              Email
                            </MenuItem>
                          )}
                          <MenuItem
                            icon={<DeleteIcon />}
                            color="red.500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteInvoice(invoice);
                            }}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          ) : isTablet ? (
            // Tablet Card View - More Details
            <VStack spacing={4} align="stretch">
              {getFilteredInvoices().map((invoice, index) => (
                <Box
                  key={`${invoice.id}-${index}`}
                  bg={cardBg}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  p={4}
                  w="100%"
                  boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
                  cursor="pointer"
                  onClick={() => handleInvoiceClick(invoice)}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  position="relative"
                  _hover={{
                    boxShadow: "0px 8px 25px rgba(56, 178, 172, 0.25)",
                    transform: "translateY(-4px) scale(1.02)",
                    borderColor: "teal.300",
                    bg: useColorModeValue("teal.50", "teal.900"),
                  }}
                >
                  <Flex justify="space-between" alignItems="center">
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Text fontSize="md" fontWeight="bold" color={textColor}>
                          {invoice.id}
                        </Text>
                        <Badge
                          colorScheme={
                            invoice.status === "Paid" ? "green" : 
                            invoice.status === "Pending" ? "yellow" : "red"
                          }
                          variant="subtle"
                          fontSize="xs"
                        >
                          {invoice.status}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color={cardLabelColor}>
                        {invoice.date}
                      </Text>
                    </VStack>
                    
                    <VStack align="end" spacing={1}>
                      <Text fontSize="lg" fontWeight="bold" color="teal.500">
                        PKR {invoice.total.toLocaleString()}
                      </Text>
                      <Text fontSize="sm" color={cardLabelColor}>
                        {invoice.paymentType}
                      </Text>
                    </VStack>
                  </Flex>
                  
                  <Divider my={3} />
                  
                  <Flex justify="space-between" alignItems="center">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                        {invoice.customer.name}
                      </Text>
                      {invoice.customer.phone && (
                        <Text fontSize="xs" color={cardLabelColor}>
                          {invoice.customer.phone}
                        </Text>
                      )}
                    </VStack>
                    
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<ViewIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <MenuList>
                        <MenuItem
                          icon={<ViewIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInvoiceClick(invoice);
                          }}
                        >
                          View Details
                        </MenuItem>
                        <MenuItem
                          icon={<DownloadIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrintInvoice(invoice);
                          }}
                        >
                          Print
                        </MenuItem>
                        {invoice.customer.email && (
                          <MenuItem
                            icon={<EmailIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmailInvoice(invoice);
                            }}
                          >
                            Email
                          </MenuItem>
                        )}
                        <MenuItem
                          icon={<DeleteIcon />}
                          color="red.500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteInvoice(invoice);
                          }}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Box>
              ))}
            </VStack>
          ) : (
            // Desktop Table View
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr>
                  <Th color={textColor} fontSize="sm" fontWeight="bold" textTransform="none" px="16px" py="12px">
                    Invoice #
                  </Th>
                  <Th color={textColor} fontSize="sm" fontWeight="bold" textTransform="none" px="16px" py="12px">
                    Date
                  </Th>
                  <Th color={textColor} fontSize="sm" fontWeight="bold" textTransform="none" px="16px" py="12px">
                    Customer
                  </Th>
                  <Th color={textColor} fontSize="sm" fontWeight="bold" textTransform="none" px="16px" py="12px">
                    Total
                  </Th>
                  <Th color={textColor} fontSize="sm" fontWeight="bold" textTransform="none" px="16px" py="12px">
                    Payment
                  </Th>
                  <Th color={textColor} fontSize="sm" fontWeight="bold" textTransform="none" px="16px" py="12px">
                    Status
                  </Th>
                  <Th color={textColor} fontSize="sm" fontWeight="bold" textTransform="none" px="16px" py="12px">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {getFilteredInvoices().map((invoice, index) => (
                  <InvoicesTableRow
                    key={`${invoice.id}-${index}`}
                    invoice={invoice}
                    onClick={() => handleInvoiceClick(invoice)}
                    onPrint={() => handlePrintInvoice(invoice)}
                    onEmail={() => handleEmailInvoice(invoice)}
                    onDelete={() => handleDeleteInvoice(invoice)}
                  />
                ))}
              </Tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default InvoicesTable;
