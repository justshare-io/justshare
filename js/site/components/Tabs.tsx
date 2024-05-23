import {useEffect, useState} from "react";

export const Tabs: React.FC<{
    className?: string;
    sources: { [name: string]: React.ReactNode };
}> = ({ sources , className}) => {
    const [selected, setSelected] = useState<string>(Object.keys(sources)[0]);
    return (
        <div className={className}>
            <div className="tabs tabs-bordered my-6">
                {Object.entries(sources).map(([name, _content], index) => (
                    <a
                        className={`tab ${selected === name ? 'tab-active' : ''}`}
                        key={index}
                        onClick={() => setSelected(name)}
                    >
                        {name}
                    </a>
                ))}
            </div>
            {sources[selected]}
        </div>
    );
};