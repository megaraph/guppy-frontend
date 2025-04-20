import {
    Box,
    Heading,
    UnorderedList,
    ListItem,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import React, { useState, useEffect } from "react"; // Added the missing imports here

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
    const maxWidth = useBreakpointValue({ base: "100%", md: "90%" });

    // Add a simple animation hook for message appearance
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            w="full"
            display="flex"
            flexDirection="column"
            alignItems={sender === "user" ? "flex-end" : "flex-start"}
            opacity={isVisible ? 1 : 0}
            transform={isVisible ? "translateY(0)" : "translateY(10px)"}
            transition="opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
            mb={3} // Add more margin bottom for better message spacing
        >
            {sender === "bot" && (
                <Box fontSize="xs" color="gray.500" mb={1} ml={1}>
                    Guppy
                </Box>
            )}
            {sender === "bot" ? (
                <Box
                    color="white"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                    maxW={maxWidth}
                >
                    <ReactMarkdown components={markdownComponents}>
                        {text}
                    </ReactMarkdown>
                </Box>
            ) : (
                <Box
                    p={3}
                    borderRadius="20px"
                    bg="#2c2c2c"
                    maxW={maxWidth}
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                    color="white"
                    boxShadow="0 1px 2px rgba(0,0,0,0.1)" // Add subtle shadow for depth
                >
                    {text}
                </Box>
            )}
        </Box>
    );
};

export default MessageBubble;
