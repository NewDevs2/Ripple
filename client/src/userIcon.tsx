import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

interface UserIconProps {
  location: string;
  position: { x: number; y: number };
}

const UserIcon: React.FC<UserIconProps> = ({ location, position }) => {
  return (
    <>
      <Box
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"15vw"}
          height={"7vh"}
        >
          <AiOutlineUser color="#7FC8F8" size="30px" />
        </Box>
      </Box>
    </>
  );
};

export default UserIcon;
