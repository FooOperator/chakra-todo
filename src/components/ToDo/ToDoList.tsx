import {
	Button,
	Container,
	Divider,
	Fade,
	Flex,
	List,
	ListItem,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useToast,
	UseToastOptions,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useStore from "../../lib/store";
import { ToDo } from "../../types/store";
import ToDoItem from "./ToDoItem";

const ToDoList: React.FC = () => {
	const toast = useToast();
	const [tabIndex, setTabIndex] = useState<number>(0);
	const todos = useStore((state) => state.todos);
	const tabPanelsContent = [
		todos,
		todos.filter((todo) => !todo.done),
		todos.filter((todo) => todo.done),
	];

	const [currentTabContent, setCurrentTabContent] = useState<ToDo[]>(
		() => []
	);

	useEffect(() => {
		const todosSubscription = useStore.subscribe((state, prev) => {
			const currTodos = state.todos;
			const prevTodos = prev.todos;

			if (currTodos.length > prevTodos.length) {
				showToast({
					title: `'${currTodos[0].title}' added`,
				});
				return;
			}

			if (currTodos.length < prevTodos.length) {
				const removed = prevTodos.filter(
					(x) => !currTodos.includes(x)
				);
				const amountRemoved = removed.length;
				showToast({
					title:
						amountRemoved > 1
							? `${amountRemoved} todos removed`
							: `'${removed[0].title}' removed`,
				});

				return;
			}

			const doneCurr = currTodos.filter((todo) => todo.done);
			const donePrev = prevTodos.filter((todo) => todo.done);

			if (doneCurr.length > donePrev.length) {
				showToast({
					title: `'${doneCurr.slice(-1)[0].title}' markedz done`,
				});
				return;
			}
		});

		return () => {
			todosSubscription();
		};
	}, []);

	const showToast = (options: UseToastOptions) => {
		toast({
			...options,
			status: options.status ?? "success",
			colorScheme: "pink",
			duration: options.duration ?? 1500,
		});
	};

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
				<TabList display="flex" justifyContent={"center"}>
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
									"&::-webkit-scrollbar-thumb": {
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
									{content.map((todo, indexJ) => (
										<ListItem w="100%" key={indexJ}>
											<Flex>
												<Text
													as="label"
													htmlFor={`${todo.id}-${indexJ}`}
													cursor={"pointer"}
													w="100%">
													<ToDoItem
														todo={todo}
													/>
												</Text>
											</Flex>
											{indexJ <
												content.length - 1 && (
												<Divider />
											)}
										</ListItem>
									))}
								</List>
							</Container>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
			<Text align="center" fontSize={"xl"}>
				WIP Footer Toolbar
			</Text>
			{/* <Flex align={"center"} direction="column" w="100%" gap={4}>
				<Text size={"xl"}>0 Selected</Text>
				<Flex w="100%" justifyContent={"space-evenly"}>
					<Button>Delete</Button>
					<Button>Is Done</Button>
					<Button>To Do</Button>
				</Flex>
			</Flex> */}
		</Stack>
	);
};

export default ToDoList;
