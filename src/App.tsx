import {
  Container,
  Text,
  Flex,
  Heading,
  Link,
  LightMode,
  Box,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import { DarkModeSwitch } from "./components";
import { ToDoList, ToDoForm } from "./components/ToDo";

const App = () => {
  return <Layout />;
};

const Layout: React.FC = () => {
  return (
    <Flex direction={"column"} h="100%" alignItems={"center"}>
      <Helmet>
        <title>To-do Masterpiece</title>
      </Helmet>
      <Flex as="nav" w="100%" p={2} justifyContent="space-between">
        <Box ml="auto">
          <DarkModeSwitch />
        </Box>
      </Flex>
      <Flex
        mt="4%"
        as="main"
        alignSelf={"center"}
        alignItems="center"
        direction={"column"}
        w="100%"
        h="100%"
        gap={3}
      >
        <Heading size="4xl">To-do Masterpiece</Heading>
        <Text fontSize={"xl"}>
          Created by{" "}
          <LightMode>
            <Link
              color={"red.700"}
              target={"_blank"}
              href="https://github.com/FooOperator"
            >
              @FooOperator
            </Link>
          </LightMode>
        </Text>
        <Container w="50%">
          <ToDoForm />
        </Container>
        <Container p={1}>
          <ToDoList />
        </Container>
      </Flex>
    </Flex>
  );
};

export default App;
