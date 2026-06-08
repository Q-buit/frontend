import Link from "next/link";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" aria-label="Q-ubit 홈">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
