import InstagramIcon from "@/components/icons/InstagramIcon";
import { gabarito } from "@/lib/fonts";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Link from "next/link";

export default function Contact(){
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className={`flex justify-center items-center flex-col mt-10  ${gabarito.className}`}>
                <div className="text-6xl font-bold">
                    <h1>Contact Us</h1>
                </div>
                <div className="flex flex-col justify-center items-center mt-5 font-extralight">
                    <div className="font-bold mb-2">Interested in becoming a mentor?</div>
                    <div>We're always looking for exceptional individuals to join our mentor community! Fill out our <Link href="/https://docs.google.com/forms/d/e/1FAIpQLSetxi-VMSkyWFDca-VOFFuIG0AMNypjDN5Egr0mZRvIZPbdaw/viewform"  target="_blank" rel="noopener noreferrer" className="text-[#ed7234] underline">Mentor Expression of Interest Form</Link> to get started.</div>
                </div>
                <div className="flex flex-col justify-center items-center mt-6 font-extralight">
                    <div className="font-bold mb-2">Had a fantastic experience with Stukonnect?</div>
                    <div>We'd love to feature your testimonial on our platform and socials to help others see the impact! Share your story through our <Link href="/https://forms.gle/akFd8tYQYAXqAe2R6" target="_blank" rel="noopener noreferrer" className="text-[#ed7234] underline">Testimonial Form </Link>💡✨</div>
                </div>
                <div className="flex flex-col justify-center items-center mt-6 font-extralight">
                    <div className="font-bold mb-2">Anything else?</div>
                    <div>Got a question, suggestion, bug report or just want to say hi? Reach us at <span className="font-bold">founders@stukonnect.com</span></div>
                </div>

                <div className="flex flex-col justify-center items-center mt-8 font-extralight">
                    <div className="text-6xl font-bold mb-2">Our Socials</div>
                    <div className="mb-3">We're always sharing valuable content on our socials, from the latest mentor and product updates to insightful podcasts with students studying abroad.</div>
                    <div>No matter where you are in your journey, our social channels are an easy way to stay informed about different universities and gain clarity on the best path forward for you!</div>
                </div>
                <div className="flex flex-col justify-center items-center mt-6 font-extralight">
                    <div>
                        Plus (if you care) you follow the journey of us building this :)
                    </div>
                    <div className="flex items-center mt-2">
                        <InstagramIcon />
                        <LinkedInIcon />
                        <YoutubeIcon />
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}