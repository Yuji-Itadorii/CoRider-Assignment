import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { fetchChatMessages } from "../services/api";
import "../style.css";
import { AttachmentIcon, ArrowRightIcon } from "@chakra-ui/icons";

const ChatScreen: React.FC = () => {
  type responseobject = {
    id: string;
    message: string;
    sender: {
      image: string;
      is_kyc_verified: boolean;
      self: boolean;
      user_id: string;
    };
    time: string;
  };

  const [messages, setMessages] = useState<responseobject[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      const newMessages = await fetchChatMessages(page);
      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
      setLoading(false);
    };

    loadMessages();
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  return (
    <div className="container">
      <div className="heading-container">
        <h2>Chat App</h2>
      </div>
      <VStack
        align="start"
        w="full"
        h="full"
        p={4}
        spacing={4}
        overflowY="auto"
      >
        {messages.map((msg, index) => (
          <Box key={index} bg="gray.100" p={3} borderRadius="md" w="full">
            <Text>{msg.message}</Text>
          </Box>
        ))}

        <div className="input-container">
          <input type="text" placeholder="Enter the message" />
          <span className="icon icon-one">
            <AttachmentIcon />
          </span>
          <span className="icon icon-two">
            <ArrowRightIcon />
          </span>
        </div>
        <div ref={ref}>{loading && <Spinner />}</div>
      </VStack>
    </div>
  );
};

export default ChatScreen;
