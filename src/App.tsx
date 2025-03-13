import {
    Box,
    IconButton,
    VStack,
    Text,
    HStack,
    Flex,
    Textarea,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";

// Define message type
type Message = { text: string; sender: "user" | "bot" };

const mockResponses: Record<string, string> = {
    hello: "Hi there! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "what is your name": "I'm ChatGPT Clone, your virtual assistant.",
    default: "I'm not sure how to respond to that, but I'm learning!",
};

function ChatGPTClone() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = () => {
        if (!input.trim()) return;
        if (!chatStarted) setChatStarted(true);

        const userMessage: Message = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        setTimeout(() => {
            const botResponse: Message = {
                text:
                    mockResponses[input.toLowerCase()] ||
                    mockResponses["default"],
                sender: "bot",
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);

        setInput("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Box
            w="100vw"
            h="100vh"
            bg="gray.900"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={16}
        >
            {!chatStarted ? (
                // Welcome Screen
                <VStack spacing={4} textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold">
                        Welcome to ENGelbot
                    </Text>
                    <Text fontSize="md" color="gray.400">
                        Ask me anything to get started.
                    </Text>
                    <Flex
                        w="100vw"
                        maxW="45vw"
                        position="relative"
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
                            _focus={{ bg: "gray.700", zIndex: 1 }}
                            color="white"
                            fontSize="lg"
                            pr="60px"
                            borderRadius="20px"
                            height="60px"
                            resize="none"
                            w="full"
                        />
                        <IconButton
                            icon={<ArrowUpIcon color="black" />}
                            aria-label="Send Message"
                            onClick={sendMessage}
                            position="absolute"
                            right="10px"
                            bg="white"
                            borderRadius="full"
                            _hover={{ bg: "gray.300" }}
                            boxSize="40px"
                            zIndex={2}
                        />
                    </Flex>
                </VStack>
            ) : (
                // Chat Interface
                <Box
                    w="full"
                    h="100vh"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    p={16}
                >
                    {/* Navbar */}
                    <HStack
                        w="full"
                        p={4}
                        bg="gray.900"
                        justifyContent="space-between"
                        position="fixed"
                        top={0}
                        left={0}
                        right={0}
                        zIndex={1000}
                        borderBottom="1px solid rgba(255, 255, 255, 0.05)"
                    >
                        <Text fontSize="xl" fontWeight="bold" color="gray.400">
                            Engelbot
                        </Text>
                        <HStack>
                            {/* Placeholder for links */}
                            <Text>Links</Text>
                        </HStack>
                    </HStack>

                    <VStack
                        spacing={4}
                        w="full"
                        maxW="800px"
                        flex="1"
                        overflowY="auto"
                        p={5}
                        maxHeight="calc(100vh - 160px)"
                        alignSelf="center"
                        mb={24}
                    >
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                p={3}
                                borderRadius="lg"
                                bg={
                                    msg.sender === "user"
                                        ? "blue.500"
                                        : "gray.700"
                                }
                                alignSelf={
                                    msg.sender === "user"
                                        ? "flex-end"
                                        : "flex-start"
                                }
                                maxW="80%"
                                whiteSpace="pre-wrap"
                                wordBreak="break-word"
                            >
                                {msg.text}
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </VStack>

                    {/* Always visible input field */}
                    <Box
                        w="full"
                        maxW="800px"
                        position="fixed"
                        bottom={2}
                        p={4}
                    >
                        <Flex w="full" position="relative" alignItems="center">
                            <Textarea
                                placeholder="Ask anything"
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
                                _focus={{ bg: "gray.700", zIndex: 1 }}
                                color="white"
                                fontSize="lg"
                                pr="60px"
                                borderRadius="20px"
                                height="60px"
                                resize="none"
                                w="full"
                            />
                            <IconButton
                                icon={<ArrowUpIcon color="black" />}
                                aria-label="Send Message"
                                onClick={sendMessage}
                                position="absolute"
                                right="10px"
                                bg="white"
                                borderRadius="full"
                                _hover={{ bg: "gray.300" }}
                                boxSize="40px"
                                zIndex={2}
                            />
                        </Flex>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ChatGPTClone;
