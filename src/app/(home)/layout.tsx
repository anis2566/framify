import { NavbarProvider } from "@/providers/nav-provider";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return <NavbarProvider>{children}</NavbarProvider>;
};

export default HomeLayout;
