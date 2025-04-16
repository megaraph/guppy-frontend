import {
    Box,
    VStack,
    Text,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import MessageBubble from "./components/MessageBubble";
import ChatInput from "./components/ChatInput";
import Navbar from "./components/Navbar"; // Import the Navbar component
import ReactMarkdown from "react-markdown";

// Define message type
type Message = { text: string; sender: "user" | "bot" };

// const API_BASE_URL =
//     "https://lb3by3z2mmc2rtgoj3c3xbsed40pjkwc.lambda-url.ap-southeast-1.on.aws";

const API_BASE_URL = "http://0.0.0.0:8000";

function Guppy() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [typedText, setTypedText] = useState("");
    const [botTyping, setBotTyping] = useState(false);
    const [botMessage, setBotMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
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

    const stopTyping = () => {
        setBotTyping(false);
        setBotMessage("");
        setError(null);
    };

    const sendMessage = async () => {
        if (!input.trim() || botTyping) return;
        if (!chatStarted) setChatStarted(true);

        setError(null);

        const userMessage: Message = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setBotTyping(true);
        setBotMessage("Loading response...");

        try {
            // POST /submit_query
            const submitResponse = await fetch(`${API_BASE_URL}/submit_query`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query_text: input }),
            });

            if (!submitResponse.ok) {
                throw new Error(
                    `Submit query failed with status ${submitResponse.status}`
                );
            }

            const submitData = await submitResponse.json();
            const queryId = submitData.query_id;

            if (!queryId) {
                throw new Error("No query_id returned from submit_query");
            }

            // Poll /get_query until is_complete is true
            const pollInterval = 2000; // 2 seconds
            let isComplete = false;
            let answerText = "";

            while (!isComplete) {
                await new Promise((r) => setTimeout(r, pollInterval));

                const getResponse = await fetch(
                    `${API_BASE_URL}/get_query?query_id=${queryId}`
                );

                if (!getResponse.ok) {
                    throw new Error(
                        `Get query failed with status ${getResponse.status}`
                    );
                }

                const getData = await getResponse.json();

                isComplete = getData.is_complete;
                answerText = getData.answer_text || "";

                if (!isComplete) {
                    // Keep spinner and loading text visible
                    setBotMessage("Loading response...");
                }
            }

            // Add the final answer as a bot message
            setMessages((prev) => [
                ...prev,
                { text: answerText, sender: "bot" },
            ]);
            setBotTyping(false);
            setBotMessage("");
        } catch (err: Error | unknown) {
            setBotTyping(false);
            setBotMessage("");
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        }
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
                                base: "110vw",
                                sm: "100vw",
                                md: "800px",
                            }}
                            flex="1"
                            overflowY="auto"
                            p={0}
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
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <ReactMarkdown>
                                            {botMessage}
                                        </ReactMarkdown>
                                        <Spinner size="xs" ml={2} />
                                    </Box>
                                </Box>
                            )}
                            {error && (
                                <Alert status="error" borderRadius="md" mt={4}>
                                    <AlertIcon />
                                    <AlertTitle>
                                        There was an error loading the response
                                    </AlertTitle>
                                    <AlertDescription ml={2}>
                                        {error}
                                    </AlertDescription>
                                    <CloseButton
                                        position="absolute"
                                        right="8px"
                                        top="8px"
                                        onClick={() => setError(null)}
                                    />
                                </Alert>
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
