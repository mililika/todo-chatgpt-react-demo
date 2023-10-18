import React from "react";
import "../index.css";

const ApplyTailwindStyles = (text: string) => {
    text = text.replace(/<p>/g, '<p class="pdf-paragraph dark:text-gray-300">');
    text = text.replace(
        /<h1>/g,
        '<h1 class="font-bold text-3xl mt-6 mb-4 dark:text-white">'
    );
    text = text.replace(/<h3>/g, '<h3 class="pdf-heading dark:text-white">');

    return text;
};

const FormattedTextComponent: React.FC<{ content: string }> = ({ content }) => {
    const styledContent = ApplyTailwindStyles(content);

    return (
        <div
            id="ai-result-answer"
            dangerouslySetInnerHTML={{ __html: styledContent }}
        />
    );
};

export default FormattedTextComponent;
