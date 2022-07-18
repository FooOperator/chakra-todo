import {
  Checkbox,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useState } from "react";
import useStore from "../lib/store";

const ToDoForm: React.FC = () => {
  const [currentToDo, setCurrentToDo] = useState<string>("");
  const [isItDone, setIsItDone] = useState<boolean>(false);
  const add = useStore((state) => state.add);

  const handleChange = (e: any) => setCurrentToDo(e.target.value);
  const toggleIsItDone = () => setIsItDone((prev) => !prev);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentToDo.length < 1) return;
    add({
      title: currentToDo,
      done: isItDone,
      id: nanoid(),
      tags: [],
    });
    setCurrentToDo("");
    setIsItDone(false);
  };

  return (
    <Flex
      w="100%"
      h="100%"
      as="form"
      onSubmit={handleSubmit}
      direction="column"
      alignItems={"center"}
      gap={3}
    >
      <Input
        fontSize={"xl"}
        textAlign={"center"}
        onChange={handleChange}
        value={currentToDo}
        placeholder="Type your task here and tap enter"
      />
      <Checkbox checked={isItDone} onChange={toggleIsItDone}>
        <Text fontSize={"lg"}>Is it done?</Text>
      </Checkbox>
    </Flex>
  );
};

export default ToDoForm;
