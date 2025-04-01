import Navbar from "@/components/navbar/navbar";
import MentorCard from "../../components/MentorsCard";
import Footer from "@/components/footer/footer";

export default function Mentors(){
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="flex justify-center items-center">
                <h1 className="text-6xl font-bold text-center my-5">The Mentors</h1>
            </div>
            <div className="px-20 my-20">
                <MentorCard/>   
            </div>
            <div className="mt-10">
                <Footer />
            </div>
        </div>
    )
}