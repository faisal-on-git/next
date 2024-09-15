import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Your Name
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/blog/tech">Tech</Link></li>
          <li><Link href="/blog/non-tech">Non-Tech</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;