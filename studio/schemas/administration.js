export default {
    name: 'administration',
    title: 'Administration Page',
    type: 'document',
    fields: [
        {
            name: 'staffMembers',
            title: 'Administrative Staff Members',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'designation', title: 'Designation', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'calendarEvents',
            title: 'Calendar Events',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'dateKey', title: 'Date Key (YYYY-MM-DD)', type: 'string' },
                        { name: 'title', title: 'Event Title', type: 'string' },
                        { name: 'desc', title: 'Description', type: 'text' },
                        { name: 'time', title: 'Time', type: 'string' },
                        { name: 'type', title: 'Event Type', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'recentPosts',
            title: 'Recent Announcements',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'date', title: 'Date (e.g. May 18, 2026)', type: 'string' },
                        { name: 'category', title: 'Category', type: 'string' },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'summary', title: 'Summary', type: 'text' },
                        { name: 'readTime', title: 'Read Time', type: 'string' },
                        { name: 'link', title: 'Link URL', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'libraryStaffMembers',
            title: 'Library Staff Members',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'designation', title: 'Designation', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'libraryCalendarEvents',
            title: 'Library Calendar Events',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'dateKey', title: 'Date Key (YYYY-MM-DD)', type: 'string' },
                        { name: 'title', title: 'Event Title', type: 'string' },
                        { name: 'desc', title: 'Description', type: 'text' },
                        { name: 'time', title: 'Time', type: 'string' },
                        { name: 'type', title: 'Event Type', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'libraryRecentPosts',
            title: 'Library Recent Announcements',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'date', title: 'Date (e.g. May 18, 2026)', type: 'string' },
                        { name: 'category', title: 'Category', type: 'string' },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'summary', title: 'Summary', type: 'text' },
                        { name: 'readTime', title: 'Read Time', type: 'string' },
                        { name: 'link', title: 'Link URL', type: 'string' }
                    ]
                }
            ]
        }
    ]
}
