import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const generateKey = () => Math.random().toString(36).substring(2, 10);

const staffData = {
    'dept-computer-engineering': [
        { name: 'Smt. Jalaja Kumari R', designation: 'Trade Instructor' },
        { name: 'Smt. Dhanya R', designation: 'Computer Programmer' },
        { name: 'Smt. Rahana A', designation: 'Computer Programmer' },
        { name: 'Smt. Vidya Viswanath', designation: 'Computer Programmer' },
        { name: 'Smt. Raji C R', designation: 'Demonstrator' },
        { name: 'Smt. Santhi krishna S', designation: 'Tradesman' },
        { name: 'Smt. Priya Nair S', designation: 'Tradesman' },
        { name: 'Smt. Renju R', designation: 'Tradesman' }
    ],
    'dept-electronics-engineering': [
        { name: 'Smt. Ajitha Kumari P', designation: 'Foreman' },
        { name: 'Sri. M Suresh', designation: 'Trade Instructor(Grade II)' },
        { name: 'Sri. Vinod Tom Ninan', designation: 'Trade Instructor(Grade II)' },
        { name: 'Smt. Chandralekha C', designation: 'Demonstrator/Workshop Instructor' },
        { name: 'Sri. Chinthumon C G', designation: 'Demonstrator/Workshop Instructor' },
        { name: 'Smt. Reshma Rajan', designation: 'Demonstrator/Workshop Instructor' },
        { name: 'Smt. Bindu S Raj', designation: 'Demonstrator/Workshop Instructor' },
        { name: 'Smt. Saranya Kumari T S', designation: 'Demonstrator/Workshop Instructor' }
    ],
    'dept-electrical-engineering': [
        { name: 'Sri. Benny Mathew', designation: 'Foreman' },
        { name: 'Smt. Reshmimol P R', designation: 'Demonstrator' },
        { name: 'Smt. Arya P Krishnan', designation: 'Demonstrator' },
        { name: 'Sri. Bijin Rajan', designation: 'Demonstrator' },
        { name: 'Sri. Anil C D', designation: 'Tradesman' },
        { name: 'Sri. Abhinand R', designation: 'Tradesman' },
        { name: 'Sri. Afzal H', designation: 'Tradesman' },
        { name: 'Sri. Abhijith M', designation: 'Tradesman' }
    ],
    'dept-general-engineering': [
        { name: 'Sri. Rajesh Kumar G', designation: 'Demonstrator' }
    ]
};

async function run() {
    console.log("Starting Technical Staff Migration...");
    
    for (const [slug, staffList] of Object.entries(staffData)) {
        console.log(`\nProcessing Technical Staff for: ${slug}`);
        
        // Find existing department
        const searchShort = slug === 'dept-computer-engineering' ? 'CS' :
                           slug === 'dept-electronics-engineering' ? 'EC' :
                           slug === 'dept-electrical-engineering' ? 'EEE' : null;
        
        let dept = null;
        if (searchShort) {
            dept = await client.fetch(`*[_type == "department" && short == $short][0]`, { short: searchShort });
        }
        if (!dept) {
            dept = await client.fetch(`*[_type == "department" && slug.current == $slug][0]`, { slug });
        }
        
        if (!dept) {
            console.error(`Department not found for slug: ${slug}`);
            continue;
        }
        
        // Add Sanity required _key to each item
        const staffWithKeys = staffList.map(staff => ({
            ...staff,
            _key: generateKey()
        }));

        console.log(`Uploading ${staffList.length} technical staff members to ${dept.name}...`);

        await client.patch(dept._id)
            .set({ technicalStaff: staffWithKeys })
            .commit();
            
        console.log(`Successfully updated ${dept.name}`);
    }
    
    console.log("\n✅ Technical Staff Migration complete!");
}

run().catch(console.error);
