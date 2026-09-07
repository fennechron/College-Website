import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, Building2, GraduationCap,
    Tag, MessageSquare, Send, CheckCircle2, AlertCircle,
    Loader2, ShieldCheck, RefreshCw
} from 'lucide-react';
import { GRIEVANCE_GOOGLE_FORM_CONFIG } from '../../config/grievanceConfig';

/**
 * Detects keyboard mashing, repeated characters, and random letter sequences.
 */
const isRandomLetters = (text, minWords = 1) => {
    if (!text || typeof text !== 'string') return true;
    const trimmed = text.trim();
    if (!trimmed) return true;

    // 1. Repeated identical characters 4+ times in a row (e.g. "aaaaa", "zzzz")
    if (/(.)\1{3,}/i.test(trimmed)) return true;

    // 2. Common keyboard mash patterns
    const mashPatterns = ['asdf', 'qwerty', 'zxcvb', 'qwer', 'asdfg', 'hjkl', 'poiuy', 'lkjhg', 'mnbvc'];
    const cleanLetters = trimmed.toLowerCase().replace(/[^a-z]/g, '');
    for (const pat of mashPatterns) {
        if (cleanLetters.includes(pat)) return true;
    }

    // 3. Long sequences of consonants without any vowels (6+ consecutive consonants)
    if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(cleanLetters)) return true;

    // 4. Word count check
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    if (words.length < minWords) return true;

    // 5. Check words for vowel presence if word length >= 5
    for (const word of words) {
        const alphaOnly = word.toLowerCase().replace(/[^a-z]/g, '');
        if (alphaOnly.length >= 5 && !/[aeiouy]/.test(alphaOnly)) {
            return true;
        }
    }

    // 6. If total length > 25 with only 1 word (no spaces)
    if (trimmed.length > 25 && words.length <= 1) {
        return true;
    }

    return false;
};

const GrievanceForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        semester: '',
        subject: '',
        grievance: ''
    });

    // Honeypot field for anti-bot protection
    const [honeypot, setHoneypot] = useState('');

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (submissionError) setSubmissionError('');
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (!/[a-zA-Z]/.test(formData.name)) {
            newErrors.name = 'Name must contain letters';
        } else if (isRandomLetters(formData.name, 1)) {
            newErrors.name = 'Please enter a valid name (avoid random letters)';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const cleanPhone = formData.phone.trim().replace(/\D/g, '');
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (cleanPhone.length < 10 || cleanPhone.length > 15) {
            newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
        } else if (/^(\d)\1+$/.test(cleanPhone)) {
            newErrors.phone = 'Please enter a valid phone number (not repeated digits)';
        } else if (cleanPhone === '1234567890' || cleanPhone === '0123456789') {
            newErrors.phone = 'Please enter a genuine phone number';
        }

        // Department validation
        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
        } else if (formData.department.trim().length < 2) {
            newErrors.department = 'Please enter a valid department name';
        } else if (isRandomLetters(formData.department, 1)) {
            newErrors.department = 'Please enter a valid department (avoid random letters)';
        }

        // Semester validation
        if (!formData.semester.trim()) {
            newErrors.semester = 'Semester is required';
        } else if (isRandomLetters(formData.semester, 1)) {
            newErrors.semester = 'Please enter a valid semester (e.g. S4 or Semester 4)';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters';
        } else if (isRandomLetters(formData.subject, 1)) {
            newErrors.subject = 'Please enter a meaningful subject (avoid random letters)';
        }

        // Grievance description validation
        if (!formData.grievance.trim()) {
            newErrors.grievance = 'Please enter your grievance details';
        } else if (formData.grievance.trim().length < 15) {
            newErrors.grievance = 'Please provide at least 15 characters describing your grievance';
        } else if (isRandomLetters(formData.grievance, 3)) {
            newErrors.grievance = 'Please provide a clear description in words';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Honeypot check: If the hidden honeypot field is filled, a bot filled it
        if (honeypot && honeypot.trim() !== '') {
            console.warn('Bot detected via honeypot trap.');
            // Silently pretend success to fool the bot without submitting to Google Form
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 600));
            setIsSubmitting(false);
            setIsSubmitted(true);
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmissionError('');

        try {
            const { formActionUrl, entryIds } = GRIEVANCE_GOOGLE_FORM_CONFIG;

            if (formActionUrl && formActionUrl.trim() !== '') {
                // Prepare URL encoded parameters for Google Form formResponse
                const params = new URLSearchParams();
                params.append(entryIds.name, formData.name);
                params.append(entryIds.email, formData.email);
                params.append(entryIds.phone, formData.phone);
                params.append(entryIds.department, formData.department);
                params.append(entryIds.semester, formData.semester);
                params.append(entryIds.subject, formData.subject);
                params.append(entryIds.grievance, formData.grievance);

                // Send request using no-cors mode to bypass browser CORS on Google Forms
                await fetch(formActionUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params.toString()
                });
            } else {
                // Simulated slight delay if no external endpoint is configured yet
                await new Promise(resolve => setTimeout(resolve, 800));
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error('Error submitting grievance to Google Form:', err);
            setSubmissionError('An unexpected error occurred while submitting. Please try again or reach out to the grievance desk directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            department: '',
            semester: '',
            subject: '',
            grievance: ''
        });
        setHoneypot('');
        setErrors({});
        setIsSubmitted(false);
        setSubmissionError('');
    };

    return (
        <div className="mt-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-6 sm:p-10 shadow-lg shadow-primary/5">
            {/* Form Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
                <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-widest mb-3">
                        <ShieldCheck size={14} /> Confidential & Official
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-primary uppercase tracking-tight">
                        Grievance Submission Form
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Submit your concerns directly to the Grievance Redressal Committee for review and resolution.
                    </p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isSubmitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-12 px-6 text-center space-y-6"
                    >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-2 border-emerald-200 shadow-sm">
                            <CheckCircle2 size={40} className="stroke-[2.5]" />
                        </div>
                        <div className="max-w-md mx-auto space-y-2">
                            <h4 className="text-2xl font-display font-black text-primary">Grievance Submitted</h4>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                                Thank you, <span className="font-bold text-primary">{formData.name}</span>. Your grievance regarding <span className="font-bold text-primary">"{formData.subject}"</span> has been transmitted successfully to the Grievance Redressal Committee.
                            </p>
                            <p className="text-xs text-slate-400 font-semibold pt-2">
                                Confirmation has been recorded. Our committee will review your grievance and get back to you via your registered email or phone.
                            </p>
                        </div>
                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary transition-colors duration-200 shadow-sm"
                            >
                                <RefreshCw size={15} /> Submit Another Grievance
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <form key="form" onSubmit={handleSubmit} noValidate className="space-y-6">
                        {/* Honeypot field (hidden from real users, lures spam bots) */}
                        <div className="absolute opacity-0 pointer-events-none -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                            <label htmlFor="grievance-user-website">Website (leave blank)</label>
                            <input
                                type="text"
                                id="grievance-user-website"
                                name="website"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

                        {submissionError && (
                            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-sm font-semibold">
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <span>{submissionError}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="grievance-name" className="block text-xs font-black uppercase tracking-wider text-primary mb-2">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                        <User size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        id="grievance-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. John Doe"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-semibold text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                                            errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    />
                                </div>
                                {errors.name && <p className="text-xs font-bold text-rose-500 mt-1.5">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="grievance-email" className="block text-xs font-black uppercase tracking-wider text-primary mb-2">
                                    Email Address <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        id="grievance-email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g. student@ceconline.edu"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-semibold text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                                            errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    />
                                </div>
                                {errors.email && <p className="text-xs font-bold text-rose-500 mt-1.5">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="grievance-phone" className="block text-xs font-black uppercase tracking-wider text-primary mb-2">
                                    Phone Number <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                        <Phone size={18} />
                                    </span>
                                    <input
                                        type="tel"
                                        id="grievance-phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g. +91 9876543210"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-semibold text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                                            errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    />
                                </div>
                                {errors.phone && <p className="text-xs font-bold text-rose-500 mt-1.5">{errors.phone}</p>}
                            </div>

                            {/* Department */}
                            <div>
                                <label htmlFor="grievance-department" className="block text-xs font-black uppercase tracking-wider text-primary mb-2">
                                    Department <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                        <Building2 size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        id="grievance-department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="e.g. Computer Science / Electronics"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-semibold text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                                            errors.department ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    />
                                </div>
                                {errors.department && <p className="text-xs font-bold text-rose-500 mt-1.5">{errors.department}</p>}
                            </div>

                            {/* Semester */}
                            <div>
                                <label htmlFor="grievance-semester" className="block text-xs font-black uppercase tracking-wider text-primary mb-2">
                                    Semester <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                        <GraduationCap size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        id="grievance-semester"
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        placeholder="e.g. Semester 4 / S4"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-semibold text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                                            errors.semester ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    />
                                </div>
                                {errors.semester && <p className="text-xs font-bold text-rose-500 mt-1.5">{errors.semester}</p>}
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="grievance-subject" className="block text-xs font-black uppercase tracking-wider text-primary mb-2">
                                    Subject / Grievance Topic <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                        <Tag size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        id="grievance-subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="e.g. Lab Infrastructure / Exam Schedule Issue"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-semibold text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                                            errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    />
                                </div>
                                {errors.subject && <p className="text-xs font-bold text-rose-500 mt-1.5">{errors.subject}</p>}
                            </div>
                        </div>

                        {/* Grievance Details */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="grievance-details" className="block text-xs font-black uppercase tracking-wider text-primary">
                                    Grievance Details <span className="text-rose-500">*</span>
                                </label>
                                <span className="text-[0.7rem] font-bold text-slate-400">
                                    {formData.grievance.length} characters
                                </span>
                            </div>
                            <div className="relative">
                                <span className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                                    <MessageSquare size={18} />
                                </span>
                                <textarea
                                    id="grievance-details"
                                    name="grievance"
                                    rows={5}
                                    value={formData.grievance}
                                    onChange={handleChange}
                                    placeholder="Please describe your grievance in detail so the committee can take appropriate steps..."
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-semibold text-primary leading-relaxed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-y ${
                                        errors.grievance ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                />
                            </div>
                            {errors.grievance && <p className="text-xs font-bold text-rose-500 mt-1.5">{errors.grievance}</p>}
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                                <span>Your personal information will be protected and kept strictly confidential.</span>
                            </div>

                            <button
                                type="submit"
                                id="grievance-submit-btn"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-widest hover:bg-secondary active:scale-[0.98] transition-all duration-200 shadow-md shadow-primary/10 disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Send Grievance</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GrievanceForm;
