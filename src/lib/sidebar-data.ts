import { NavigationItem } from "../types/layout";
import {
    HomeIcon,
    BriefcaseIcon,
    CreditCardIcon,
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
    { path: "/portfolio", icon: BriefcaseIcon, label: "My Portfolio" }, // Changed label to be more user-centric
    { path: "/nominees", icon: UserPlusIcon, label: "Nominees" },
    {
        path: "/estate-planning",
        icon: ClipboardDocumentCheckIcon,
        label: "Estate Planning",
    }, // Added core feature
    { path: "/documents", icon: ArchiveBoxIcon, label: "Document Vault" }, // Added core feature
    { path: "/transactions", icon: CreditCardIcon, label: "Transactions" }, //Might be removed in future if not useful
    { path: "/resources", icon: BookOpenIcon, label: "Resources" }, // Added for educational content/guides
];

export const adminItems: NavigationItem[] = [
    { path: "/users", icon: UserGroupIcon, label: "User Management" }, // Changed icon to better reflect multiple users
    { path: "/reports", icon: ChartBarIcon, label: "Analytics & Reports" }, // More descriptive label
    { path: "/settings", icon: Cog6ToothIcon, label: "Platform Settings" }, // More descriptive label
];



export const moreOptions = [
    { path: "/documents", icon: ArchiveBoxIcon, label: "Document Vault" },
    { path: "/reports", icon: ChartBarIcon, label: "Reports" },
    { path: "/resources", icon: BookOpenIcon, label: "Resources" },
    { path: "/settings", icon: Cog6ToothIcon, label: "Settings" },
];

// Main Navigation Items (for mobile bottom navigation)
export const mainNavItems = [
    { path: "/dashboard", icon: HomeIcon, label: "Home" },
    { path: "/portfolio", icon: BriefcaseIcon, label: "Portfolio" },
    { path: "/nominees", icon: UserPlusIcon, label: "Nominees" },
    { path: "/estate-planning", icon: ClipboardDocumentCheckIcon, label: "Planning" },
];