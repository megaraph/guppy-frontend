import { Box, VStack, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import MessageBubble from "./components/MessageBubble";
import ChatInput from "./components/ChatInput";
import Navbar from "./components/Navbar"; // Import the Navbar component
import ReactMarkdown from "react-markdown";

type Timeout = ReturnType<typeof setInterval>; // Define Timeout type

// Define message type
type Message = { text: string; sender: "user" | "bot" };

const mockResponses: Record<string, string> = {
    hello: "Hi there! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "who are you": "I'm ENGelbot, 79th ENG's AI assistant, and Kevin's pet 😉",
    "do you like kevin": "ok lang.",
    "is sun pretty": "yes -sun",
    "list all valid engineering programs in dlsu":
        "# Valid Engineering Disciplines!\n\n* Civil Engineering\n* Chemical Engineering\n* Mechanical Engineering\n* Electronics Engineering\n* Computer Engineering\n* Manufacturing Engineering\n* Biomedical Engineering",
    default: "I'm not sure how to respond to that, but I'm learning!",
};

function Guppy() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [typedText, setTypedText] = useState("");
    const [botTyping, setBotTyping] = useState(false);
    const [botMessage, setBotMessage] = useState("");
    const welcomeText = "Hey there, I'm Guppy!";

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

    const typingInterval = useRef<Timeout | null>(null);

    const stopTyping = () => {
        if (typingInterval.current) {
            clearInterval(typingInterval.current);
            typingInterval.current = null;
        }
        setBotTyping(false);
        setBotMessage("");
    };

    const sendMessage = () => {
        if (!input.trim() || botTyping) return;
        if (!chatStarted) setChatStarted(true);

        const userMessage: Message = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        setBotTyping(true);
        setBotMessage("Loading response...");

        setTimeout(() => {
            setBotMessage("");
            const responseText =
                mockResponses[input.toLowerCase()] || mockResponses["default"];
            let i = 0;
            let tempResponse = "";

            typingInterval.current = setInterval(() => {
                if (i < responseText.length) {
                    tempResponse += responseText[i];
                    setBotMessage(tempResponse);
                    i++;
                } else {
                    clearInterval(typingInterval.current!);
                    typingInterval.current = null;
                    setBotTyping(false);

                    setMessages((prev) => [
                        ...prev,
                        { text: tempResponse, sender: "bot" },
                    ]);
                }
            }, 50);
        }, 1000);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, botMessage]);

    return (
        <>
            <Navbar />
            <Box
                w="100vw"
                h="100vh"
                bg="gray.900"
                color="white"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={8}
            >
                {!chatStarted ? (
                    <VStack spacing={4} textAlign="center">
                        <Text
                            fontSize="4xl"
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
                            maxW={{
                                base: "110vw", // Expands beyond full width for very small screens
                                sm: "100vw", // Uses full width for small screens
                                md: "800px", // Keeps it readable for medium & large screens
                            }}
                            flex="1"
                            overflowY="auto"
                            p={0} // Removes padding restrictions to allow full width
                            maxHeight="calc(100vh - 160px)"
                            alignSelf="center"
                            mb={24}
                        >
                            {messages.map((msg, index) => (
                                <MessageBubble
                                    key={index}
                                    text={msg.text}
                                    sender={msg.sender}
                                />
                            ))}
                            {botTyping && (
                                <Box
                                    w="full"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                >
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Guppy
                                    </Text>
                                    <Box
                                        p={3}
                                        borderRadius="20px"
                                        bg="gray.800"
                                        color="white"
                                        maxW="75%"
                                    >
                                        <ReactMarkdown>
                                            {botMessage}
                                        </ReactMarkdown>
                                        <Spinner size="xs" ml={2} />
                                    </Box>
                                </Box>
                            )}
                            <div ref={messagesEndRef} />
                        </VStack>
                    </Box>
                )}
                <ChatInput
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    botTyping={botTyping}
                    stopTyping={stopTyping}
                />
            </Box>
        </>
    );
}

export default Guppy;
