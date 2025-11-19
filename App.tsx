import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Server, 
  Activity, 
  ShieldAlert, 
  Settings, 
  Menu,
  Cpu,
  Database,
  Network
} from 'lucide-react';
import { TWISTER_AGENTS } from './constants';
import SystemCharts from './components/SystemCharts';
import ChatInterface from './components/ChatInterface';
import LogTerminal from './components/LogTerminal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden selection:bg-twister-500/30">
      
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-10 transition-all">
        <div>
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
            <div className="w-8 h-8 bg-gradient-to-br from-twister-500 to-twister-accent rounded-lg flex items-center justify-center shadow-lg shadow-twister-500/20">
              <span className="font-bold text-white text-xl">T</span>
            </div>
            <span className="ml-3 font-bold text-lg hidden lg:block tracking-tight">TwisterLab</span>
          </div>

          <nav className="mt-6 px-2 lg:px-4 space-y-1">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'agents', icon: Server, label: 'Agent Registry' },
              { id: 'monitoring', icon: Activity, label: 'Monitoring' },
              { id: 'security', icon: ShieldAlert, label: 'Security' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-twister-500/10 text-twister-400 border border-twister-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : ''} />
                <span className="hidden lg:block font-medium">{item.label}</span>
                {activeTab === item.id && (
                   <div className="ml-auto hidden lg:block w-1.5 h-1.5 rounded-full bg-twister-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
           <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
             <Settings size={20} />
             <span className="hidden lg:block font-medium">Settings</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Bar */}
        <header className="h-16 bg-slate-900/50 backdrop-blur border-b border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-slate-100 capitalize">{activeTab}</h1>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
              System Operational
            </span>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                   <Database size={14} />
                   <span>PostgreSQL: Online</span>
                </div>
                <div className="flex items-center gap-2">
                   <Cpu size={14} />
                   <span>Swarm: Active</span>
                </div>
             </div>
             <button 
               onClick={() => setIsChatOpen(!isChatOpen)}
               className={`p-2 rounded-lg transition-colors ${isChatOpen ? 'bg-twister-500 text-white shadow-lg shadow-twister-500/25' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
             >
               <Menu size={20} />
             </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-800">
          
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Activity size={48} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Active Agents</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-2">8<span className="text-slate-500 text-lg">/8</span></h3>
                  <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Orchestrator Healthy
                  </div>
               </div>
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Network size={48} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Swarm Nodes</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-2">1<span className="text-slate-500 text-lg"> (edgeserver)</span></h3>
                  <div className="mt-4 flex items-center gap-2 text-xs text-twister-400">
                    <span className="w-2 h-2 rounded-full bg-twister-400"></span>
                    Docker Swarm Active
                  </div>
               </div>
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Database size={48} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Pending Tickets</p>
                  <h3 className="text-3xl font-bold text-slate-100 mt-2">0</h3>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    RealResolverAgent Idle
                  </div>
               </div>
            </div>

            {/* Charts Row */}
            <div className="h-72">
               <SystemCharts />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[500px]">
               
               {/* Left: Agent Grid */}
               <div className="xl:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col">
                  <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                    <Server className="text-twister-500" size={20}/> 
                    Agent Status
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                    {TWISTER_AGENTS.map(agent => (
                      <div key={agent.id} className="bg-slate-950 border border-slate-800 p-4 rounded-lg hover:border-twister-500/50 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-slate-200 group-hover:text-twister-400 transition-colors">{agent.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                            agent.status === 'RUNNING' ? 'bg-green-500/20 text-green-400' :
                            agent.status === 'INITIALIZING' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-slate-700 text-slate-400'
                          }`}>
                            {agent.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3 h-8 line-clamp-2">{agent.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-600 border-t border-slate-800/50 pt-2">
                           <span>v{agent.version}</span>
                           <span>{agent.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Right: Logs */}
               <div className="xl:col-span-1 h-full">
                 <LogTerminal />
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Overlay */}
      <div className={`fixed right-0 top-0 h-full transition-transform duration-300 transform z-30 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <ChatInterface />
      </div>
    </div>
  );
}

export default App;