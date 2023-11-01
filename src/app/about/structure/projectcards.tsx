'use client';

import { motion } from 'framer-motion';
import Projectcard from '@/app/about/structure/projectcard';
import { memo } from 'react';
import { IProject } from '@/app/about/structure/types';

// 완전한 client Side Rendering을 위해서 아래와 같이..따로 뻈다.
const Projectcards = ({ contents }: { contents: Array<IProject> }) => {
    return (
        <div className="mt-2 grid grid-cols-12 gap-5">
            {contents.map((project, index) => {
                const randomValue = crypto.getRandomValues(
                    new Uint32Array(1),
                )[0];
                return (
                    <motion.div
                        className="col-span-12 rounded-2xl border bg-gradient-to-r from-blue-500 to-purple-700 max-[319px]:w-[12rem] min-[480px]:col-span-6 lg:col-span-4"
                        key={randomValue} // 이걸 난수로 줘야 project간 이동시 애니매이션이 정상적으로 적용
                        initial={{ opacity: 0.0, scale: 1 }}
                        animate={{
                            scale: [0, 0.5, 1],
                            opacity: [0, 0.5, 1],
                            y: [(index + 1) * 7, 0],
                        }}
                        transition={{
                            type: 'spring',
                            duration: index / (contents.length * 3),
                        }}
                    >
                        <Projectcard {...project} />
                    </motion.div>
                );
            })}
        </div>
    );
};
export default memo(Projectcards);
