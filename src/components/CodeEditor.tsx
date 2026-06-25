'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Terminal, HelpCircle } from 'lucide-react';
import { playSuccessSound, playFailureSound } from '@/lib/audio';
import { useGame } from '@/context/GameStateContext';
import { i18n } from '@/lib/i18n';

interface Test {
  description: string;
  testScript: string;
}

interface CodeEditorProps {
  starterCode: string;
  tests: Test[];
  xpReward: number;
  lives: number;
  onSuccess: (xp: number) => void;
  onFailure: () => void;
  onHeal: () => void;
  xp: number;
}

export default function CodeEditor({
  starterCode,
  tests,
  xpReward,
  lives,
  onSuccess,
  onFailure,
  onHeal,
  xp
}: CodeEditorProps) {
  const [code, setCode] = useState(starterCode);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ description: string; passed: boolean | null; error?: string }[]>(
    tests.map(t => ({ description: t.description, passed: null }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [syntaxError, setSyntaxError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineCounterRef = useRef<HTMLDivElement>(null);

  const game = useGame();
  const t = i18n[game.language || 'en'];

  useEffect(() => {
    setCode(starterCode);
    setConsoleLogs([]);
    setSyntaxError(null);
    setTestResults(tests.map(t => ({ description: t.description, passed: null })));
    setIsSuccess(false);
  }, [starterCode, tests]);

  const handleScroll = () => {
    if (textareaRef.current && lineCounterRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleReset = () => {
    setCode(starterCode);
    setConsoleLogs([]);
    setSyntaxError(null);
    setTestResults(tests.map(t => ({ description: t.description, passed: null })));
    setIsSuccess(false);
  };

  const handleRun = async () => {
    if (lives <= 0) {
      alert("⚠️ Out of Hearts!");
      return;
    }

    setIsRunning(true);
    setConsoleLogs([]);
    setSyntaxError(null);

    const logs: string[] = [];
    const customConsole = {
      log: (...args: unknown[]) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      },
      error: (...args: unknown[]) => {
        logs.push('❌ Error: ' + args.join(' '));
      },
      warn: (...args: unknown[]) => {
        logs.push('⚠️ Warn: ' + args.join(' '));
      }
    };

    try {
      let bundledRunner = `
        const console = arguments[0];
        const code = arguments[1];
        
        // User code
        ${code}

        // Test evaluator
        const testResults = [];
      `;

      tests.forEach((test, idx) => {
        bundledRunner += `
          try {
            const testPromise_${idx} = (async () => {
              ${test.testScript}
            })();
            await testPromise_${idx};
            testResults.push({ index: ${idx}, passed: true });
          } catch (err) {
            testResults.push({ index: ${idx}, passed: false, error: err.message });
          }
        `;
      });

      bundledRunner += `\nreturn testResults;`;

      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const runner = new AsyncFunction(bundledRunner);
      
      const results = await runner(customConsole, code);
      
      let allPassed = true;
      const finalResults = tests.map((t, idx) => {
        const res = results.find((r: { index: number }) => r.index === idx);
        if (res && res.passed) {
          return { description: t.description, passed: true };
        } else {
          allPassed = false;
          return { 
            description: t.description, 
            passed: false, 
            error: res ? res.error : "Test failed" 
          };
        }
      });

      setTestResults(finalResults);
      setConsoleLogs(logs);

      if (allPassed) {
        setIsSuccess(true);
        playSuccessSound();
        onSuccess(xpReward);
      } else {
        playFailureSound();
        onFailure();
      }

    } catch (err: unknown) {
      playFailureSound();
      onFailure();
      const errMsg = err instanceof Error ? err.message : String(err);
      setSyntaxError(errMsg);
      setConsoleLogs(prev => [...prev, `❌ Error: ${errMsg}`]);
      setTestResults(tests.map(t => ({ description: t.description, passed: false, error: "Syntax Error" })));
    } finally {
      setIsRunning(false);
    }
  };

  const lineCount = code.split('\n').length;
  const linesArr = Array.from({ length: Math.max(12, lineCount) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-slate-950 border-4 border-double border-retro-peach/30 rounded overflow-hidden shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between bg-slate-950 px-4 py-2.5 border-b-2 border-retro-peach/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 bg-rose-500 block rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-amber-500 block rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-emerald-500 block rounded-full"></span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono ml-2 font-bold uppercase tracking-wider">SPELLBOOK_EDITOR.js</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-bold border border-slate-800 transition cursor-pointer select-none active:translate-y-0.5"
          >
            <RotateCcw className="w-3 h-3" />
            {t.resetEditor}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="flex flex-1 relative min-h-[220px] bg-slate-950/80 font-mono text-sm leading-relaxed overflow-hidden">
        {/* Line Numbers Column */}
        <div 
          ref={lineCounterRef}
          className="w-10 bg-slate-950/40 text-right pr-3 select-none text-slate-600 border-r border-retro-peach/10 py-3 overflow-hidden text-xs"
        >
          {linesArr.map(n => (
            <div key={n} className="h-[21px]">{n}</div>
          ))}
        </div>

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 bg-transparent text-slate-100 p-3 outline-none resize-none overflow-y-auto h-full font-mono text-xs leading-[21px]"
          placeholder="// Declare your mana and variables here..."
          spellCheck="false"
          style={{ tabSize: 2 }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              const newVal = code.substring(0, start) + "  " + code.substring(end);
              setCode(newVal);
              setTimeout(() => {
                if (textareaRef.current) {
                  textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
                }
              }, 0);
            }
          }}
        />
      </div>

      {/* Editor Footer / Run Panel */}
      <div className="border-t-2 border-retro-peach/30 bg-slate-950 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Action Button (Pixel Style) */}
        <button
          onClick={handleRun}
          disabled={isRunning || lives <= 0}
          className={`px-6 py-3 rounded text-white font-game text-[10px] font-bold transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none border-2 pixel-btn cursor-pointer ${
            lives <= 0
              ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed shadow-none'
              : 'bg-retro-orange hover:bg-retro-orange/95 border-retro-peach/40 shadow-[3px_3px_0px_#000]'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t.castingSpell}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              {t.castSpell}
            </span>
          )}
        </button>

        {/* Lives Warning */}
        {lives <= 0 && (
          <div className="flex items-center gap-2 bg-rose-500/10 border-2 border-rose-500/20 text-rose-400 px-3 py-2 rounded text-[10px] font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{t.outOfHearts}</span>
            <button
              onClick={onHeal}
              className="ml-2 px-2.5 py-1 rounded bg-rose-600 text-white font-bold border border-rose-400 hover:bg-rose-700 transition active:translate-y-0.5"
            >
              {t.healBtn}
            </button>
          </div>
        )}
      </div>

      {/* Output Console & Test Results */}
      <div className="border-t-2 border-retro-peach/30 bg-slate-900 grid grid-cols-1 md:grid-cols-2 h-40 overflow-hidden">
        {/* Console Logs */}
        <div className="border-r border-retro-peach/10 flex flex-col h-full overflow-hidden">
          <div className="bg-slate-950 px-3 py-1.5 border-b border-retro-peach/10 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-retro-orange" />
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{t.consoleLogs}</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 font-mono text-[11px] text-slate-300 space-y-1 bg-slate-950/40">
            {consoleLogs.length === 0 ? (
              <p className="text-slate-600 italic">{t.noLogs}</p>
            ) : (
              consoleLogs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap">{log}</div>
              ))
            )}
          </div>
        </div>

        {/* Test Cases Checklist */}
        <div className="flex flex-col h-full overflow-hidden">
          <div className="bg-slate-950 px-3 py-1.5 border-b border-retro-peach/10 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-retro-orange" />
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{t.testChecklist}</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 font-mono text-[11px] space-y-2 bg-slate-950/40">
            {testResults.map((test, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-2 p-1.5 rounded border ${
                  test.passed === true
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                    : test.passed === false
                    ? 'bg-rose-500/5 border-rose-500/20 text-rose-400'
                    : 'bg-slate-950 border-slate-900 text-slate-500'
                }`}
              >
                {test.passed === true ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : test.passed === false ? (
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-700 shrink-0 mt-0.5"></div>
                )}
                <div className="flex-1">
                  <p className="font-bold">{test.description}</p>
                  {test.error && (
                    <p className="text-[9px] opacity-80 mt-0.5 italic">Error: {test.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
