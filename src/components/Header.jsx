import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Stack.png";
import CurrentDate from "./CurrentDate";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="border-t border-gray-100">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
        {/* Logo and date */}
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

        {/* Client-side authentication */}
        <AuthButtons />
      </div>

      {/* Server-side category navigation */}
      <NavLinks />
    </header>
  );
};

export default Header;