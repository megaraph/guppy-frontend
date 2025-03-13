import { Box, Input, IconButton, VStack, Text, HStack } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";

const mockResponses: { [key: string]: string } = {
    hello: "Hi there! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "what is your name": "I'm ChatGPT Clone, your virtual assistant.",
    default: "I'm not sure how to respond to that, but I'm learning!",
};

function ChatGPTClone() {
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "bot" }[]
    >([]);
    const [input, setInput] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (!input.trim()) return;
        if (!chatStarted) setChatStarted(true);

        const userMessage = { text: input, sender: "user" as const };
        setMessages((prev) => [...prev, userMessage]);

        setTimeout(() => {
            const botResponse: { text: string; sender: "bot" } = {
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
                borderBottom="1px solid rgba(255, 255, 255, 0.1)"
            >
                <Text fontSize="xl" fontWeight="bold" color="gray.400">
                    Engelbot
                </Text>
                <HStack>
                    {/* Placeholder for links */}
                    <Text>Links</Text>
                </HStack>
            </HStack>

            {!chatStarted && (
                <Box
                    w="40%"
                    h="auto"
                    minH="200px"
                    display="flex"
                    flexDirection="column"
                >
                    <Box
                        flex={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            textAlign="center"
                        >
                            What can I help with?
                        </Text>
                    </Box>
                    <Box
                        flex={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <HStack w="full">
                            <Input
                                placeholder="Ask anything"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                bg="gray.800"
                                border="none"
                                _focus={{ bg: "gray.700" }}
                                color="white"
                                height="50px"
                                fontSize="lg"
                            />
                            <IconButton
                                icon={<ChatIcon />}
                                aria-label="Send Message"
                                colorScheme="gray"
                                onClick={sendMessage}
                            />
                        </HStack>
                    </Box>
                </Box>
            )}

            <VStack
                spacing={4}
                w="full"
                maxW="800px"
                flex="1"
                overflowY="auto"
                p={5}
                display={chatStarted ? "flex" : "none"}
                maxHeight="calc(100vh - 120px)"
                alignSelf="center"
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        p={3}
                        borderRadius="lg"
                        bg={msg.sender === "user" ? "blue.500" : "gray.700"}
                        alignSelf={
                            msg.sender === "user" ? "flex-end" : "flex-start"
                        }
                    >
                        {msg.text}
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </VStack>

            {chatStarted && (
                <HStack
                    w="full"
                    maxW="800px"
                    p={4}
                    position="absolute"
                    bottom={0}
                    bg="gray.900"
                >
                    <Input
                        placeholder="Ask anything"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        bg="gray.800"
                        border="none"
                        _focus={{ bg: "gray.700" }}
                        color="white"
                        height="50px"
                        fontSize="lg"
                    />
                    <IconButton
                        icon={<ChatIcon />}
                        aria-label="Send Message"
                        colorScheme="gray"
                        onClick={sendMessage}
                    />
                </HStack>
            )}
        </Box>
    );
}

export default ChatGPTClone;
