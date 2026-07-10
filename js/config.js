// Central Config Engine for links and basic administration rules
export const PortalConfig = {
    // 🚨 ADMIN IDENTIFIER: Replace this string with your specific Firebase UID 
    // after your first login to unlock the secure admin panel route view.
    adminUid: "REPLACE_WITH_YOUR_ACTUAL_FIREBASE_UID_ONCE_KNOWN",

    // Central location to update dashboard link cards
    dashboardLinks: [
        {
            title: "Google Drive Folder 1",
            description: "Shared team documentation, specifications, and project assets asset folder.",
            icon: "fa-solid fa-folder-open",
            url: "https://drive.google.com"
        },
        {
            title: "Google Drive Folder 2",
            description: "Archived media contents, raw graphic assets, and historic structural mockups.",
            icon: "fa-solid fa-folder-open",
            url: "https://drive.google.com"
        },
        {
            title: "Production Portal Website 1",
            description: "Direct tracking pipeline endpoint monitoring production architecture parameters.",
            icon: "fa-solid fa-globe",
            url: "https://example.com"
        },
        {
            title: "Staging Portal Website 2",
            description: "Internal pre-production staging cluster sandboxed testing environment.",
            icon: "fa-solid fa-globe",
            url: "https://example.com"
        },
        {
            title: "Team Operational Notes",
            description: "Collaborative dynamic repository keeping meeting minutes and development targets.",
            icon: "fa-solid fa-file-lines",
            url: "https://docs.google.com"
        },
        {
            title: "YouTube Stream Channel",
            description: "Video asset streams, public outreach uploads, and dynamic reference playlists.",
            icon: "fa-brands fa-youtube",
            url: "https://youtube.com"
        },
        {
            title: "Releases & Downloads",
            description: "Central software bin repository distributions containing production release builds.",
            icon: "fa-solid fa-download",
            url: "https://github.com"
        }
    ]
};
