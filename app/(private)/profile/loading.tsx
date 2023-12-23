import React from 'react';

function Loading() {
    return (
        <div className="animate-pulse">
            <div className="dark:bg-slate-700 bg-gray-300 p-2 rounded-lg w-full my-2 h-32"></div>
            <div className="dark:bg-slate-800 bg-gray-400 p-2 rounded-lg w-full max-w-xs mx-auto">
                <div className="bg-gray-500 h-10 w-1/4"></div>
            </div>
        </div>
    );
}

export default Loading;