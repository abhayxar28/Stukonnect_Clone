import Footer from "..//components/footer/footer";
import MainComponent from "../components/main/main";
import Navbar from "../components/navbar/navbar";

export default function Home() {
  return (
    <div className="bg-white h-screen text-black dark:bg-black flex flex-col ">
      <Navbar />
      <MainComponent />
      <Footer />
    </div>
  );
}



