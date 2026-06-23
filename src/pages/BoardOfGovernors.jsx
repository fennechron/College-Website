import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, BookOpen } from 'lucide-react';

const BoardOfGovernors = () => {
    const governors = [
        { slNo: 1, name: "Professor & Head, Engineering Design Dept, IIT, Madras", role: "Chair Person", category: "Educationalist" },
        { slNo: 2, name: "The Director, IHRD, Thiruvananthapuram.", role: "Member", category: "Educationalist" },
        { slNo: 3, name: "Head, Talent Acquisition, TCS", role: "Member", category: "Industrialist" },
        { slNo: 4, name: "IT Consultant, Thiruvananthapuram", role: "Member", category: "Industrialist" },
        { slNo: 5, name: "HOD, Department of EC, College of Engineering, Chengannur", role: "Member", category: "Educationalist" },
        { slNo: 6, name: "HOD, Department of CS, College of Engineering, Chengannur", role: "Member", category: "Educationalist" },
        { slNo: 7, name: "The Regional Officer, SWRO Camp Office, Thiruvananthapuram (Nominated by AICTE Chairman)", role: "Member", category: "" },
        { slNo: 8, name: "The Principal, Rajiv Gandhi Institute of Technology, Kottayam (State Government Nominee)", role: "Member", category: "" },
        { slNo: 9, name: "The Finance Officer of the concerned Collectorate (State Government Nominee)", role: "Member", category: "" },
        { slNo: 10, name: "University Nominee (Vice Chancellor or his nominee)", role: "Member", category: "Educationalist" },
        { slNo: 11, name: "The Principal (Ex-officio), College of Engineering, Chengannur", role: "Member", category: "Educationalist" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20 sm:pt-32 pb-12 sm:pb-24">
            {/* ─── Header Section ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 sm:space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[0.65rem] sm:text-[0.7rem] font-black uppercase tracking-[0.3em]">
                        Administration
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-primary uppercase tracking-tighter leading-none">
                        Board of Governors
                    </h1>
                    <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-accent mx-auto rounded-full" />
                    <p className="text-primary/60 font-bold max-w-2xl mx-auto mt-4 sm:mt-6 text-xs sm:text-sm">
                        (As per GO. No. (Ms) No. 275/2020/HEDN dated 05/08/2020)
                    </p>
                </motion.div>
            </div>

            {/* ─── Table Section ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl sm:rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="py-4 sm:py-8 px-4 sm:px-8 font-display font-black uppercase tracking-widest text-[0.6rem] sm:text-[0.7rem] border-b border-white/10 w-16 sm:w-24 whitespace-nowrap">Sl.No.</th>
                                    <th className="py-4 sm:py-8 px-4 sm:px-8 font-display font-black uppercase tracking-widest text-[0.6rem] sm:text-[0.7rem] border-b border-white/10 min-w-[200px]">Name and Designation</th>
                                    <th className="py-4 sm:py-8 px-4 sm:px-8 font-display font-black uppercase tracking-widest text-[0.6rem] sm:text-[0.7rem] border-b border-white/10 w-36 sm:w-48 whitespace-nowrap">Role</th>
                                    <th className="py-4 sm:py-8 px-4 sm:px-8 font-display font-black uppercase tracking-widest text-[0.6rem] sm:text-[0.7rem] border-b border-white/10 w-36 sm:w-48 whitespace-nowrap">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {governors.map((gov, i) => (
                                    <motion.tr 
                                        key={gov.slNo}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="py-4 sm:py-8 px-4 sm:px-8 border-b border-slate-50 font-display font-black text-primary/40 group-hover:text-accent transition-colors text-xs sm:text-base">
                                            {gov.slNo.toString().padStart(2, '0')}
                                        </td>
                                        <td className="py-4 sm:py-8 px-4 sm:px-8 border-b border-slate-50">
                                            <div className="space-y-1">
                                                <p className="text-sm sm:text-lg font-bold text-primary leading-tight group-hover:translate-x-2 transition-transform duration-300">
                                                    {gov.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 sm:py-8 px-4 sm:px-8 border-b border-slate-50 whitespace-nowrap">
                                            <span className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[0.6rem] sm:text-[0.65rem] font-black uppercase tracking-widest ${
                                                gov.role === 'Chair Person' 
                                                ? 'bg-accent text-white shadow-lg' 
                                                : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {gov.role}
                                            </span>
                                        </td>
                                        <td className="py-4 sm:py-8 px-4 sm:px-8 border-b border-slate-50 whitespace-nowrap">
                                            {gov.category && (
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-primary font-bold text-xs sm:text-sm">
                                                    {gov.category === 'Educationalist' ? <BookOpen size={12} className="text-accent shrink-0" /> : <Shield size={12} className="text-accent shrink-0" />}
                                                    {gov.category}
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BoardOfGovernors;
