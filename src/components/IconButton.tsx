"use client";
import React from "react";
import Link from "next/link";

const IconButton = ({
  href,
  name,
  iconName,
  iconColor,
  openInNewTab = false, // New prop with a default value
}: {
  href: string;
  name: string;
  iconName: string;
  iconColor: string;
  openInNewTab?: boolean; // Optional prop to control new tab behavior
}) => {
  return (
    <div className="flex flex-col text-center items-center gap-y-2">
      <Link
        href={href}
        target={openInNewTab ? "_blank" : "_self"} // Use target based on prop
        rel={openInNewTab ? "noopener noreferrer" : undefined} // Secure new tabs
      >
        <button className="flex items-center justify-center w-12 h-12 rounded-2xl drop-shadow-sm border border-gray-300 hover:bg-gray-100">
          <i className={`${iconName} text-2xl mt-1 ${iconColor}`}></i>
        </button>
      </Link>
      <span className="text-sm">{name}</span>
    </div>
  );
};

export default IconButton;
