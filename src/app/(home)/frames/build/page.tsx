import { Metadata } from 'next';

import { FrameBuilder } from '@/features/home/frame/ui/builder';

export const metadata: Metadata = {
    title: "Build Frame",
    description: "Build Frame",
};

const BuildFrame = () => {
    return (
        <div className='container w-full max-w-7xl mx-auto py-20'>
            <FrameBuilder />
        </div>
    )
}

export default BuildFrame
