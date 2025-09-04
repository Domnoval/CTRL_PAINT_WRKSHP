// Sacred Workshop Type Definitions
// Quantum-enforced type safety for mystical collaborative experiences

// Core Workshop Session Types
export type WorkshopPhase = 'lobby' | 'active' | 'summary';
export type ParticipantRole = 'presenter' | 'participant';
export type ConnectionQuality = 'excellent' | 'good' | 'poor';

// Base Entity Types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Workshop Session Interface
export interface WorkshopSession extends BaseEntity {
  sessionId: string;
  title: string;
  presenterId: string;
  participantIds: string[];
  phase: WorkshopPhase;
  scheduledStart: Date;
  actualStart?: Date;
  quantumState: QuantumWorkflowState;
}

// Creative Output Interface
export interface CreativeOutput extends BaseEntity {
  outputId: string;
  sessionId: string;
  participantId: string;
  aiToolUsed: AIToolType;
  contentType: ContentType;
  mysticalPrompt: string;
  outputUrl: string;
  observationCount: number;
  galleryPosition: Position3D;
}

// Participant Interface
export interface Participant extends BaseEntity {
  participantId: string;
  name: string;
  role: ParticipantRole;
  observationStrength: number;
  mysticalPrefs: MysticalInterfacePrefs;
  sessionWifiHealth: ConnectionQuality;
}

// Supporting Types
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface QuantumWorkflowState {
  currentModule: string;
  activePrompts: string[];
  participantStates: Record<string, ParticipantState>;
  meditationLevel: number;
}

export interface ParticipantState {
  isObserving: boolean;
  lastActivity: Date;
  mysticalEnergy: number;
}

export interface MysticalInterfacePrefs {
  vibrationLevel: number;
  colorHarmony: 'warm' | 'cool' | 'mystical';
  glyphLanguage: 'english' | 'enchanted';
  soundAmbiance: boolean;
}

// AI Tool Integration Types
export type AIToolType = 'openai-dalle' | 'midjourney' | 'stable-diffusion';
// Content types for creative outputs
export type ContentType = 'image' | 'audio' | 'text' | 'video';
// Observation types for collaborative interactions
export type ObservationType = 'view' | 'like' | 'collaborate' | 'comment';

// API Request/Response Types
export interface CreateWorkshopRequest {
  title: string;
  scheduledStart: string;
  presenterName: string;
  participantCapacity: number;
}

export interface CreateOutputRequest {
  mysticalPrompt: string;
  aiToolType: AIToolType;
  contentType: ContentType;
}

// Quantum State Management
export interface QuantumAction {
  type: 'OBSERVE' | 'COLLAPSE' | 'MANIFEST';
  payload: Record<string, any>;
}

export interface QuantumContext {
  isCollapsed: boolean;
  probability: number;
  observers: string[];
}

// Mystical Configuration
export const MYSTICAL_CONSTANTS = {
  MAX_PARTICIPANTS: 15,
  QUANTUM_RESONANCE_FREQUENCY: 432, // Hz
  SACRED_GEOMETRY_RATIO: 1.618, // Golden ratio
  DIMENSIONAL_ZONES: 8,
  COSMIC_WEB_CONNECTIONS: 42,
} as const;

// Error Types
export interface QuantumError {
  error: {
    code: 'DIMENSIONAL_GLITCH' | 'WAVEFORM_COLLAPSE' | 'REALITY_BREACH';
    message: string;
    mysticalGuidance: string;
    timestamp: string;
    workshopId: string;
  };
}

// Database schema for Supabase
export interface Database {
  public: {
    Tables: {
      participants: {
        Row: Participant & { id: string };
        Insert: Omit<Participant, 'id'>;
        Update: Partial<Participant>;
      };
      workshops: {
        Row: WorkshopSession & { id: string };
        Insert: Omit<WorkshopSession, 'id'>;
        Update: Partial<WorkshopSession>;
      };
      creative_outputs: {
        Row: CreativeOutput & { id: string };
        Insert: Omit<CreativeOutput, 'id'>;
        Update: Partial<CreativeOutput>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      workshop_phase: WorkshopPhase;
      participant_role: ParticipantRole;
      connection_quality: ConnectionQuality;
    };
  };
}

export default {};
