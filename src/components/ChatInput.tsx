import { Flex, Textarea, IconButton } from "@chakra-ui/react";
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
        <Flex
            w="100vw"
            maxW="45vw"
            position="absolute"
            bottom={10}
            alignItems="center"
        >
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
                fontSize="lg"
                borderRadius="20px"
                height="60px"
                resize="none"
                w="full"
                isDisabled={botTyping} // Disable input while Guppy is typing
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
                onClick={botTyping ? stopTyping : sendMessage} // Stop Guppy or Send message
                bg="white"
                borderRadius="100%"
                _hover={{ bg: "gray.300" }}
                boxSize="40px"
                ml={2}
                isDisabled={!botTyping && !input.trim()} // Disable if empty input
            />
        </Flex>
    );
};

export default ChatInput;
