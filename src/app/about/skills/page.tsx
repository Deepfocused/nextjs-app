'use client';

import { Roboto_Condensed } from 'next/font/google';
import { memo } from 'react';
import Languagebar from '../structure/languagesbar';
import Toolbar from '../structure/toolbar';
import { languages, tools } from '../data';
import { motion } from 'framer-motion';

const thesisFont = Roboto_Condensed({
    weight: ['700'],
    subsets: ['latin'], // style: ['italic'],
    display: 'swap',
    preload: false,
});

function Home() {
    return (
        <>
            <div className="mt-2 grid gap-6 px-4 md:grid-cols-2">
                <div>
                    <p className="mb-1 mt-1 text-2xl font-bold">Education</p>
                    <motion.div
                        initial={{ opacity: 0.0, scale: 0.7 }}
                        animate={{
                            scale: [1, 1, 1],
                            opacity: [0.0, 0.0, 1],
                            y: [3, 0],
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className="text-md mt-2">
                            🔵 2010 ~ 2016 / 👨‍🎓 a bachelor of
                            Robotics(Intelligent system) at{' '}
                            <span className="font-bold text-warning">
                                Kwangwoon University
                            </span>
                        </p>
                        <p
                            className={`${
                                thesisFont.className
                            } ${'my-1'} ${'text-md'} ${'font-bold'}`}
                        >
                            &nbsp;&nbsp;a bachelor&apos;s thesis : Development
                            of a realistic telepresence system using a first
                            person view (FPV) drone
                        </p>
                        <p className="text-md mt-3">
                            🔵 2016 ~ 2018 / 👨‍🎓 a master of Robotics(Machine
                            Learning / Deep Learning) at{' '}
                            <span className="font-bold text-warning">
                                Kwangwoon University
                            </span>
                        </p>
                        <p
                            className={`${
                                thesisFont.className
                            } ${'my-1'} ${'text-md'} ${'font-bold'}`}
                        >
                            &nbsp;&nbsp;a master&apos;s thesis : Recurrent
                            neural network-based motion prediction
                        </p>
                    </motion.div>
                </div>
                <div>
                    <p className="mb-1 mt-1 text-2xl font-bold">Experience</p>
                    <motion.div
                        initial={{ opacity: 0.0, scale: 0.7 }}
                        animate={{
                            scale: [1, 1, 1],
                            opacity: [0.0, 0.0, 1],
                            y: [6, 0],
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="my-1">
                            <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-lg font-bold text-transparent">
                                &nbsp;AI
                            </span>
                            <span className="text-lg font-bold">
                                &nbsp;/&nbsp;
                            </span>
                            <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-lg font-bold text-transparent">
                                Web Developer
                            </span>
                        </div>
                        <div>
                            <table className="divide-y text-sm max-[320px]:text-xs">
                                <thead>
                                    <tr>
                                        <th className="py-2">Company</th>
                                        <th className="py-2">Period</th>
                                        <th className="py-2">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="text-left">
                                        <td className="py-1.5 text-left text-emerald-400">
                                            Koyoung Technology
                                        </td>
                                        <td className="px-2 py-1.5 text-xs">
                                            2018.01 ~ 2019.03
                                        </td>
                                        <td className="py-1.5 text-center">
                                            AI Developer
                                        </td>
                                    </tr>

                                    <tr className="text-left">
                                        <td className="py-1.5 text-cyan-400">
                                            Alchera
                                        </td>
                                        <td className="px-2 py-1.5 text-xs">
                                            2019.04 ~ 2020.09
                                        </td>
                                        <td className="py-1.5 text-center">
                                            AI Developer
                                        </td>
                                    </tr>

                                    <tr className="text-left">
                                        <td className="py-1.5 text-sky-400">
                                            Hyundai Autoever
                                        </td>
                                        <td className="px-2 py-1.5 text-xs">
                                            2020.10 ~ 2022.06
                                        </td>
                                        <td className="py-1.5 text-center">
                                            AI Developer
                                        </td>
                                    </tr>
                                    <tr className="text-left">
                                        <td className="py-1.5 text-rose-400">
                                            Com2verse
                                        </td>
                                        <td className="px-2 py-1.5 text-xs">
                                            2022.06 ~ 2023.10
                                        </td>
                                        <td className="py-1.5 text-center">
                                            <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text font-bold text-transparent">
                                                AI
                                            </span>
                                            <span className="font-bold">
                                                &nbsp;/&nbsp;
                                            </span>
                                            <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text font-bold text-transparent">
                                                Web Developer
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="grid gap-6 px-4 md:grid-cols-2 lg:mt-4 xl:mt-8 2xl:mt-16">
                <div>
                    <p className="mt-4 text-2xl font-bold">Language</p>
                    <motion.div
                        className="my-3"
                        initial={{ opacity: 0.0, scale: 1 }}
                        animate={{
                            scale: [1, 1, 1],
                            opacity: [0.0, 0.0, 1],
                            y: [9, 0],
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        {languages.map((language, index) => (
                            <Languagebar {...language} key={index} />
                        ))}
                    </motion.div>
                </div>

                <div>
                    <p className="mt-2 text-2xl font-bold">
                        Library & Framework
                    </p>
                    <motion.div
                        className="my-3"
                        initial={{ opacity: 0.0, scale: 0.7 }}
                        animate={{
                            scale: [1, 1, 1],
                            opacity: [0.0, 0.0, 1],
                            y: [12, 0],
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        {tools.map((tool, index) => (
                            <Toolbar {...tool} key={index} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default memo(Home);
