"use client";

import { getUserDetails } from "@/lib/shopify";
import type { user } from "@/lib/shopify/types";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";

// Type-safe Gravatar import
const Gravatar = require("react-gravatar").default;

export const fetchUser = async () => {
  try {
    const accessToken = Cookies.get("token");

    if (!accessToken) {
      return null;
    } else {
      const userDetails: user = await getUserDetails(accessToken);
      const userInfo = userDetails.customer;
      return userInfo;
    }
  } catch (error) {
    // console.log("Error fetching user details:", error);
    return null;
  }
};

const NavUser = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetchUser();
      setUser(userInfo);
    };

    getUser();
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <button
          onClick={toggleDropdown}
          className="relative cursor-pointer text-left sm:text-xs flex items-center justify-center"
        >
          <div className="flex items-center gap-x-1">
            <div className="h-6 w-6 border border-border rounded-full">
              <Gravatar
                email={user?.email}
                style={{ borderRadius: "50px" }}
                key={user?.email}
              />
            </div>
            <div className="leading-none max-md:hidden">
              <div className="flex items-center">
                <p className="block text-text-dark text-base truncate">
                  {user?.firstName?.split(" ")[0]}
                </p>
                <svg
                  className="w-5 text-text-dark"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </button>
      ) : (
        <a
          className="text-xl text-text-dark hover:text-text-primary flex items-center"
          href="/login"
          aria-label="login"
        >
          <BsPerson />
        </a>
      )}

      {dropdownOpen && (
        <div className="z-20 absolute right-0 mt-2 w-48 bg-white border border-border rounded-md shadow-lg py-1">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-text-dark hover:bg-gray-50 hover:text-red-600 transition-colors duration-200 text-left flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavUser;
