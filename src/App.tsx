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

const API_BASE_URL =
    "https://lb3by3z2mmc2rtgoj3c3xbsed40pjkwc.lambda-url.ap-southeast-1.on.aws";

// Add CSS keyframes using standard CSS
const bounceKeyframes = `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}
`;

function Guppy() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [chatStarted, setChatStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [typedText, setTypedText] = useState("");
    const [botTyping, setBotTyping] = useState(false);
    const [botMessage, setBotMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const welcomeText = "Hey there, I'm Guppy.";

    // New state for animated bot message text
    const [welcomeAnimationComplete, setWelcomeAnimationComplete] =
        useState(false);
    const [animatedBotMessage, setAnimatedBotMessage] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let i = 0;
        setTypedText("");
        const interval = setInterval(() => {
            if (i < welcomeText.length) {
                setTypedText(welcomeText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                // Add a slight delay before showing the call-to-action
                setTimeout(() => setWelcomeAnimationComplete(true), 500);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const stopTyping = () => {
        setBotTyping(false);
        setBotMessage("");
        setError(null);
    };

    // Function to animate bot message typing
    const animateBotMessage = (fullMessage: string) => {
        setIsAnimating(true);
        setAnimatedBotMessage("");
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullMessage.length) {
                setAnimatedBotMessage((prev) => prev + fullMessage.charAt(i));
                i++;
            } else {
                clearInterval(interval);
                // After animation completes, add message to messages array
                setMessages((prev) => [
                    ...prev,
                    { text: fullMessage, sender: "bot" },
                ]);
                setBotTyping(false);
                setBotMessage("");
                setIsAnimating(false);
            }
        }, 30); // Adjust typing speed here (30ms per character)
    };

    const sendMessage = async () => {
        if (!input.trim() || botTyping || isAnimating) return;
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

            // Animate the final answer text instead of adding immediately
            animateBotMessage(answerText);
        } catch (err) {
            setBotTyping(false);
            setBotMessage("");
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, botMessage, animatedBotMessage]);

    // Inject global styles
    useEffect(() => {
        // Create style element
        const styleElement = document.createElement("style");
        styleElement.innerHTML = bounceKeyframes;
        document.head.appendChild(styleElement);

        // Cleanup
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <>
            <Navbar />
            <Box
                w="100vw"
                h="100vh"
                bg="#242424" // Changed from gray.900 to #242424 to match navbar
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

                        {/* Animated appearance of the instructional text */}
                        <Text
                            fontSize="md"
                            color="gray.400"
                            opacity={welcomeAnimationComplete ? 1 : 0}
                            transition="opacity 0.5s ease-in"
                        >
                            Ask me anything to get started.
                        </Text>

                        {/* Visual indicator to draw attention to the input area */}
                        <Box
                            width="40px"
                            height="40px"
                            opacity={welcomeAnimationComplete ? 1 : 0}
                            transition="opacity 0.5s ease-in, transform 0.5s ease-in"
                            transform={
                                welcomeAnimationComplete
                                    ? "translateY(50px)"
                                    : "translateY(0)"
                            }
                        >
                            <Box
                                as="svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="gray.400"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                sx={{ animation: "bounce 2s infinite" }} // Use sx prop for the animation
                            >
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </Box>
                        </Box>
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
                            {botTyping && !isAnimating && (
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
                                        bg="#2c2c2c" // Changed from gray.800 to a lighter black
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
                            {isAnimating && (
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
                                        bg="#2c2c2c" // Changed from gray.800 to a lighter black
                                        color="white"
                                        maxW="75%"
                                        whiteSpace="pre-wrap"
                                        wordBreak="break-word"
                                    >
                                        <ReactMarkdown>
                                            {animatedBotMessage}
                                        </ReactMarkdown>
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
