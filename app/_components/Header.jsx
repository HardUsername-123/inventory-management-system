import { HardHat, LogOut, PenTool } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className=" bg-myBgDark-lifgtDark mx-5 mt-5 rounded-lg">
      <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-5 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold  text-white">
              <HardHat className="inline-block w-9 h-9 mr-2 text-white" />
              Henry's <span className="text-indigo-600"> Hardware</span>
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <button
              className="inline-block rounded bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              <LogOut className="inline-block w-5 h-5 mr-2" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
