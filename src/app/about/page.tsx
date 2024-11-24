'use client';
import Servicecard from '@/app/about/structure/servicecard';
import { services } from '@/app/about/data';
import { Service } from '@/app/about/structure/types';
import { motion } from 'framer-motion';
import { memo } from 'react';

function Home() {
    return (
        <div className="flex flex-col px-4">
            <motion.div
                className="mb-3 mt-3 text-base"
                initial={{ opacity: 0.0, scale: 0.7 }}
                animate={{
                    scale: [1, 1, 1],
                    opacity: [0.0, 0.0, 1],
                    y: [3, 0],
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                I am Kim jonggon, who is developing hard everyday with the
                belief that people who stick their butt for a long time can do
                everything. I have about 7 years of experience in{' '}
                <span className="font-bold text-error">
                    AI Research / Development
                </span>{' '}
                and I am a{' '}
                <span className="font-bold text-success">
                    FrontEnd developer
                </span>{' '}
                with 1+ year of experience.
                <span className="font-bold text-warning">
                    {' '}
                    I work hard and do well no matter what I do.
                </span>
            </motion.div>
            <div className="-ml-4 -mr-4 flex flex-grow flex-col rounded-2xl px-4 pt-5">
                <div className="mb-2 text-2xl font-bold tracking-wide">
                    <span className="border-b-4 border-gray-400">
                        What I can do
                    </span>
                </div>
                <div className="mb-1">
                    {/* children's initial and animate property should be same as the parent during a stagger effect  */}
                    {services.map((service: Service, index) => (
                        <motion.div
                            className="mt-2 rounded-lg bg-slate-700 bg-opacity-25 p-2 md:mt-1 lg:mt-2 xl:mt-4 2xl:mt-6"
                            key={service.title}
                            initial={{ opacity: 0.0, scale: 1 }}
                            animate={{
                                scale: [1, 1, 1],
                                opacity: [0.0, 0.0, 1],
                                y: [(index + 1) * 3, 0],
                                borderRadius: ['7%', '21%', '7%'],
                            }}
                            transition={{
                                duration: 0.3 + index / services.length,
                            }}
                        >
                            <Servicecard {...service} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(Home);
