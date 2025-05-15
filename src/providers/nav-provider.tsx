"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/resizable-navbar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ShoppingCart } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface NavbarProviderProps {
    children: React.ReactNode;
}

export function NavbarProvider({ children }: NavbarProviderProps) {
    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Frames",
            link: "/frames",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart } = useCart();

    return (
        <div className="relative w-full z-50">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody className="hidden md:flex justify-between">
                    <NavbarLogo />
                    <NavItems items={navItems} className="flex-1" />
                    <div className="flex items-center gap-3 z-50">
                        <ModeToggle />
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link href="/cart" className="relative mr-3 md:mr-4">
                                        <ShoppingCart className="w-5 h-5" />
                                        <div className={cn("absolute -top-2 -right-4 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white bg-red-500", cart.length === 0 && "hidden")}>
                                            {cart.length}
                                        </div>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>View your cart</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <Button variant="secondary" asChild>
                                <SignInButton mode="modal">Login</SignInButton>
                            </Button>
                        </SignedOut>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Book a call
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {children}
        </div>
    );
}