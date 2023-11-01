// "use client" does not need to be defined in every file.
// The Client module boundary only needs to be defined once, at the "entry point",
import HumanmattingBetterONNX from '@/components/ai/humanmattingbetteronnx';

export default function Home() {
    return (
        <HumanmattingBetterONNX modelPath="/models/humanmattingonnx/modelLarge.onnx" />
    );
}
