// "use client" does not need to be defined in every file.
// The Client module boundary only needs to be defined once, at the "entry point",
// import FacedetectionTF from '@/components/ai/facedetectiontf';
import FacedetectionONNX from '@/components/ai/facedetectiononnx';

export default function Home() {
    return (
        <FacedetectionONNX modelPath="/models/facedetectiononnx/model.onnx" />
    );
    // return <FacedetectionTF backendName="wasm" modelPath="/models/facedetectiontf/model.json"/>;
}
