'use client';
//https://nextjs.org/docs/getting-started/react-essentials
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export default function RecoilProviders({ children }: { children: ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
}
