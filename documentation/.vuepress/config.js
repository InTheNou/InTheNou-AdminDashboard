module.exports = {
    title: 'InTheNou Dashboard Documentation',
    themeConfig: {
        sidebar: [
            {
                title: 'General Information',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/generalinfo/projectsetup'
                ]
            },
            {
                title: 'Authentication',   // required
                collapsable: false, // optional, defaults to true
                sidebarDepth: 2,    // optional, defaults to 1
                children: [
                    '/authentication/login',
                    '/authentication/logout' 
                ]
            },
            {
                title: 'Events Management',   // required
                collapsable: false, // optional, defaults to true
                sidebarDepth: 2,    // optional, defaults to 1
                children: [
                    '/eventsmanagement/eventdetails',
                    '/eventsmanagement/events',
                    '/eventsmanagement/userevents'
                ]
            },
            {
                title: 'Information Base',   // required
                collapsable: false, // optional, defaults to true
                sidebarDepth: 2,    // optional, defaults to 1
                children: [
                    '/informationbase/buildingdetails',
                    '/informationbase/buildings',
                    '/informationbase/floorrooms',
                    '/informationbase/roomservices',
                    '/informationbase/servicedetails'
                ]
            },
            {
                title: 'Info. Base Management',   // required
                collapsable: false, // optional, defaults to true
                sidebarDepth: 2,    // optional, defaults to 1
                children: [
                    '/informationbasemanagement/roomscoordiatesmanagement',
                    '/informationbasemanagement/servicemanagement',
                    '/informationbasemanagement/tagsmanagement'
                ]
            },
            {
                title: 'Privilege Management',   // required
                collapsable: false, // optional, defaults to true
                sidebarDepth: 2,    // optional, defaults to 1
                children: [
                    '/privilegemanagement/delegatedusers',
                    '/privilegemanagement/eventcreators',
                    '/privilegemanagement/moderators'
                ]
            },
            {
                title: 'Utils',   // required
                collapsable: false, // optional, defaults to true
                sidebarDepth: 2,    // optional, defaults to 1
                children: [
                    '/utils/navbar',
                    '/utils/search'
                ]
            }
        ]
    }
}