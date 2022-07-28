import { EditIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useStore from "../lib/store";
import { ToDo } from "../types/store";

interface EditTitleProps {
	todo: ToDo;
}

const EditTitle: React.FC<EditTitleProps> = ({ todo }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { update } = useStore();
	const toast = useToast();
	const [newToDo, setNewToDo] = useState<string>("");
	const modalBg = useColorModeValue("gray.400", "gray.900");
	const initialFocusRef = useRef(null);

	const handleEdit = () => {
		update({
			...todo,
			title: newToDo,
		});
		toast({
			title: `Renamed '${todo.title}' to '${newToDo}'`,
			duration: 1500,
		});
		setNewToDo("");
		onClose();
	};

	const handleChange = (e: any) => setNewToDo(e.currentTarget.value);

	return (
		<>
			<IconButton
				aria-label="edit todo"
				icon={<EditIcon />}
				onClick={onOpen}
				colorScheme="linkedin"
			/>
			<Modal
				initialFocusRef={initialFocusRef}
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent backgroundColor={modalBg}>
					<ModalHeader>Editing Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex direction={"column"}>
							<Input
								ref={initialFocusRef}
								value={newToDo}
								onChange={handleChange}
								placeholder={todo.title}
							/>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme={"green"}
							disabled={newToDo.length < 1}
							onClick={handleEdit}>
							Edit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditTitle;
