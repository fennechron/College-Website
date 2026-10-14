import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, GraduationCap, Instagram, Linkedin, Radio, Users, X, Youtube } from 'lucide-react';
import { arcGallery, arcImages, arcProgrammes, arcSocialLinks, cecifyEpisodes } from '../data/arcData';

const sections = [
    { id: 'about-arc', label: 'About ARC' },
    { id: 'alumni-support', label: 'Alumni support' },
    { id: 'arc-programmes', label: 'Programmes' },
    { id: 'cecify', label: 'CECify' },
    { id: 'arc-gallery', label: 'Gallery' }
];
const galleryCategories = ['All', ...new Set(arcGallery.map(photo => photo.category))];

function SocialLink({ href, icon: Icon, children, dark = false }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? 'border-white/30 text-white hover:bg-white/10 focus-visible:outline-white' : 'border-primary/20 text-primary hover:bg-primary/5 focus-visible:outline-accent'}`}
        >
            <Icon size={18} aria-hidden="true" />
            {children}
            <ArrowUpRight size={15} aria-hidden="true" />
        </a>
    );
}

function ARCPage() {
    const [galleryCategory, setGalleryCategory] = useState('All');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const photoDialog = useRef(null);
    const filteredPhotos = arcGallery.filter(photo => galleryCategory === 'All' || photo.category === galleryCategory);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.lenis?.scrollTo(0, { immediate: true });
        const previousTitle = document.title;
        document.title = 'Alumni Relations Cell (ARC) | College of Engineering Chengannur';
        return () => { document.title = previousTitle; };
    }, []);

    useEffect(() => {
        if (!selectedPhoto) return;
        const dialog = photoDialog.current;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        window.lenis?.stop();
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            window.lenis?.start();
        };
    }, [selectedPhoto]);

    return (
        <div className="min-h-screen bg-white font-body">
            <header className="bg-primary text-white">
                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
                    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70 sm:text-sm">
                        <Link to="/" className="rounded hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Home</Link>
                        <ChevronRight size={13} aria-hidden="true" />
                        <span>About</span>
                        <ChevronRight size={13} aria-hidden="true" />
                        <span>Committees</span>
                        <ChevronRight size={13} aria-hidden="true" />
                        <span aria-current="page" className="text-white">ARC</span>
                    </nav>
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-200">College of Engineering Chengannur</p>
                            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Alumni Relations<br className="hidden sm:block" /> Cell <span className="text-sky-200">(ARC)</span></h1>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">Connecting the institution, its alumni, and the student community through mentorship, shared experiences, and lifelong relationships.</p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <SocialLink href={arcSocialLinks.instagram} icon={Instagram} dark>ARC Instagram</SocialLink>
                                <SocialLink href={arcSocialLinks.linkedin} icon={Linkedin} dark>ARC LinkedIn</SocialLink>
                            </div>
                        </div>
                        <figure className="overflow-hidden rounded-2xl border border-white/15 bg-secondary">
                            <img src={arcImages.nexum} alt="Alumni and professionals sharing their experiences at NEXUM" className="aspect-[4/3] w-full object-cover" fetchpriority="high" />
                            <figcaption className="px-5 py-4 text-sm text-slate-200">NEXUM · Conversations that connect generations of CECians</figcaption>
                        </figure>
                    </div>
                </div>
            </header>

            <nav aria-label="ARC page sections" className="border-b border-slate-200 bg-slate-50">
                <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-5 py-4 sm:px-8">
                    {sections.map(section => (
                        <a key={section.id} href={`#${section.id}`} className="rounded py-1 text-sm font-semibold text-primary hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">{section.label}</a>
                    ))}
                </div>
            </nav>

            <section id="about-arc" aria-labelledby="about-arc-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-20">
                <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">Our community</p>
                        <h2 id="about-arc-title" className="mb-6 font-display text-3xl font-bold text-primary sm:text-4xl">A bond that grows beyond CEC</h2>
                        <p className="text-base leading-8 text-slate-600">The Alumni Relations Cell (ARC) of the College of Engineering Chengannur works closely with the Alumni Association to strengthen the bond between the institution, its alumni, and the student community. The Alumni Association plays an important role in the academic and professional development of CEC by encouraging alumni participation, supporting students, sharing professional expertise, and contributing to institutional development. ARC facilitates these connections through mentorship, networking, knowledge sharing, career guidance, and professional engagement, while providing students with opportunities to interact with alumni and industry professionals.</p>
                    </div>
                    <figure className="self-center">
                        <img src={arcImages.arcTeam} alt="The ARC team together on the College of Engineering Chengannur campus" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                        <figcaption className="mt-3 flex items-center gap-2 text-sm text-slate-600"><Users size={17} aria-hidden="true" />The ARC team at CEC</figcaption>
                    </figure>
                </div>
            </section>

            <section id="alumni-support" aria-labelledby="alumni-support-title" className="scroll-mt-24 bg-slate-50">
                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">The Alumni Association</p>
                    <h2 id="alumni-support-title" className="mb-8 font-display text-3xl font-bold text-primary sm:text-4xl">Supporting students. Building futures.</h2>
                    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <p className="text-base leading-8 text-slate-600">The Alumni Association plays an active role in supporting the educational and infrastructural development of the institution. As part of its student support initiatives, the Association provides the Merit-cum-Means Scholarship, awarding ₹35,000 each to 10 deserving students, helping them continue their education and encouraging academic excellence.</p>
                            <div className="my-8 flex flex-wrap gap-x-12 gap-y-6 border-y border-primary/10 py-6">
                                <div><p className="font-display text-4xl font-bold text-primary">₹35,000</p><p className="mt-2 text-sm text-slate-600">Scholarship per student</p></div>
                                <div><p className="font-display text-4xl font-bold text-primary">10</p><p className="mt-2 text-sm text-slate-600">Deserving students supported</p></div>
                            </div>
                            <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-primary"><GraduationCap size={22} aria-hidden="true" />Campus development</h3>
                            <p className="text-base leading-8 text-slate-600">The Alumni Association has also contributed significantly to the development of the college's infrastructure, supporting the establishment and development of computer laboratories and seminar halls. Through these contributions, the Association continues to play a meaningful role in the growth and development of the institution and its students.</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                            <figure>
                                <img src={arcImages.scholarship} alt="Scholarship presentation at a CEC student support function" loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-xl object-cover" />
                                <figcaption className="mt-3 text-sm font-medium text-slate-600">Merit-cum-Means Scholarship distribution</figcaption>
                            </figure>
                            <figure>
                                <img src={arcImages.computingLab} alt="Inauguration of the advanced computing lab sponsored by alumni" loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-xl object-cover" />
                                <figcaption className="mt-3 text-sm font-medium text-slate-600">Advanced computing lab supported by alumni</figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            <section id="arc-programmes" aria-labelledby="arc-programmes-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-20">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">Learning & engagement</p>
                <h2 id="arc-programmes-title" className="mb-6 font-display text-3xl font-bold text-primary sm:text-4xl">Programmes that open possibilities</h2>
                <p className="max-w-4xl text-base leading-8 text-slate-600">ARC organizes various programmes including technical talks, career guidance sessions, workshops, orientation programmes, alumni interactions, and reunions. Initiatives such as NEXUM, Startup Saga, ResumeCraft, Generative AI for Educationists, Responsible Netizen, Electrico Future, To Infinity and Beyond, What’s Next?, and Learn Design with Figma provide students with opportunities to learn from experienced professionals and alumni. Through alumni gatherings and community initiatives, ARC continues to connect different generations of CECians and strengthen the CEC community.</p>
                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3" aria-label="ARC initiatives">
                    {arcProgrammes.map(programme => (
                        <li key={programme} className="flex items-center gap-3 border-b border-slate-200 py-4 text-base font-semibold text-primary"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />{programme}</li>
                    ))}
                </ul>
            </section>

            <section id="cecify" aria-labelledby="cecify-title" className="scroll-mt-24 bg-primary text-white">
                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                        <div>
                            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-200"><Radio size={18} aria-hidden="true" />Stories from our community</p>
                            <h2 id="cecify-title" className="mb-6 font-display text-4xl font-bold sm:text-5xl">CECify</h2>
                            <div className="space-y-5 text-base leading-8 text-slate-200">
                                <p>CECify is a digital initiative of the Alumni Relations Cell of the College of Engineering Chengannur that aims to strengthen the connection between the CEC alumni community and the institution through stories, conversations, and shared experiences.</p>
                                <p>One of its major initiatives is CECify Radio, a podcast series featuring alumni, students, and members of the CEC community from diverse backgrounds. The podcast provides a platform to share college memories, career journeys, achievements, challenges, talents, and experiences beyond CEC, offering valuable perspectives to current students and fellow alumni.</p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <SocialLink href={arcSocialLinks.youtube} icon={Youtube} dark>CECify on YouTube</SocialLink>
                                <SocialLink href={arcSocialLinks.cecifyInstagram} icon={Instagram} dark>CECify Radio Instagram</SocialLink>
                            </div>
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">CECify Podcast</p>
                            <h3 className="mb-4 font-display text-3xl font-bold">Season 5</h3>
                            <p className="mb-6 text-base leading-7 text-slate-200">The latest CECify Podcast – Season 5 continues this journey with episodes covering different aspects of CEC life and the journeys of its community.</p>
                            <ul className="divide-y divide-white/15">
                                {cecifyEpisodes.map(episode => (
                                    <li key={episode.title} className="py-5 first:pt-0">
                                        <h4 className="text-lg font-bold leading-relaxed" lang={episode.malayalam ? 'ml' : undefined}>{episode.title}</h4>
                                        <p className="mt-1 text-sm font-semibold text-sky-200">{episode.guests}</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-200">{episode.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className="mt-10 border-t border-white/15 pt-8 text-base leading-8 text-slate-200">Through CECify, the Alumni Relations Cell creates a digital space where memories are preserved, experiences are shared, and generations of CECians remain connected, carrying the spirit and legacy of the institution forward.</p>
                </div>
            </section>

            <section id="arc-gallery" aria-labelledby="arc-gallery-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-20">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">Moments & milestones</p>
                <h2 id="arc-gallery-title" className="mb-4 font-display text-3xl font-bold text-primary sm:text-4xl">The ARC gallery</h2>
                <p className="text-base leading-7 text-slate-600">Graduations, alumni gatherings, student support, and the people who keep the CEC community connected. Select a photograph to view it in full.</p>
                <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by event">
                    {galleryCategories.map(category => (
                        <button key={category} type="button" onClick={() => setGalleryCategory(category)} aria-pressed={galleryCategory === category} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${galleryCategory === category ? 'border-primary bg-primary text-white' : 'border-slate-200 text-slate-600 hover:border-accent hover:text-primary'}`}>{category}</button>
                    ))}
                </div>
                <p aria-live="polite" className="mb-5 text-sm text-slate-500">{filteredPhotos.length} {filteredPhotos.length === 1 ? 'image' : 'images'}{galleryCategory !== 'All' && ` · ${galleryCategory}`}</p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPhotos.map(photo => (
                        <figure key={photo.src}>
                            <button type="button" onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}`} aria-haspopup="dialog" className="group block w-full overflow-hidden rounded-xl bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className={`aspect-[4/3] w-full transition-transform duration-300 motion-safe:group-hover:scale-105 ${photo.contain ? 'object-contain p-2' : 'object-cover'}`} />
                            </button>
                            <figcaption className="mt-3"><p className="text-xs font-semibold uppercase tracking-wide text-accent">{photo.category}</p><p className="mt-1 text-base font-semibold text-primary">{photo.title}</p></figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            <dialog ref={photoDialog} aria-labelledby="arc-photo-title" onClose={() => setSelectedPhoto(null)} onClick={event => { if (event.target === event.currentTarget) setSelectedPhoto(null); }} className="m-auto max-h-[90dvh] w-[94vw] max-w-5xl overflow-y-auto rounded-2xl bg-white p-4 text-primary shadow-2xl backdrop:bg-primary/90 sm:p-6" data-lenis-prevent="true">
                {selectedPhoto && (
                    <>
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <h2 id="arc-photo-title" className="text-lg font-bold">{selectedPhoto.title}</h2>
                            <button type="button" autoFocus aria-label="Close image" onClick={() => setSelectedPhoto(null)} className="shrink-0 rounded-lg p-2 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"><X size={22} aria-hidden="true" /></button>
                        </div>
                        <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="max-h-[70dvh] w-full object-contain" />
                    </>
                )}
            </dialog>
        </div>
    );
}

export default ARCPage;
