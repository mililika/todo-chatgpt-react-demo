import html2pdf from "html2pdf.js";
import { useState } from "react";
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

            // Inline the styles directly (for demonstration purposes, it's done here, but ideally, you'd do this elsewhere)
            element.querySelectorAll("h3").forEach((h3) => {
                h3.style.fontWeight = "bold";
                h3.style.fontSize = "24px";
                h3.style.color = "#000";
                h3.style.marginTop = "16px";
                h3.style.marginBottom = "8px";
            });

            element.querySelectorAll("p").forEach((p) => {
                p.style.fontSize = "16px";
                p.style.marginTop = "8px";
                p.style.marginBottom = "16px";
                p.style.color = "#333";
            });

            // Continue with PDF generation as before
            const opt = {
                margin: 20,
                filename: `${userIdea}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            html2pdf().from(element).set(opt).save();

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
