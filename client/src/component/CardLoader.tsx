

const CardLoader = () => {
    return (

        <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="animate-pulse flex flex-col space-y-4">
                {/* <!-- Aspect-ratio Image Placeholder --> */}
                <div className="aspect-video w-full rounded-xl bg-gray-200"></div>

                <div className="flex-1 space-y-4 py-1">
                    {/* <!-- Title Lines --> */}
                    <div className="space-y-2">
                        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                        <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-gray-200"></div>
                        <div className="h-3 w-full rounded bg-gray-200"></div>
                        <div className="h-3 w-4/5 rounded bg-gray-200"></div>
                    </div>

                    {/* <!-- Footer / Button Placeholder --> */}
                    <div className="pt-2 flex justify-between items-center">
                        <div className="h-8 w-24 rounded-lg bg-gray-200"></div>
                        <div className="h-4 w-12 rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default CardLoader;