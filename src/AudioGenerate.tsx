import  { useState } from "react";

export default function AudioGenerator() {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateAudio = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("project_id", "13333333212121");
            formData.append("text", "Արա Ռուբ ջան ինչ կա ախպերս, ոնց ես");
            formData.append("voice", "Areg");
            formData.append("format", "mp3");

            const response = await fetch("https://wav.am/generate_audio/", {
                method: "POST",
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIxOTI1ZDU3ZDYwZDA0MzBmOTVlNWNlNmIwM2M1MGNhZSIsInVzZXJuYW1lIjoiUnViZW5HYWJyaWVsaWFuIiwiY29ubmVjdGlvbiI6ImFwaSIsImV4cCI6MTc2MTg2ODgwMCwiaWF0IjoxNzU3MDY5ODQxfQ.Ot8NeOf43M0bSkwVjYDL3E-D-ENogREhr_SZ9f-kbMs",
                },
                body: formData,
            });

            console.log(response);
            // if API returns binary MP3
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        } catch (error) {
            console.error("Error generating audio:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={generateAudio}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                {loading ? "Generating..." : "Generate Audio"}
            </button>

            {audioUrl && (
                <div className="mt-4">
                    <audio controls src={audioUrl}></audio>
                </div>
            )}
        </div>
    );
}
