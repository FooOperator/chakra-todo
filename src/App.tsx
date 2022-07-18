import {
  Container,
  Text,
  Flex,
  Heading,
  Link,
  LightMode,
} from "@chakra-ui/react";
import React from "react";
import DarkModeSwitch from "./components/DarkModeSwitch";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";

const App = () => {
  return <Layout />;
};

const Layout: React.FC = () => {
  return (
    <Flex direction={"column"} h="100%" alignItems={"center"}>
      <Flex
        mt="10%"
        as="main"
        alignSelf={"center"}
        alignItems="center"
        direction={"column"}
        w="100%"
        h="100%"
        gap={3}
      >
        <Flex align="center" gap={4}>
          <Heading size="4xl">Chakra To-Do</Heading>
          <DarkModeSwitch />
        </Flex>
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
        <Container
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: `gray.100`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `red.600`,
              borderRadius: "10px",
            },
          }}
          p={2}
          minH="50%"
          maxH="50%"
          overflow={"auto"}
        >
          <ToDoList />
        </Container>
      </Flex>
    </Flex>
  );
};

export default App;
