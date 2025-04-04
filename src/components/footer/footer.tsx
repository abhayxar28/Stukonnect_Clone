import { gabarito } from "@/lib/fonts";
import InstagramIcon from "@/components/icons/InstagramIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";
import Link from "next/link";

export default function Footer() {
    return (
        <div>
            {/* Main Footer Section */}
            <div className={`flex flex-wrap bg-[#fcedd7] py-10 px-6 md:px-10 gap-8 md:gap-[10%] lg:gap-[22%] ${gabarito.className}`}>
                {/* Company Section */}
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                    <div>
                        <span className="text-[#706e6e] font-bold text-md">COMPANY</span>
                    </div>
                    <div className="flex flex-col gap-1.5 text-sm">
                        <Link href="/mentors" className="hover:text-orange-500 transition-colors">The Mentors</Link>
                        <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
                        <Link href="/legal" className="hover:text-orange-500 transition-colors">Legal</Link>
                    </div>
                </div>

                {/* Social Section */}
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                    <div>
                        <span className="text-[#706e6e] font-bold text-md">SOCIAL</span>
                    </div>
                    <div className="flex gap-2">
                        <InstagramIcon />
                        <YoutubeIcon />
                        <LinkedInIcon />
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                    <div>
                        <span className="text-[#706e6e] font-bold text-md">NEWSLETTER</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm">
                            Subscribe for updates on products, mentors, hiring, and resources:
                        </div>
                        {/* Input and Button */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-3">
                            <input 
                                type="text" 
                                className="p-2 w-full sm:w-60 rounded-md border border-white" 
                                placeholder="email@provider.com"
                            />
                            <button className="bg-[#ed7234] text-white rounded-md px-6 py-2 text-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-[#ed7234] text-white px-5 py-4 text-sm">
                StuKonnect © 2025
            </div>
        </div>
    )
}
