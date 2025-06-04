import { Link } from "react-router"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, signInWithGithub, signOut } = useAuth();

    const displayName = user?.user_metadata.full_name || user?.email;

    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className=" px-4 md:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="font-mono text-xl font-bold text-white">
                        con<span className="text-purple-500">.nect</span>
                    </Link>

                    {/*Desktop Menu*/}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/create-post"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Create Post
                        </Link>
                        <Link
                            to="/communities"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Communities
                        </Link>
                        <Link
                            to="/community/create"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Create Community
                        </Link>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                {user.user_metadata?.avatar_url && (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <span className="text-gray-300">{displayName}</span>
                                <button
                                    onClick={signOut}
                                    className="bg-purple-500 px-3 py-1 rounded"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={signInWithGithub}
                                className="bg-purple-500 px-3 py-1 rounded"
                            >
                                Sign in with GitHub
                            </button>
                        )}
                    </div>

                    {/*Mobile Menu Button*/}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen((prev) => !prev)}
                            className="text-gray-300 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/*Mobile Menu*/}
                    {isOpen && (
                        <div className="md:hidden bg-[rgba(10,10,10,0.9)]">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link to="/"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    Home
                                </Link>


                                <Link to="/create-post"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    Create Post
                                </Link>


                                <Link
                                    to="/communities"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    Communities
                                </Link>
                                <Link
                                    to="/community/create"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    Create Community
                                </Link>
                            </div>
                        </div>)}
                </div>
            </div>
        </nav>
    )
}