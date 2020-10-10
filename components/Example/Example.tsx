import {ExampleWrapper} from "./Example.style";

type Props = {
    text?: string;
};

export default function Example({ text }: Props) {
    return <ExampleWrapper>{text || 'default text'}</ExampleWrapper>
}
