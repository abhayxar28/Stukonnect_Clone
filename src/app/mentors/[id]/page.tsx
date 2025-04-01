import Footer from "@/components/footer/footer";
import MentorProfile from "@/components/MentorProfile";
import Navbar from "@/components/navbar/navbar";

export default function Mentor(){
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div className="mt-20">
                <MentorProfile/>
            </div>
            <div className="mt-6">
                <Footer />
            </div>
        </div>
    )
}