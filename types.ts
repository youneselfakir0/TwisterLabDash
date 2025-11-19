export enum AgentStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  ERROR = 'ERROR',
  INITIALIZING = 'INITIALIZING',
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  version: string;
  type: 'Production' | 'Support';
}

export interface SystemMetric {
  time: string;
  cpu: number;
  memory: number;
  network: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  source: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}
