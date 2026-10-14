import convocation from '../assets/arc/Convocation.webp';
import nexum from '../assets/arc/Nexum.webp';
import alumniArchive from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.45.webp';
import memorialAward from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.46 (1).webp';
import studentSupport from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.46.webp';
import scholarship from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.47 (1).webp';
import alumniReunion from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.47 (2).webp';
import scholarshipPoster from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.47.webp';
import alumniNews from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.48 (1).webp';
import alumniVisit from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.48.webp';
import nexumAudience from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.49 (1).webp';
import arcTeam from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.49.webp';
import arcStudents from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.50.webp';
import nexumSpeakers from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.51 (1).webp';
import cecCommunity from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.51.webp';
import arcAddress from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.52 (1).webp';
import alumniInteraction from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.52.webp';
import computingLab from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.53.webp';
import graduationGroups from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.54 (1).webp';
import graduationMoments from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.54.webp';
import graduationPoster from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.55.webp';
import distinguishedAlumni from '../assets/arc/WhatsApp Image 2026-10-03 at 22.14.56.webp';

export const arcImages = { nexum, scholarship, computingLab, arcTeam };

export const arcSocialLinks = {
    instagram: 'https://www.instagram.com/arc_cec?stkn=MXFscWVndHF2aWIzZw==',
    cecifyInstagram: 'https://www.instagram.com/cecify.radio?stkn=ZTkyNjJ4cm91Mmhl',
    youtube: 'https://www.youtube.com/@CECify',
    linkedin: 'https://www.linkedin.com/company/arc-cec/'
};

export const arcProgrammes = [
    'NEXUM', 'Startup Saga', 'ResumeCraft', 'Generative AI for Educationists',
    'Responsible Netizen', 'Electrico Future', 'To Infinity and Beyond',
    'What’s Next?', 'Learn Design with Figma'
];

export const cecifyEpisodes = [
    {
        title: 'From CEC to Global Innovation',
        guests: 'Harikumar P & Thushar Tom',
        description: 'Distinguished alumni explore their journeys from CEC to research, technology, and the automotive industry.'
    },
    {
        title: 'Beyond the Bench',
        guests: 'ASHWA Sports Captains',
        description: 'Experiences of leadership, pressure, and representing their houses.'
    },
    {
        title: 'CEC in Every Note',
        guests: 'Robin Roy & Gokul Krishnan',
        description: 'Talented singers share their musical journeys at CEC.'
    },
    {
        title: 'കാമ്പസ് ചിരികളോടൊപ്പം – Once a CECian, always a CECian!',
        guests: 'Susmitha M & Rony Thomas',
        description: 'Alumni conversations celebrating the memories and lasting connections of CEC life.',
        malayalam: true
    },
    {
        title: 'College Ormakaliloode',
        guests: 'Arunanand T A',
        description: 'An alumnus shares nostalgic memories of his college days at CEC.'
    }
];

export const arcGallery = [
    { src: convocation, title: 'Graduation ceremony', category: 'Graduation', alt: 'Dignitaries in graduation robes lighting the ceremonial lamp at CEC' },
    { src: nexum, title: 'NEXUM', category: 'NEXUM', alt: 'NEXUM speakers in conversation on the seminar hall stage' },
    { src: scholarship, title: 'Scholarship distribution', category: 'Student support', alt: 'A student receiving support during a scholarship distribution function at CEC' },
    { src: alumniReunion, title: 'Alumni reunion', category: 'Alumni gatherings', alt: 'Alumni and their families gathered outside the college for a reunion' },
    { src: computingLab, title: 'Advanced computing lab inauguration', category: 'Infrastructure', alt: 'Guests at the inauguration of the advanced computing lab supported by alumni' },
    { src: arcTeam, title: 'ARC team', category: 'ARC team', alt: 'ARC team members gathered on the college lawn' },
    { src: studentSupport, title: 'Student support and recognition', category: 'Student support', alt: 'A student receiving an award with alumni and faculty present' },
    { src: nexumAudience, title: 'Learning together at NEXUM', category: 'NEXUM', alt: 'Students listening to a NEXUM panel discussion in the seminar hall' },
    { src: nexumSpeakers, title: 'NEXUM conversations', category: 'NEXUM', alt: 'A NEXUM speaker sharing her experience with the panel' },
    { src: arcStudents, title: 'The ARC student community', category: 'ARC team', alt: 'ARC students gathered around the CEC letters on campus' },
    { src: cecCommunity, title: 'Connecting CECians', category: 'ARC team', alt: 'Students and the CEC community posing together outside the college' },
    { src: alumniVisit, title: 'Back on campus', category: 'Alumni gatherings', alt: 'A group of alumni visiting the College of Engineering Chengannur' },
    { src: arcAddress, title: 'Alumni Relations Cell programme', category: 'Alumni gatherings', alt: 'A speaker addressing an ARC programme in the seminar hall' },
    { src: alumniInteraction, title: 'Alumni interaction', category: 'Alumni gatherings', alt: 'Participants taking part in a conversation with alumni in the seminar hall' },
    { src: memorialAward, title: 'Madhav Chandrasekhar Memorial Awards', category: 'Student support', alt: 'Poster commemorating Madhav Chandrasekhar and the memorial awards', contain: true },
    { src: scholarshipPoster, title: 'Merit-cum-Means Scholarship & Memorial Awards', category: 'Student support', alt: 'Programme poster for Merit-cum-Means Scholarship distribution and Madhav Chandrasekhar Memorial Awards', contain: true },
    { src: graduationGroups, title: 'Graduation memories', category: 'Graduation', alt: 'Collage of graduating batches posing in their graduation robes', contain: true },
    { src: graduationMoments, title: 'Celebrating our graduates', category: 'Graduation', alt: 'Collage of graduation ceremony moments and group photographs', contain: true },
    { src: graduationPoster, title: 'Graduation ceremony 2026', category: 'Graduation', alt: 'CEC graduation ceremony poster featuring the chief guest and dignitaries', contain: true },
    { src: distinguishedAlumni, title: 'Distinguished alumni at graduation', category: 'Graduation', alt: 'Graduation ceremony poster featuring distinguished CEC alumni', contain: true },
    { src: alumniArchive, title: 'Alumni gathering archive', category: 'Alumni gatherings', alt: 'Archived social media photographs of an alumni gathering at CEC', contain: true },
    { src: alumniNews, title: 'Alumni in the news', category: 'Alumni gatherings', alt: 'Archived Malayalam news clipping about the CEC alumni community', contain: true }
];
