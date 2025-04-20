import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons"; // Import SettingsIcon
import logo from "../assets/logo.svg";

const Navbar = () => {
    return (
        <Box
            p={{ base: "0", md: "0 16px" }} // Added padding for larger screens
            position="fixed"
            top={0}
            left={0}
            right={0}
            bg="#242424"
            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
            zIndex={1000}
        >
            <Flex justify="space-between" align="center" p={2}>
                <Flex align="center">
                    <Image src={logo} alt="Logo" boxSize="36px" mr={2} />
                    <Text fontSize="lg" color="white" fontWeight="medium">
                        Guppy{" "}
                        <Text as="span" fontSize="sm">
                            by 79th ENG
                        </Text>
                    </Text>
                </Flex>
                <Button
                    colorScheme="transparent"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    borderRadius="15px"
                    leftIcon={<SettingsIcon />} // Use SettingsIcon
                    _hover={{ bg: "gray.700" }} // Add hover effect
                    color="white" // Change text color to white
                    onClick={() =>
                        (window.location.href =
                            "https://docs.google.com/spreadsheets/d/1DKKGvs5NhIZkdDFnp6EKC9PNQOHn_J0J6t7eKrOTLRI/edit?gid=0#gid=0")
                    } // Redirect to EngBox
                >
                    ENGBox
                </Button>
            </Flex>
        </Box>
    );
};

export default Navbar; // Ensure default export is present
