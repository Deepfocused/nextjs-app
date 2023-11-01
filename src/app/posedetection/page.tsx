// "use client" does not need to be defined in every file.
// The Client module boundary only needs to be defined once, at the "entry point",
// import FacedetectionTF from '@/components/ai/facedetectiontf';
import PosedetectionONNX from '@/components/ai/posedetectiononnx';

export default function Home() {
    return (
        <PosedetectionONNX modelPath="/models/posedetectiononnx/model.onnx" />
    );
}
