import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
            <div className="my-8">
                <Image
                    src="/error.jpg"
                    alt="Page not found"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-xl"
                />
            </div>

            <p className="text-2xl font-semibold mb-4">
                Oops! The page you’re looking for doesn't exist.
            </p>
            <Link href="/">
                <button
                    className="mt-6 px-6 py-3 text-sm font-medium text-white bg-gray-800 dark:bg-gray-100 dark:text-gray-900 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
                >
                    Go back home
                </button>
            </Link>
        </div>
    );
}