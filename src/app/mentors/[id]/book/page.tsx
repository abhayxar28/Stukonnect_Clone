import BookingPage from "@/components/BookingPage";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export default function Book() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="mt-4">
                <BookingPage />
            </div>
            <div className="mt-6">
                <Footer />
            </div>
        </div>
    )
}
