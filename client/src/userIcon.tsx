import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

const UserIcon: React.FC = () => {
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"15vw"}
        height={"7vh"}
        backgroundColor={"#7FC8F8"}
        borderRadius={"50%"}
      >
        <AiOutlineUser size="30px" />
      </Box>
    </>
  );
};

export default UserIcon;
