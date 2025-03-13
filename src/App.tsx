import { Box, Input, IconButton, VStack, Text, HStack } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useState } from "react";

const mockResponses: { [key: string]: string } = {
    hello: "Hi there! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "what is your name":
        "I'm ENGelBOT, Kevin's pet and here to help you unfuck your enlistment process today :)",
    "what's your opinion on ie?": "ass",
    default: "I'm not sure how to respond to that, but I'm learning!",
};

function ChatGPTClone() {
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "bot" }[]
    >([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
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
            <VStack
                spacing={4}
                w="full"
                maxW="800px"
                flex={1}
                overflowY="auto"
                p={5}
            >
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    What can I help with?
                </Text>
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
            </VStack>
            <HStack w="full" maxW="800px" p={4}>
                <Input
                    placeholder="Ask anything"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    bg="gray.800"
                    border="none"
                    _focus={{ bg: "gray.700" }}
                    color="white"
                />
                <IconButton
                    icon={<ChatIcon />}
                    aria-label="Send Message"
                    colorScheme="gray"
                    onClick={sendMessage}
                />
            </HStack>
        </Box>
    );
}

export default ChatGPTClone;
