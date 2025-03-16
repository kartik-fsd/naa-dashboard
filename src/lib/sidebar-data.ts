import { NavigationItem } from "../types/layout";
import {
    HomeIcon,
    BriefcaseIcon,
    UserPlusIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
    ArchiveBoxIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";
export const navigationItems: NavigationItem[] = [
    { path: "/dashboard", icon: HomeIcon, label: "Home" },
    { path: "/portfolio", icon: BriefcaseIcon, label: "My Portfolio" },
    { path: "/assets", icon: ChartBarIcon, label: "Asset Management" }, // Added Assets Management
    { path: "/nominees", icon: UserPlusIcon, label: "Nominees" },
    {
        path: "/estate-planning",
        icon: ClipboardDocumentCheckIcon,
        label: "Estate Planning",
    },
    { path: "/documents", icon: ArchiveBoxIcon, label: "Document Vault" },
    { path: "/resources", icon: BookOpenIcon, label: "Resources" },
];

export const adminItems: NavigationItem[] = [
    { path: "/users", icon: UserGroupIcon, label: "User Management" },
    { path: "/reports", icon: ChartBarIcon, label: "Analytics & Reports" },
    { path: "/settings", icon: Cog6ToothIcon, label: "Platform Settings" },
];

export const moreOptions = [
    { path: "/documents", icon: ArchiveBoxIcon, label: "Document Vault" },
    { path: "/assets", icon: ChartBarIcon, label: "Asset Management" }, // Added to More Options
    { path: "/reports", icon: ChartBarIcon, label: "Reports" },
    { path: "/resources", icon: BookOpenIcon, label: "Resources" },
    { path: "/settings", icon: Cog6ToothIcon, label: "Settings" },
];

// Main Navigation Items (for mobile bottom navigation)
export const mainNavItems = [
    { path: "/dashboard", icon: HomeIcon, label: "Home" },
    { path: "/portfolio", icon: BriefcaseIcon, label: "Portfolio" },
    { path: "/assets", icon: ChartBarIcon, label: "Assets" }, // Added to mobile navigation
    { path: "/nominees", icon: UserPlusIcon, label: "Nominees" },
];