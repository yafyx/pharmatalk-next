"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";

import { AuthenticatedNav } from "./authenticated-nav";
import { UnauthenticatedNav } from "./unauthenticated-nav";

export function Navbar() {
  const { user, isLoaded } = useUser();

  return (
    <div
      className={`w-full fixed ${
        isLoaded && user ? "bottom-0" : "top-0"
      } z-50 flex justify-center`}
    >
      {isLoaded && user && (
        <div className="absolute z-[-10] inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}

      {isLoaded && user ? <AuthenticatedNav /> : <UnauthenticatedNav />}
    </div>
  );
}
