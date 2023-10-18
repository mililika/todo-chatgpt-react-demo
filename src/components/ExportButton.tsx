import html2pdf from "html2pdf.js";
import { useState } from "react";
import "../index.css";
import LoadingSpinner from "./LoadingSpinner";

type ExportButtonProps = {
    userIdea: string;
};

const ExportButton = ({ userIdea }: ExportButtonProps) => {
    const [isExporting, setExporting] = useState(false);

    const handleExport = () => {
        setExporting(true);

        try {
            const element = document.getElementById("ai-result-answer");

            if (!element) {
                throw new Error("Couldn't find the content element to export.");
            }

            let new_element = element.cloneNode(true) as HTMLElement;

            new_element.querySelectorAll("*").forEach((node) => {
                node.className = "";
            });

            new_element.querySelectorAll("h3").forEach((h3) => {
                h3.className = "pdf-heading";
            });

            new_element.querySelectorAll("p").forEach((p) => {
                p.className = "pdf-paragraph";
            });

            document.body.appendChild(new_element);

            const opt = {
                margin: 20,
                filename: `${userIdea}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            html2pdf().from(new_element).set(opt).save();

            document.body.removeChild(new_element);

            setExporting(false);
        } catch (error) {
            console.error("Failed to export PDF: ", error);
            setExporting(false);
        }
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
