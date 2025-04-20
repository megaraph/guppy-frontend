import { Box, Textarea, IconButton, VStack, Text } from "@chakra-ui/react";
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
            maxW={{ base: "90%", md: "800px" }}
            position="absolute"
            bottom={10}
            alignItems="center"
            spacing={2}
        >
            <Box position="relative" w="full">
                <Textarea
                    placeholder="What's on your mind?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (!botTyping) sendMessage();
                        }
                    }}
                    bg="#2c2c2c"
                    border="none"
                    color="white"
                    fontSize="md"
                    borderRadius="20px"
                    height="85px"
                    resize="none"
                    w="full"
                    isDisabled={botTyping}
                    pr="60px" // Add padding to the right to make space for the button
                    paddingBottom="16px" // Add extra padding at the bottom for better alignment
                />
                <IconButton
                    icon={
                        botTyping ? (
                            <CloseIcon color="white" />
                        ) : (
                            <ArrowUpIcon color="white" />
                        )
                    }
                    aria-label="Send Message"
                    onClick={botTyping ? stopTyping : sendMessage}
                    bg="#ff1a59"
                    borderRadius="12px"
                    _hover={{ bg: "#e60040" }}
                    size="sm"
                    isDisabled={!botTyping && !input.trim()}
                    position="absolute"
                    bottom="12px"
                    right="12px"
                    zIndex={2}
                />
            </Box>
            <Text fontSize={{ base: "0.58rem", md: "xs" }} color="gray.400">
                As an AI, Guppy can make mistakes. Be responsible to check
                important info.
            </Text>
        </VStack>
    );
};

export default ChatInput;
