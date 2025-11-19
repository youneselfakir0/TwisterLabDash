import { Agent, AgentStatus } from './types';

export const TWISTER_AGENTS: Agent[] = [
  {
    id: 'maestro',
    name: 'RealMaestroAgent',
    description: 'Workflow orchestration and load balancing',
    status: AgentStatus.RUNNING,
    version: '1.0.0',
    type: 'Production',
  },
  {
    id: 'monitor',
    name: 'RealMonitoringAgent',
    description: 'System health checks (CPU/RAM/Docker)',
    status: AgentStatus.RUNNING,
    version: '1.2.1',
    type: 'Production',
  },
  {
    id: 'classifier',
    name: 'RealClassifierAgent',
    description: 'Ticket classification and routing',
    status: AgentStatus.IDLE,
    version: '1.0.0',
    type: 'Production',
  },
  {
    id: 'resolver',
    name: 'RealResolverAgent',
    description: 'SOP execution for issue resolution',
    status: AgentStatus.IDLE,
    version: '1.1.0',
    type: 'Production',
  },
  {
    id: 'backup',
    name: 'RealBackupAgent',
    description: 'Automated backups with DR',
    status: AgentStatus.IDLE,
    version: '1.0.5',
    type: 'Production',
  },
  {
    id: 'sync',
    name: 'RealSyncAgent',
    description: 'Cache/DB synchronization',
    status: AgentStatus.RUNNING,
    version: '1.0.2',
    type: 'Production',
  },
  {
    id: 'desktop',
    name: 'RealDesktopCommander',
    description: 'Remote system command execution',
    status: AgentStatus.INITIALIZING,
    version: '0.9.5',
    type: 'Production',
  },
  {
    id: 'browser',
    name: 'BrowserAgent',
    description: 'Web automation and scraping',
    status: AgentStatus.IDLE,
    version: '1.0.0',
    type: 'Production',
  },
];

export const SYSTEM_PROMPT = `
You are the TwisterLab AI Assistant, integrated into the v1.0.0 Orchestrator.
Your core principles are: Production-First, Real Infrastructure usage (Docker Swarm, Postgres, Redis), and Security-Conscious.
You have access to the following agents: RealMonitoringAgent, RealBackupAgent, RealSyncAgent, RealClassifierAgent, RealResolverAgent, RealDesktopCommanderAgent, RealMaestroAgent, BrowserAgent.
The infrastructure runs on edgeserver.twisterlab.local.
Answer queries about the system status, deployment scripts (infrastructure/scripts/deploy.ps1), and architecture.
Keep responses concise and technical.
`;
