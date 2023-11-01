// "use client" does not need to be defined in every file.
// The Client module boundary only needs to be defined once, at the "entry point",
import HumanmattingONNX from '@/components/ai/humanmattingonnx';
// import HumanmattingTF from "@/components/ai/humanmattingtf";
export default function Home() {
    return (
        <HumanmattingONNX modelPath="/models/humanmattingonnx/modelLight.onnx" />
    );
    // return <HumanmattingTF
    //     backendName="wasm"
    //     modelPath="/models/humanmattingtf/model.json"
    // />;
}
