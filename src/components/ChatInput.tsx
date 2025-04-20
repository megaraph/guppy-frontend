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
                    placeholder="Message Guppy"
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
                    pr="60px"
                    paddingBottom="16px"
                    _focus={{
                        borderColor: "#ff1a59",
                        boxShadow: "0 0 0 1px rgb(66, 64, 65)",
                        borderWidth: "1px",
                    }}
                    _placeholder={{
                        color: "gray.500",
                    }}
                    sx={{
                        "&:focus-visible": {
                            outline: "none",
                            borderColor: "#ff1a59",
                            boxShadow: "0 0 0 1px rgb(66, 64, 65)",
                        },
                    }}
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
                    bg="pink.600"
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
