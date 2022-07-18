import {
  List,
  Divider,
  Tabs,
  TabList,
  Tab,
  Stack,
  TabPanels,
  TabPanel,
  ListItem,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import useStore from "../lib/store";
import ToDoItem from "./ToDoItem";

const ToDoList: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const todos = useStore((state) => state.todos);
  const doneTodos = todos.filter((todo) => todo.done);
  const notDoneTodos = todos.filter((todo) => !todo.done);

  const tabPanelsContent = [todos, notDoneTodos, doneTodos];

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Stack gap={4}>
      <Tabs
        tabIndex={tabIndex}
        onChange={handleTabsChange}
        variant={"solid-rounded"}
        colorScheme={"red"}
      >
        <TabList display="flex" justifyContent={"center"}>
          <Tab>All</Tab>
          <Tab>To Do</Tab>
          <Tab>Done</Tab>
        </TabList>
        <TabPanels>
          {tabPanelsContent.map((content, index) => (
            <TabPanel key={index}>
              <List display={"flex"} flexDirection="column" w="100%" gap={1}>
                {content.map((todo, indexJ) => (
                  <ListItem w="100%">
                    <ToDoItem key={indexJ} todo={todo} />
                    {index < content.length - 1 && <Divider />}
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default ToDoList;
