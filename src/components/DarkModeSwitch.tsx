import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";

const DarkModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const color = useColorModeValue("whiteAlpha.500", "black");
  const iconColor = useColorModeValue("black", "whiteAlpha.500");
  return (
    <IconButton
      onClick={() => toggleColorMode()}
      aria-label={`dark mode switch; currently ${colorMode}`}
      background={color}
      color={iconColor}
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
    />
  );
};

export default DarkModeSwitch;
