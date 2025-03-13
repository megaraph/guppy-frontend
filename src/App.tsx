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
    const [typedText, setTypedText] = useState("");
    const welcomeText = "Welcome to ENGelbot";

    useEffect(() => {
        let i = 0;
        setTypedText(""); // Ensure it's reset before starting
        const interval = setInterval(() => {
            if (i < welcomeText.length) {
                setTypedText(welcomeText.slice(0, i + 1)); // Slice avoids unintended concatenation
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

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
                <VStack spacing={4} textAlign="center">
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        bgGradient="linear(to-r, pink.300, pink.400, pink.500, pink.600)"
                        bgClip="text"
                    >
                        {typedText}
                    </Text>
                    <Text fontSize="md" color="gray.400">
                        Ask me anything to get started.
                    </Text>
                </VStack>
            ) : (
                <Box
                    w="full"
                    h="100vh"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    p={16}
                >
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
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="gray.400"
                            textAlign="left"
                        >
                            Engelbot
                        </Text>
                        <HStack>
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
                                w="full"
                                display="flex"
                                flexDirection="column"
                                alignItems={
                                    msg.sender === "user"
                                        ? "flex-end"
                                        : "flex-start"
                                }
                            >
                                {msg.sender === "bot" && (
                                    <Text
                                        fontSize="xs"
                                        color="gray.500"
                                        mb={1}
                                        textAlign="left"
                                    >
                                        Engelbot
                                    </Text>
                                )}
                                <Box
                                    p={3}
                                    borderRadius="20px"
                                    bg={
                                        msg.sender === "user"
                                            ? "gray.700"
                                            : "gray.800"
                                    }
                                    maxW="75%"
                                    whiteSpace="pre-wrap"
                                    wordBreak="break-word"
                                    color="white"
                                >
                                    {msg.text}
                                </Box>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </VStack>
                </Box>
            )}
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
                    _focus={{ bg: "gray.700", zIndex: 1 }}
                    color="white"
                    fontSize="lg"
                    borderRadius="20px"
                    height="60px"
                    resize="none"
                    w="full"
                />
                <IconButton
                    icon={<ArrowUpIcon color="black" />}
                    aria-label="Send Message"
                    onClick={sendMessage}
                    bg="white"
                    borderRadius="full"
                    _hover={{ bg: "gray.300" }}
                    boxSize="40px"
                    ml={2}
                />
            </Flex>
        </Box>
    );
}

export default ChatGPTClone;
