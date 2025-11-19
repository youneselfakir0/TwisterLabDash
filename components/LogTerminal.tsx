import React, { useEffect, useState, useRef } from 'react';
import { LogEntry } from '../types';
import { Play, Pause, Trash2 } from 'lucide-react';

const MOCK_LOG_SOURCES = ['twisterlab_api', 'twisterlab_postgres', 'RealMaestroAgent', 'RealMonitoringAgent', 'traefik'];
const MOCK_MESSAGES = [
  'Connection established to redis:6379',
  'Processing ticket #8842 via RealClassifierAgent',
  'Health check passed: CPU usage nominal',
  'Backup initiated for vault-secure',
  'SyncAgent: Reconciling cache state',
  'POST /api/v1/agents/execute 200 OK',
  'Warn: High latency detected on edgeserver node 2',
];

const LogTerminal: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return;

      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        level: Math.random() > 0.9 ? 'WARN' : Math.random() > 0.95 ? 'ERROR' : 'INFO',
        source: MOCK_LOG_SOURCES[Math.floor(Math.random() * MOCK_LOG_SOURCES.length)],
        message: MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)],
      };

      setLogs(prev => [...prev.slice(-50), newLog]); // Keep last 50
      
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="bg-slate-950 rounded-lg border border-slate-800 flex flex-col h-full overflow-hidden font-mono text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          <span className="ml-2 text-slate-400 font-semibold">user@edgeserver:~/logs</span>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setIsPaused(!isPaused)}
             className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
           >
             {isPaused ? <Play size={14}/> : <Pause size={14}/>}
           </button>
           <button 
             onClick={() => setLogs([])}
             className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition"
           >
             <Trash2 size={14}/>
           </button>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 hover:bg-slate-900/50 p-0.5 rounded">
            <span className="text-slate-500 shrink-0">{log.timestamp.split('T')[1].split('.')[0]}</span>
            <span className={`shrink-0 w-12 font-bold ${
              log.level === 'INFO' ? 'text-blue-400' : 
              log.level === 'WARN' ? 'text-yellow-400' : 'text-red-500'
            }`}>{log.level}</span>
            <span className="text-purple-400 shrink-0 w-32 truncate">[{log.source}]</span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-slate-600 italic text-center mt-10">Waiting for system logs...</div>
        )}
      </div>
    </div>
  );
};

export default LogTerminal;
