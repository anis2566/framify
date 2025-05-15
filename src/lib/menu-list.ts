import {
    LayoutGrid,
    LucideIcon,
    List,
    PlusCircle,
    Users,
    UsersRound,
    Shovel,
    Pill,
    SquareStack,
    Ambulance,
    Calendar,
    DollarSign,
    Dessert,
    ShieldQuestion,
    FileQuestion,
    Frame,
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getAdminMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname === "/dashboard",
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Frames ",
            menus: [
                {
                    href: "",
                    label: "Frames",
                    active: pathname.includes("/dashboard/frames"),
                    icon: Frame,
                    submenus: [
                        {
                            href: "/dashboard/frames/new",
                            label: "New",
                            active: pathname === "/dashboard/frames/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/dashboard/frames",
                            label: "List",
                            active: pathname === "/dashboard/frames",
                            icon: List,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Doctors",
                    active: pathname.includes("/dashboard/doctors"),
                    icon: UsersRound,
                    submenus: [
                        {
                            href: "/dashboard/doctors/new",
                            label: "New",
                            active: pathname === "/dashboard/doctors/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/dashboard/doctors",
                            label: "List",
                            active: pathname === "/dashboard/doctors",
                            icon: List,
                        },
                    ],
                },
                {
                    href: "/dashboard/treatments",
                    label: "Treatments",
                    active: pathname.includes("/dashboard/treatments"),
                    icon: Shovel,
                    submenus: [],
                },
                {
                    href: "",
                    label: "Medicines",
                    active: pathname.includes("/dashboard/medicines"),
                    icon: Pill,
                    submenus: [
                        {
                            href: "/dashboard/medicines",
                            label: "List",
                            active: pathname === "/dashboard/medicines",
                            icon: List,
                        },
                        {
                            href: "/dashboard/medicines/generics",
                            label: "Generics",
                            active: pathname === "/dashboard/medicines/generics",
                            icon: SquareStack,
                        },
                        {
                            href: "/dashboard/medicines/manufacturers",
                            label: "Manufacturers",
                            active: pathname === "/dashboard/medicines/manufacturers",
                            icon: Ambulance,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Appointments",
                    active: pathname.includes("/dashboard/appointments"),
                    icon: Calendar,
                    submenus: [
                        {
                            href: "/dashboard/appointments/new",
                            label: "New",
                            active: pathname === "/dashboard/appointments/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/dashboard/appointments",
                            label: "List",
                            active: pathname === "/dashboard/appointments",
                            icon: List,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Payments",
                    active: pathname.includes("/dashboard/payments"),
                    icon: DollarSign,
                    submenus: [
                        {
                            href: "/dashboard/payments/new",
                            label: "New",
                            active: pathname === "/dashboard/payments/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/dashboard/payments",
                            label: "List",
                            active: pathname === "/dashboard/payments",
                            icon: List,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Services",
                    active: pathname.includes("/dashboard/services"),
                    icon: Dessert,
                    submenus: [
                        {
                            href: "/dashboard/services/new",
                            label: "New",
                            active: pathname === "/dashboard/services/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/dashboard/services",
                            label: "List",
                            active: pathname === "/dashboard/services",
                            icon: List,
                        },
                    ],
                },
            ],
        },
    ];
}