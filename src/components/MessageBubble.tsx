import { Box, Text } from "@chakra-ui/react";

type MessageBubbleProps = {
    text: string;
    sender: "user" | "bot";
};

const MessageBubble = ({ text, sender }: MessageBubbleProps) => {
    return (
        <Box
            w="full"
            display="flex"
            flexDirection="column"
            alignItems={sender === "user" ? "flex-end" : "flex-start"}
        >
            {sender === "bot" && (
                <Text fontSize="xs" color="gray.500" mb={1}>
                    Guppy
                </Text>
            )}
            {sender === "bot" ? (
                <Text
                    color="white"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                >
                    {text}
                </Text>
            ) : (
                <Box
                    p={3}
                    borderRadius="20px"
                    bg="gray.700"
                    maxW="90%" // Adjusted for better mobile usability
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                    color="white"
                >
                    {text}
                </Box>
            )}
        </Box>
    );
};

export default MessageBubble;
