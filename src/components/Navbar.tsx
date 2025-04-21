import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons"; // Import SettingsIcon
import logo from "../assets/logo.svg";

const Navbar = () => {
    return (
        <Box
            p={{ base: "0", md: "0 16px" }}
            position="fixed"
            top={0}
            left={0}
            right={0}
            bg="#242424"
            zIndex={1000}
            backdropFilter="blur(10px)" // Add subtle blur effect for depth
            transition="all 0.3s ease" // Smooth transitions for any state changes
        >
            <Flex justify="space-between" align="center" p={2}>
                <Flex align="center" transition="opacity 0.2s ease">
                    <Image src={logo} alt="Logo" boxSize="36px" mr={2} />
                    <Text
                        fontSize="xl"
                        color="white"
                        fontWeight="bold"
                        fontFamily="fredoka"
                    >
                        Guppy{" "}
                        <Text as="span" fontSize="0.7rem" opacity={0.7}>
                            by 79th ENG
                        </Text>
                    </Text>
                </Flex>
                <Button
                    colorScheme="transparent"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    borderRadius="1rem"
                    leftIcon={<SettingsIcon />}
                    _hover={{
                        bg: "rgba(255, 255, 255, 0.1)",
                        transform: "translateY(-1px)",
                    }}
                    _active={{
                        transform: "translateY(0px)",
                    }}
                    color="white"
                    transition="all 0.2s ease"
                    onClick={() =>
                        (window.location.href =
                            "https://docs.google.com/spreadsheets/d/1DKKGvs5NhIZkdDFnp6EKC9PNQOHn_J0J6t7eKrOTLRI/edit?gid=0#gid=0")
                    }
                >
                    ENGBox
                </Button>
            </Flex>
        </Box>
    );
};

export default Navbar; // Ensure default export is present
