
export default function Navbar(){
    return (
        <div className="h-18 mt-10">
            <div className="flex justify-between px-1 pt-2 items-center h-full">
                <div className="flex justify-center items-center pl-10 gap-2">
                    <div>
                        <img src="https://www.stukonnect.com/_next/image?url=%2Flogo-gradient-round.png&w=32&q=75" alt="Logo"/>
                    </div>
                    <div className="font-extrabold text-xl">
                        <a href="/">StuKonnect</a>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 pr-15">
                    <div className="hover:bg-[#eeedf2] p-3 rounded-lg">
                        <span className="text-center">
                            <a href="/mentors">Find Mentors</a>
                        </span>
                    </div>
                    <div className="hover:bg-[#eeedf2] p-3 rounded-lg">
                        <span className="text-center">
                            <a href="/contact">Contact Us</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}