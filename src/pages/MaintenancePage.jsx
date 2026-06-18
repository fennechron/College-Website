import React from 'react';
import { Settings, Mail } from 'lucide-react';

const MaintenancePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 selection:bg-accent selection:text-white p-6">
            <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-primary/5">
                
                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-primary/5 p-8 flex items-center justify-center">
                    <img 
                        src="/PageMaintanence.png" 
                        alt="Under Maintenance" 
                        className="w-full h-auto max-w-sm drop-shadow-xl rounded-2xl mix-blend-multiply"
                    />
                </div>
                
                {/* Content Section */}
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center text-center md:text-left">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                        <Settings className="text-accent animate-[spin_4s_linear_infinite]" size={32} />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-display font-black text-primary mb-4 leading-tight">
                        Under <br className="hidden md:block" />Maintenance
                    </h1>
                    
                    <div className="w-16 h-1.5 bg-accent rounded-full mb-6 mx-auto md:mx-0"></div>
                    
                    <p className="text-lg text-secondary/70 mb-8 leading-relaxed">
                        We are currently upgrading our systems to provide you with a better experience. 
                        The website will be back online shortly. Thank you for your patience!
                    </p>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex items-start gap-4 text-left">
                        <Mail className="text-accent shrink-0 mt-1" size={24} />
                        <div>
                            <h3 className="font-bold text-primary mb-1">Need urgent assistance?</h3>
                            <p className="text-sm text-secondary/80">
                                Contact the administration at <br/>
                                <a href="mailto:principal@ceconline.edu" className="text-accent font-bold hover:underline">principal@ceconline.edu</a>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default MaintenancePage;
