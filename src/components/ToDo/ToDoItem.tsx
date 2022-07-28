import { CheckIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { Text, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import useStore from "../../lib/store";
import { ToDo } from "../../types/store";
import { EditTitleButton } from "../";

interface ToDoItemProps {
  todo: ToDo;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
  const { remove, update } = useStore();

  const handleRemove = () => {
    remove(todo.id);
  };

  const toggleIsDone = () => {
    update({
      ...todo,
      done: !todo.done,
    });
  };

  return (
    <Flex align="center" p={2} w="100%" gap={2}>
      <Text
        overflow="hidden"
        whiteSpace={"nowrap"}
        as={todo.done ? "s" : undefined}
        fontSize="xl"
        mr="auto"
      >
        {todo.title}
      </Text>
      <Flex ml="auto" gap={2}>
        <IconButton
          aria-label="toggle is done todo"
          icon={!todo.done ? <CheckIcon /> : <MinusIcon />}
          onClick={toggleIsDone}
          colorScheme={!todo.done ? "whatsapp" : "orange"}
        />
        <EditTitleButton todo={todo} />
        <IconButton
          aria-label="delete todo"
          icon={<DeleteIcon />}
          onClick={handleRemove}
          colorScheme="red"
        />
      </Flex>
    </Flex>
  );
};

export default ToDoItem;
