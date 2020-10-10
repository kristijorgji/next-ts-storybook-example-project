import { storiesOf } from "@storybook/react";
import Example from './Example';

storiesOf("Button", module).add("with text", () => {
    return <Example text="Hello World" />;
});
