import React from 'react';
import { Cpu, Zap, Monitor, Wrench, Building } from 'lucide-react';

const departments = [
    { name: "Computer Science & Engineering", icon: Monitor, degree: "B.Tech | M.Tech | Ph.D" },
    { name: "Electronics & Communication Engineering", icon: Cpu, degree: "B.Tech | M.Tech | Ph.D" },
    { name: "Electrical & Electronics Engineering", icon: Zap, degree: "B.Tech | M.Tech | Ph.D" },
    { name: "Mechanical Engineering", icon: Wrench, degree: "B.Tech | M.Tech | Ph.D" },
    { name: "Civil Engineering", icon: Building, degree: "B.Tech | M.Tech | Ph.D" }
];

const Programs = () => {
    return (
        <section id="departments" className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="mb-10 border-l-[4px] border-coral pl-4">
                    <h2 className="text-[1.75rem] font-display font-bold text-slate-800 uppercase tracking-wide">Academic Departments</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group cursor-pointer block">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-coral mb-4 group-hover:bg-coral group-hover:text-white transition-colors border border-slate-100">
                                <dept.icon size={22} />
                            </div>
                            <h3 className="text-[1.1rem] font-bold text-slate-800 mb-2 leading-tight">{dept.name}</h3>
                            <p className="text-[0.85rem] text-slate-500 font-semibold">{dept.degree}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;
