import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 selection:bg-accent selection:text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-display font-black text-primary mb-6">
                    Oops!
                </h1>
                <div className="max-w-md mx-auto mb-10">
                    <img 
                        src="/Page404.png" 
                        alt="404 Page Not Found" 
                        className="w-full h-auto drop-shadow-xl rounded-2xl"
                    />
                </div>
                
                
                
                <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
                    We can't seem to find the page you're looking for.
                </h2>
                
                <p className="text-lg text-secondary/70 mb-10 max-w-xl mx-auto leading-relaxed">
                    The page might have been removed, had its name changed, or is temporarily unavailable. 
                    Let's get you back on track.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary/10 rounded-full font-bold hover:bg-slate-50 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                    
                    <Link 
                        to="/"
                        className="w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-colors shadow-lg hover:shadow-xl"
                    >
                        <Home size={20} />
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
