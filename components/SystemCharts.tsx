import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemMetric } from '../types';

const SystemCharts: React.FC = () => {
  const [data, setData] = useState<SystemMetric[]>([]);

  useEffect(() => {
    // Simulate initial data
    const initialData: SystemMetric[] = Array.from({ length: 20 }).map((_, i) => ({
      time: `${10 + i}:00`,
      cpu: 20 + Math.random() * 15,
      memory: 40 + Math.random() * 10,
      network: 10 + Math.random() * 30,
    }));
    setData(initialData);

    // Simulate live updates
    const interval = setInterval(() => {
      setData(prev => {
        const newTime = new Date();
        const newMetric: SystemMetric = {
          time: `${newTime.getHours()}:${newTime.getMinutes()}:${newTime.getSeconds()}`,
          cpu: 30 + Math.random() * 20,
          memory: 45 + Math.random() * 5,
          network: Math.random() * 50,
        };
        return [...prev.slice(1), newMetric];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm flex flex-col">
        <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-twister-500 animate-pulse"></div>
          Swarm CPU Usage (%)
        </h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#475569" fontSize={12} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#38bdf8' }}
              />
              <Area type="monotone" dataKey="cpu" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorCpu)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm flex flex-col">
        <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-twister-accent animate-pulse"></div>
          Memory Allocation (GB)
        </h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#475569" fontSize={12} domain={[0, 100]} tickFormatter={(value) => `${value}G`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#a78bfa' }}
              />
              <Area type="monotone" dataKey="memory" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMem)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SystemCharts;