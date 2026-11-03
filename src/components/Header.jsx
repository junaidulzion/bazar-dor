
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Stack.png";
import CurrentDate from "./CurrentDate";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="border-t border-gray-100">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
        {/* Left side: Logo and date */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={Logo}
            height={50}
            width={50}
            alt="Bazar Dor Logo"
          />

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              বাজার দর
            </h2>
            <CurrentDate />
          </div>
        </Link>

        {/* Right side: Authentication buttons */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/signin"
            className="rounded-lg border border-green-600 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 sm:px-4"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700 sm:px-4"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

        <NavLinks/>
    </header>
  );
};

export default Header;