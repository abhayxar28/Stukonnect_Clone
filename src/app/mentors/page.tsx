import Navbar from "@/components/navbar/navbar";
import MentorCard from "../../components/MentorsCard";
import Footer from "@/components/footer/footer";

export default function Mentors(){
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="flex justify-center items-center mt-15 ">
                <h1 className="text-6xl font-bold text-center">The Mentors</h1>
            </div>
            <div className="py-20 px-25">
                <MentorCard/>   
            </div>
            <div className="mt-10">
                <Footer />
            </div>
        </div>
    )
}