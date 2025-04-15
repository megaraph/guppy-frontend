import { Box, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import React from "react";

type MessageBubbleProps = {
    text: string;
    sender: "user" | "bot";
};

const markdownComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading as="h1" size="lg" my={2} {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading as="h2" size="md" my={2} {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <Heading as="h3" size="sm" my={2} {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <UnorderedList pl={4} mb={2} {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <ListItem mb={1} {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <Text mb={2} {...props} />
    ),
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
                <Box fontSize="xs" color="gray.500" mb={1}>
                    Guppy
                </Box>
            )}
            {sender === "bot" ? (
                <Box
                    color="white"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                    maxW="90%"
                >
                    <ReactMarkdown components={markdownComponents}>
                        {text}
                    </ReactMarkdown>
                </Box>
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
