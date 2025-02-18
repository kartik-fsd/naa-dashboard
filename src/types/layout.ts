
export interface User {
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

export interface NavigationItem {
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}

export interface LayoutContextType {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
}

export interface BreadcrumbItem {
    label: string;
    path: string;
}

export interface HeaderProps {
    onOpenMenu?: () => void;
}

export interface SidebarProps {
    collapsed: boolean;
}

export interface UserControlsProps {
    showUserMenu: boolean;
    setShowUserMenu: (show: boolean) => void;
    user?: User;
}

export interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}