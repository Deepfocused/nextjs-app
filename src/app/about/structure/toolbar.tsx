'use client';

import { Skill } from '@/app/about/structure/types';
import { memo } from 'react';

const Toolbar = ({ Icon, name, level }: Skill) => {
    const bar_width = `${level}%`;
    return (
        <div className="mt-3 rounded-full text-white">
            <div
                className="flex items-center rounded-2xl bg-gradient-to-r from-orange-400 to-green-400 px-2"
                style={{
                    width: bar_width,
                }}
            >
                <Icon className="mr-2" />
                <p className="text-sm font-bold">{name}</p>
            </div>
        </div>
    );
};

export default memo(Toolbar);
