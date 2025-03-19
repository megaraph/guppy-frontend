import {
    Box,
    IconButton,
    VStack,
    Text,
    Flex,
    Textarea,
    Spinner,
} from "@chakra-ui/react";
import { ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";

type Message = { text: string; sender: "user" | "bot" };

const mockResponses: Record<string, string> = {
    hello: "Hi there! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "who are you": "I'm ENGelbot, 79th ENG's AI assistant, and Kevin's pet 😉",
    "do you like kevin": "ok lang.",
    "is sun pretty": "yes -sun",
    "list all valid engineering programs in dlsu":
        "Sure! Civil Engineering, Chemical Engineering, Mechanical Engineering, Electronics Engineering, Computer Engineering, Manufacturing Engineering, and Biomedical Engineering.",
    default: "I'm not sure how to respond to that, but I'm learning!",
};

function ChatGPTClone() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [typedText, setTypedText] = useState("");
    const [botTyping, setBotTyping] = useState(false);
    const [botMessage, setBotMessage] = useState("");
    const welcomeText = "Welcome to ENGelbot";

    useEffect(() => {
        let i = 0;
        setTypedText("");
        const interval = setInterval(() => {
            if (i < welcomeText.length) {
                setTypedText(welcomeText.slice(0, i + 1));
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
        setInput("");

        setBotTyping(true);
        setBotMessage(""); // Ensure bot message starts empty before typing effect

        setTimeout(() => {
            const responseText =
                mockResponses[input.toLowerCase()] || mockResponses["default"];
            let i = 0;
            setBotMessage(""); // Reset before typing begins

            const interval = setInterval(() => {
                setBotMessage((prev) => (prev ?? "") + responseText[i]); // Prevent undefined
                i++;
                if (i >= responseText.length) {
                    clearInterval(interval);
                    setBotTyping(false);
                    setMessages((prev) => [
                        ...prev,
                        { text: responseText, sender: "bot" },
                    ]);
                }
            }, 50);
        }, 1000);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, botMessage]);

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
                        {botTyping && (
                            <Box
                                w="full"
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                            >
                                <Text fontSize="xs" color="gray.500" mb={1}>
                                    Engelbot
                                </Text>
                                <Box
                                    p={3}
                                    borderRadius="20px"
                                    bg="gray.800"
                                    color="white"
                                    maxW="75%"
                                >
                                    {botMessage}
                                    <Spinner size="xs" ml={2} />
                                </Box>
                            </Box>
                        )}
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
                    color="white"
                    fontSize="lg"
                    borderRadius="20px"
                    height="60px"
                    resize="none"
                    w="full"
                />
                <IconButton
                    icon={
                        botTyping ? (
                            <CloseIcon />
                        ) : (
                            <ArrowUpIcon color="black" />
                        )
                    }
                    aria-label="Send Message"
                    onClick={sendMessage}
                    bg="white"
                    borderRadius="md"
                    _hover={{ bg: "gray.300" }}
                    boxSize="40px"
                    ml={2}
                />
            </Flex>
        </Box>
    );
}

export default ChatGPTClone;
