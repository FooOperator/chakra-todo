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
	Text,
	Flex,
	Checkbox,
	Button,
	Container,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import useStore from "../../lib/store";
import { ToDo } from "../../types/store";
import ToDoItem from "./ToDoItem";

const ToDoList: React.FC = () => {
	const [tabIndex, setTabIndex] = useState<number>(0);
	const todos = useStore((state) => state.todos);

	const tabPanelsContent = [
		todos,
		todos.filter((todo) => !todo.done),
		todos.filter((todo) => todo.done),
	];

	const [currentTabContent, setCurrentTabContent] = useState<
		ToDo[]
	>(() => []);

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
		setCurrentTabContent(tabPanelsContent[tabIndex]);
	};

	return (
		<Stack gap={4}>
			<Tabs
				tabIndex={tabIndex}
				onChange={handleTabsChange}
				variant={"solid-rounded"}
				defaultIndex={1}
				colorScheme={"red"}>
				<TabList
					display="flex"
					justifyContent={"center"}>
					<Tab>All</Tab>
					<Tab>To Do</Tab>
					<Tab>Done</Tab>
				</TabList>
				<TabPanels>
					{tabPanelsContent.map((content, index) => (
						<TabPanel key={index}>
							<Container
								sx={{
									"&::-webkit-scrollbar": {
										width: "1px",
										borderRadius: "8px",
										backgroundColor: `gray.100`,
									},
									"&::-webkit-scrollbar-thumb":
										{
											backgroundColor: `red.600`,
											borderRadius: "10px",
										},
								}}
								overflow={"auto"}
								minH="30vh"
								maxH="30vh">
								<List
									display={"flex"}
									flexDirection="column"
									w="100%"
									gap={1}>
									{content.map(
										(todo, indexJ) => (
											<ListItem
												w="100%"
												key={indexJ}>
												<Flex>
													<Text
														as="label"
														htmlFor={`${todo.id}-${indexJ}`}
														cursor={
															"pointer"
														}
														w="100%">
														<ToDoItem
															todo={
																todo
															}
														/>
													</Text>
												</Flex>
												{index <
													content.length -
														1 && (
													<Divider />
												)}
											</ListItem>
										)
									)}
								</List>
							</Container>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>

			<Flex
				align={"center"}
				direction="column"
				w="100%"
				gap={4}>
				<Text size={"xl"}>0 Selected</Text>
				<Flex w="100%" justifyContent={"space-evenly"}>
					<Button>Delete</Button>
					<Button>Is Done</Button>
					<Button>To Do</Button>
				</Flex>
			</Flex>
		</Stack>
	);
};

export default ToDoList;
