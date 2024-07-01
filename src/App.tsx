import React from "react";
import { Box } from "@chakra-ui/react";
import ChatScreen from "./components/ChatScreen";

const App: React.FC = () => {
  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ChatScreen />
    </Box>
  );
};

export default App;
