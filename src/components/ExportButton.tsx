import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type ExportButtonProps = {
    content: string;
};

const ExportButton = ({ content }: ExportButtonProps) => {
    const [isExporting, setExporting] = useState(false);

    const handleExport = () => {
        setExporting(true);

        try {
        } catch {}
    };

    return isExporting ? (
        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleExport}
        >
            PDF Export
            <LoadingSpinner />
        </button>
    ) : (
        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleExport}
        >
            PDF Export
        </button>
    );
};

export default ExportButton;
