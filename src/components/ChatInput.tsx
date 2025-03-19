import { Flex, Textarea, IconButton } from "@chakra-ui/react";
import { ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";

type ChatInputProps = {
    input: string;
    setInput: (value: string) => void;
    sendMessage: () => void;
    botTyping: boolean;
};

const ChatInput = ({
    input,
    setInput,
    sendMessage,
    botTyping,
}: ChatInputProps) => {
    return (
        <Flex
            w="100vw"
            maxW="45vw"
            position="absolute"
            bottom={10}
            alignItems="center"
        >
            <Textarea
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                }}
                bg="gray.800"
                border="none"
                color="white"
                fontSize="lg"
                borderRadius="20px"
                height="60px"
                resize="none"
                w="full"
            />
            <IconButton
                icon={botTyping ? <CloseIcon /> : <ArrowUpIcon color="black" />}
                aria-label="Send Message"
                onClick={sendMessage}
                bg="white"
                borderRadius="md"
                _hover={{ bg: "gray.300" }}
                boxSize="40px"
                ml={2}
            />
        </Flex>
    );
};

export default ChatInput;
