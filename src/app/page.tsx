'use client'

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    const result = await fetch("https://llm-app.davirain-yin.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await result.json();
    let rawResponse = data?.response;

    if (rawResponse.startsWith('？') || rawResponse.startsWith('.')) {
      rawResponse = rawResponse.slice(1).trim();  // 删除第一个字符并去除可能的开头的空格
    }

    const formattedResponse = rawResponse
      .split('\n')
      .map((paragraph: string) => `<p>${paragraph}</p>`)
      .join('');

    setResponse(formattedResponse || "No response.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl text-gray-700 mb-6">LLama Chat</h1>
      <div className="w-4/5 flex flex-col mb-6 space-y-4">
        <textarea
          style={{ color: 'black' }}
          className="w-full h-24 p-3 border rounded resize-none"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="请告诉我一个关于Cloudflare的笑话"
        />
        <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 self-end" onClick={handleAsk}>Ask</button>
      </div>
      <div className="w-4/5 p-5 bg-white rounded shadow-md" dangerouslySetInnerHTML={{ __html: response }}></div>

      {/* Social Links */}
      <div className="mt-6">
        <a href="https://twitter.com/allinonesolana" className="mx-2 text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="mailto:davirain.yin@gmail.com" className="mx-2 text-blue-500 hover:text-blue-600">Email</a>
        <a href="https://github.com/DaviRain-Su" className="mx-2 text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  );
}
