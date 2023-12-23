import React from 'react';

function Loading() {
    return (
        <div className="flex flex-col space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-md w-full"></div>
            
            {/* Search Bar Skeleton */}
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4 self-center"></div>
            
            {/* Nav Bar Skeleton */}
            <div className="flex justify-around">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md w-1/5"></div>
                ))}
            </div>
            
            {/* Posts Skeleton */}
            <div className="space-y-4 w-full md:w-8/12 lg:w-6/12 self-center">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-300 dark:bg-gray-600 rounded-md">
                        <div className="rounded-full bg-gray-400 h-10 w-10"></div>
                        <div className="flex-1 space-y-3">
                            <div className="w-3/4 h-2 bg-gray-400 rounded"></div>
                            <div className="w-1/2 h-2 bg-gray-400 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Loading;