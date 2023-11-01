import { IProject, Service, Skill } from './structure/types';
import { BsUnity } from 'react-icons/bs';
import {
    SiCsharp,
    SiPytorch,
    SiSmartthings,
    SiTensorflow,
} from 'react-icons/si';
import { FcGlobe, FcReading, FcTemplate } from 'react-icons/fc';
import { FaPython } from 'react-icons/fa';
import {
    BiLogoCPlusPlus,
    BiLogoCss3,
    BiLogoReact,
    BiLogoTypescript,
} from 'react-icons/bi';
import { AiFillHtml5 } from 'react-icons/ai';
import { TbBrandNextjs } from 'react-icons/tb';
import { GiArtificialIntelligence } from 'react-icons/gi';

export const services: Service[] = [
    {
        Icon: SiSmartthings,
        title: 'AI Development',
        about: "I can develop and apply various <strong class='text-blue-400'>AI (vision, natural language processing, voice) algorithms</strong>, and apply them to services.",
    },
    {
        Icon: FcGlobe,
        title: 'Frontend Development',
        about: "I can create a web page that the user requests, I'm thinking about how to create <strong class='text-blue-400'>a stable and optimized web page.</strong>",
    },
    {
        Icon: FcTemplate,
        title: 'Interested in UI/UX',
        about: 'I think, "How can you deliver the end of everything well to others?" <strong class=\'text-blue-400\'>So I am studying UX/UI little by little.</strong>',
    },
    {
        Icon: FcReading,
        title: 'A Passionate Person',
        about: "To make myself of today that is much better than yesterday, I never stop learning. <strong class='text-blue-400'>I learn everything passionately.</strong>",
    },
];

export const languages: Skill[] = [
    {
        Icon: FaPython,
        name: 'Python',
        level: '85',
    },
    {
        Icon: BiLogoTypescript,
        name: 'TypeScript',
        level: '75',
    },
    {
        Icon: BiLogoCPlusPlus,
        name: 'C++',
        level: '55',
    },
    {
        Icon: SiCsharp,
        name: 'C#',
        level: '70',
    },
    {
        Icon: AiFillHtml5,
        name: 'HTML5',
        level: '70',
    },
    {
        Icon: BiLogoCss3,
        name: 'CSS3',
        level: '65',
    },
];

export const tools: Skill[] = [
    {
        Icon: SiTensorflow,
        name: 'Tensorflow',
        level: '85',
    },
    {
        Icon: SiPytorch,
        name: 'Pytorch',
        level: '92',
    },
    {
        Icon: GiArtificialIntelligence,
        name: 'Mxnet',
        level: '92',
    },
    {
        Icon: BiLogoReact,
        name: 'React',
        level: '75',
    },
    {
        Icon: TbBrandNextjs,
        name: 'Next.js',
        level: '75',
    },
    {
        Icon: BsUnity,
        name: 'Unity',
        level: '51',
    },
];

