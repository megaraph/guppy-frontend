import { Flex, Textarea, IconButton, VStack, Text } from "@chakra-ui/react";
import { ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";

type ChatInputProps = {
    input: string;
    setInput: (value: string) => void;
    sendMessage: () => void;
    botTyping: boolean;
    stopTyping: () => void;
};

const ChatInput = ({
    input,
    setInput,
    sendMessage,
    botTyping,
    stopTyping,
}: ChatInputProps) => {
    return (
        <VStack
            w="100vw"
            maxW={{ base: "90%", md: "800px" }} // Set max width to 800px for larger screens
            position="absolute"
            bottom={10}
            alignItems="center"
            spacing={2}
        >
            <Flex w="full" alignItems="center">
                <Textarea
                    placeholder="What's on your mind?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (!botTyping) sendMessage(); // Prevent sending when bot is typing
                        }
                    }}
                    bg="gray.800"
                    border="none"
                    color="white"
                    fontSize="md" // Adjusted font size for better mobile usability
                    borderRadius="20px"
                    height="60px"
                    resize="none"
                    w="full"
                    isDisabled={botTyping} // Disable input while bot is typing
                />
                <IconButton
                    icon={
                        botTyping ? (
                            <CloseIcon color="black" />
                        ) : (
                            <ArrowUpIcon color="black" />
                        )
                    }
                    aria-label="Send Message"
                    onClick={botTyping ? stopTyping : sendMessage} // Stop bot or send message
                    bg="white"
                    borderRadius="100%"
                    _hover={{ bg: "gray.300" }}
                    boxSize="40px"
                    ml={2}
                    isDisabled={!botTyping && !input.trim()} // Disable if empty input
                />
            </Flex>
            <Text fontSize={{ base: "0.58rem", md: "xs" }} color="gray.400">
                {" "}
                As an AI, Guppy can make mistakes. Be responsible to check
                important info.
            </Text>
        </VStack>
    );
};

export default ChatInput;
