export interface RouteConfig {
    path: string;
    label: string;
    element: React.ReactNode;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children?: RouteConfig[];
}