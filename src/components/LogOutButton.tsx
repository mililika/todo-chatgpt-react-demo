import { auth } from "../services/firebase";

const LogOutButton = () => {
    const handleLogOut = async (e: any) => {
        e.preventDefault();

        try {
            await auth.signOut();
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleLogOut}
        >
            Log Out
        </button>
    );
};

export default LogOutButton;
