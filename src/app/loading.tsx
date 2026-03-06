export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-t-2 border-primary border-opacity-50 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-r-2 border-primary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-4 rounded-full border-b-2 border-primary animate-spin" style={{ animationDuration: '2s' }}></div>
                </div>
                <div className="text-primary tracking-[0.3em] uppercase text-xs font-bold font-sans animate-pulse">
                    Loading
                </div>
            </div>
        </div>
    );
}
