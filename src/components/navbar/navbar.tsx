import Link from 'next/link';
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex justify-between items-center w-full pt-20">
                        <div className="flex-shrink-0 flex justify-center items-center gap-2">
                            <Image
                                src="https://www.stukonnect.com/_next/image?url=%2Flogo-gradient-round.png&w=32&q=75"
                                alt="Stukonnect Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <Link href="/">
                                <span className='text-2xl font-black'>
                                    Stukonnect
                                </span>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/mentors"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Mentors
                            </Link>
                            <Link
                                href="/contact"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}