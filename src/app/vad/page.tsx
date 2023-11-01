// const Vad = dynamic(() => import("@/components/ai/vadonnx"), {ssr: false})
import VadONNX from '@/components/ai/vadonnx';

export default function Home() {
    return <VadONNX modelPath="./models/vadonnx/silero_vad.onnx" />;
}
