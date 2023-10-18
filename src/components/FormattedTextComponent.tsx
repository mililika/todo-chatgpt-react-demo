import React from "react";

const ApplyTailwindStyles = (text: string) => {
    text = text.replace(
        /<p>/g,
        '<p class="text-base mt-2 mb-4 dark:text-gray-400">'
    );
    text = text.replace(
        /<h1>/g,
        '<h1 class="font-bold text-3xl mt-6 mb-4 dark:text-white">'
    );
    text = text.replace(
        /<h3>/g,
        '<h3 class="font-semibold text-2xl mt-4 mb-2 dark:text-gray-400">'
    );

    // ... any other styles as required ...

    return text;
};

const FormattedTextComponent: React.FC<{ content: string }> = ({ content }) => {
    const styledContent = ApplyTailwindStyles(content);

    return <div dangerouslySetInnerHTML={{ __html: styledContent }} />;
};

export default FormattedTextComponent;
