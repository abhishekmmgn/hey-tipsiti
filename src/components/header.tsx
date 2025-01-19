import Link from "next/link";
import Image from "next/image";
import tipsitiImg from "../../public/tipsiti-logo.svg";

export async function Header() {
  return (
    <header className="bg-background/90 backdrop-filter backdrop-blur-sm h-14 w-full fixed top-0 inset-x-0 z-50 horizontal-padding border-b">
      <div className="w-full h-full flex items-center justify-between max-w-screen-2xl">
        <Link href="/" className="w-fit text-primary">
          <Image
            src={tipsitiImg}
            alt="Tipsiti Logo"
            width={240}
            height={48}
            className="h-7 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
