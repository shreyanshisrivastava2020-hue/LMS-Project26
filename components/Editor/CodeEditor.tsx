"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Play } from "lucide-react";

type LanguageOption = {
  id: number;
  value: string;
  label: string;
  template: string;
};

const languages: LanguageOption[] = [
  {
    id: 63,
    value: "javascript",
    label: "JavaScript",
    template: `console.log("Hello, World!");`,
  },
  {
    id: 71,
    value: "python",
    label: "Python",
    template: `print("Hello, World!")`,
  },
  {
    id: 54,
    value: "cpp",
    label: "C++",
    template: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  {
    id: 62,
    value: "java",
    label: "Java",
    template: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
];

export default function CodeEditor() {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [code, setCode] = useState(selectedLang.template);
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          language_id: selectedLang.id,
        }),
      });

      const data = await res.json();

      console.log("FULL RESPONSE:", data);

      setOutput(
        data.stdout ||
          data.stderr ||
          data.compile_output ||
          data.message ||
          "No output",
      );
    } catch (err) {
      setOutput("Execution failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (value: string) => {
    const lang = languages.find((l) => l.value === value)!;
    setSelectedLang(lang);
    setCode(lang.template);
  };

  return (
    <div className="p-6 bg-gray-600 min-h-screen space-y-4 text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Code Playground</h1>

        <Select value={selectedLang.value} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.id} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CODE EDITOR */}
        <Card className="rounded-2xl overflow-hidden border shadow-md flex flex-col">
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-background">
            <span className="text-lg font-semibold">Editor</span>

            <Button
              onClick={runCode}
              disabled={loading}
              size="sm"
              className="gap-2"
            >
              <Play size={14} />
              {loading ? "Running..." : "Run Code"}
            </Button>
          </div>

          {/* EDITOR */}
          <div className="flex-1">
            <Editor
              height="70vh"
              language={selectedLang.value}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </Card>

        {/* OUTPUT PANEL */}
        <Card className="rounded-2xl border shadow-md flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-semibold">Output</CardTitle>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-xl h-[70vh] overflow-auto whitespace-pre-wrap">
              {output || "Run your code to see output here..."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
