import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons"; // Import QuestionIcon

const Navbar = () => {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bg="gray.900"
            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
            zIndex={1000}
        >
            <Flex justify="space-between" align="center" p={4}>
                <Text fontSize="xl" color="gray.400" fontWeight="medium">
                    Guppy{" "}
                    <Text as="span" fontSize="sm">
                        by 79th ENG
                    </Text>
                </Text>
                <Button
                    colorScheme="transparent"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    borderRadius="full"
                    leftIcon={<QuestionIcon />} // Use QuestionIcon
                    _hover={{ bg: "gray.700" }} // Add hover effect
                    color="white" // Change text color to white
                    onClick={() =>
                        (window.location.href = "https://youtube.com")
                    } // Redirect to YouTube
                >
                    Help
                </Button>
            </Flex>
        </Box>
    );
};

export default Navbar; // Ensure default export is present