export const projects: IProject[] = [
    {
        name: "Deepfocused's Next.js Portfolio",
        description:
            "This page is the Web page created by Deepfocused using Next.js and shows <strong class='text-red-500'>the results of operating self-made AI models on the web</strong> and also shows <strong class='text-blue-500'>Deepfocused's career.</strong>",
        image_path: '/images/projects/web/portfolio.png',
        deployed_url: 'https://deepfocused.vercel.app/about',
        github_url: 'https://github.com/Deepfocused/nextjs-app',
        category: ['Web'],
        key_techs: [
            'React',
            'Typescript',
            'NextJS',
            'NodeJS',
            'SSR',
            'CSR',
            'Tailwind',
            'DaisyUI',
            'Framer Motion',
        ],
    },
    {
        name: 'HumanMatting Project with OnnxRuntime Web',
        description:
            "It is a project that operates<strong class='text-red-500'> Human Matting Model(made by me)</strong> that separates people from the background on the web.",
        image_path: '/images/projects/ai/humanmatting.png',
        deployed_url: 'https://deepfocused.vercel.app/humanmattingbetter',
        github_url:
            'https://github.com/deepfocused/nextjs-app/tree/main/src/app/humanmattingbetter',
        category: ['AI'],
        key_techs: [
            'Human Matting',
            'Onnxruntime Web',
            'Pytorch',
            'Tensorflow JS',
            'Onnx',
            'React',
            'Typescript',
            'NextJS',
            'Tailwind',
            'DaisyUI',
        ],
    },
    {
        name: 'Voice Activity Detection with OnnxRuntime Web',
        description:
            "It is a project to operate<strong class='text-red-500'> Silero Vad Model</strong> on the web that finds voice intervals in signals mixed with voice and noise.",
        image_path: '/images/projects/ai/vad.png',
        deployed_url: 'https://deepfocused.vercel.app/vad',
        github_url:
            'https://github.com/Deepfocused/nextjs-app/tree/main/src/app/vad',
        category: ['AI'],
        key_techs: [
            'Face Detection',
            'Onnxruntime Web',
            'Pytorch',
            'Onnx',
            'Tensorflow JS',
            'Silero Vad',
            'React',
            'Typescript',
            'NextJS',
            'Tailwind',
            'DaisyUI',
            'Framer Motion',
        ],
    },
    {
        name: 'Face Detection Project with OnnxRuntime Web',
        description:
            "It is a project to operate<strong class='text-red-500'> Face Detection Model(made by me)</strong> that extracts landmarks of the face area, eyes, nose, and mouth on the web.",
        image_path: '/images/projects/ai/facedetection.png',
        deployed_url: 'https://deepfocused.vercel.app/facedetection',
        github_url:
            'https://github.com/Deepfocused/nextjs-app/tree/main/src/app/facedetection',
        category: ['AI'],
        key_techs: [
            'Face Detection',
            'Onnxruntime Web',
            'Pytorch',
            'Tensorflow JS',
            'Onnx',
            'React',
            'Typescript',
            'NextJS',
            'Tailwind',
            'DaisyUI',
        ],
    },
    {
        name: 'Pose Detection Project with OnnxRuntime Web',
        description:
            "It is a project to operate<strong class='text-red-500'> Movenet2D Model</strong> on the web that estimates the posture of 17 keypoints of the web.",
        image_path: '/images/projects/ai/posedetection.png',
        deployed_url: 'https://deepfocused.vercel.app/posedetection',
        github_url:
            'https://github.com/Deepfocused/nextjs-app/tree/main/src/app/posedetection',
        category: ['AI'],
        key_techs: [
            'Face Detection',
            'Onnxruntime Web',
            'Pytorch',
            'Tensorflow JS',
            'Onnx',
            'React',
            'Typescript',
            'NextJS',
            'Tailwind',
            'DaisyUI',
        ],
    },
    {
        name: 'DL Code Implementation Project',
        description:
            "This is the result of implementing <strong class='text-red-500'>Classification, Segmentation, and Detection Algorithms</strong>, which can be considered the basis of deep learning, using the pytorch framework.",
        image_path: '/images/projects/ai/deeplearning.png',
        deployed_url: 'https://github.com/Deepfocused/PyTorch-Detector-alpha',
        github_url: 'https://github.com/Deepfocused/PyTorch-Detector-alpha',
        category: ['AI'],
        key_techs: [
            'Pytorch',
            'Classification',
            'Segmentation',
            'Object Detection',
            'Face Detection',
        ],
    },
    {
        name: 'Transformer Implementation Project',
        description:
            "This is the result of <strong class='text-red-500'>implementing the Transformer Model</strong> that translates German into English.",
        image_path: '/images/projects/ai/transformer.png',
        deployed_url: 'https://github.com/Deepfocused/Pytorch-Transformer',
        github_url: 'https://github.com/Deepfocused/Pytorch-Transformer',
        category: ['AI'],
        key_techs: [
            'Pytorch',
            'Deep Learning',
            'Translator',
            'Transformer',
            'Natural Language Processing',
        ],
    },
    {
        name: 'Torchserving Detection Project',
        description:
            "This is the result of <strong class='text-red-500'>servicing the Face Detection Model(made by me) with TorchServing</strong> and further <strong class='text-blue-500'>distributing it to the Kubernetes environment.</strong>",
        image_path: '/images/projects/ai/torchserving.png',
        deployed_url: 'https://github.com/Deepfocused/TorchServing',
        github_url: 'https://github.com/Deepfocused/TorchServing',
        category: ['AI'],
        key_techs: [
            'Pytorch',
            'AI Serving',
            'TorchServing',
            'Face Detection',
            'Docker',
            'Kubernetes',
            'Microk8s',
            'Helm',
        ],
    },
];
