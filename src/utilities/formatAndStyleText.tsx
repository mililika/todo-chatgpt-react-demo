export function formatAndStyleText(inputText: string) {
    const lines = inputText.split("\n").filter(Boolean); // filter(Boolean) removes any empty lines
    const elements: JSX.Element[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith("###")) {
            elements.push(<h1 key={i}>{line.slice(3).trim()}</h1>);
        } else if (line.match(/^\d+\./)) {
            const items: JSX.Element[] = [];
            while (lines[i] && lines[i].match(/^\d+\./)) {
                items.push(
                    <li key={i}>{lines[i].split(/\d+\./)[1].trim()}</li>
                );
                i++;
            }
            i--; // Decrease the index to prevent skipping a line
            elements.push(<ul key={i}>{items}</ul>);
        } else {
            // Handle any other cases if necessary
            elements.push(<p key={i}>{line}</p>);
        }
    }

    return <div>{elements}</div>;
}
