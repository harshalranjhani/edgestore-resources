"use client";
import * as React from "react";
import { useEdgeStore } from "../lib/edgestore";
import Link from "next/link";
export default function Page() {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number | null>(null);
  const [url, setUrl] = React.useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  return (
    <div className="m-20">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          setUrl(null);
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
                setProgress(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
            setUrl(res.url);
            setProgress(null);
          }
        }}
      >
        Upload
      </button>
      <div className="mt-10">
      {progress !== null && <div>Progress: {progress}%</div>}
      {url && (
        <div>
          URL: <Link href={url}>{url}</Link>
        </div>
      )}
      </div>
    </div>
  );
}

