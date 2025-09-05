import { Link } from "react-router-dom";
const Footer = () => {
    return (


        <div className="flex justify-between items-start gap-10 px-10 py-24 text-gray-300">

            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold mb-2 underline">About</h1>
                <p className="text-sm mb-3 text-center mx-15">
                    Whether you're a writer looking to express yourself or a reader seeking inspiration, our platform connects people through words.
                </p>
                <p className="text-sm">📧 afiyamadiwale@gmail.com</p>
                <p className="text-sm">📞 8867215857</p>
            </div>

            <div className="w-1/3">
                <h1 className="text-lg font-bold mb-2 underline">Quick Links</h1>
                <ul className="flex flex-col gap-1 text-sm">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <Link to="/about" className="hover:text-white">About</Link>
                    <Link to="/contact" className="hover:text-white">Contact</Link>
                </ul>
            </div>

            <div className="w-1/3">
                <h1 className="text-lg font-bold mb-2 underline mr-5">Category</h1>
                <ul className="flex flex-col gap-1 text-sm">
                    <Link className="hover:text-white">Weather</Link>
                    <Link className="hover:text-white">Lifestyle</Link>
                    <Link className="hover:text-white">Technology</Link>
                    <Link className="hover:text-white">News</Link>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
