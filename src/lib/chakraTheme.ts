import { extendTheme, StyleProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import '@fontsource/bitter';
import '@fontsource/zilla-slab';

export default extendTheme({
    styles: {
        global: (props: StyleProps) => ({
            "html, body, #root": {
                height: "100vh",
                backgroundColor: mode("gray.400", "gray.800")(props),
                color: mode("blackAlpha.900", "whiteAlpha.900")(props),
            },
        }),
    },
    fonts: {
        heading: `'Zilla Slab', serif`,
        body: `'Bitter', serif`
    }
});
