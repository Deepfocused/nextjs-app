'use client';

import { memo, useCallback, useState } from 'react';
import ProjectsNavbar from '../structure/projectsnavbar';
import Projectcards from '@/app/about/structure/projectcards';
import { projects as projectsData } from '../data';
import { Category, IProject } from '../structure/types';

// import dynamic from "next/dynamic";
// const Projectcards = dynamic(() => import("@/app/about/structure/projectcards"), {ssr: false})

function Home() {
    const [projects, setProjects] = useState<IProject[]>(projectsData);
    const [active, setActive] = useState<string>('All');

    const handlerFilterCategory = useCallback<
        (category: Category | 'All') => void
    >((category) => {
        if (category === 'All') {
            setProjects(projectsData);
            setActive(category);
            return;
        }
        const newArray = projectsData.filter((project) =>
            project.category.includes(category),
        );
        setProjects(newArray);
        setActive(category);
    }, []);

    // projects-scrollbar는 custom class globals.css 보면됨
    return (
        <div className="projects-scrollbar max-h-[37rem] overflow-y-scroll px-4 lg:max-h-[38rem] xl:max-h-[39.25rem] 2xl:max-h-[36rem]">
            <ProjectsNavbar
                handlerFilterCategory={handlerFilterCategory}
                active={active}
            />
            <Projectcards contents={projects} />
        </div>
    );
}

export default memo(Home);
