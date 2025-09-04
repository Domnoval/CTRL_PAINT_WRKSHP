-- Sacred Quantum Workshop Database Schema
-- PostgreSQL schema for mystical AI creativity collaboration
-- Implements the quantum observation model for artistic manifestation

-- Extensions for enhanced mystical capabilities
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Core Participants Table
-- Sacred individuals with mystical observation capabilities
CREATE TABLE participants (
    participant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role participant_role NOT NULL DEFAULT 'participant',
    observation_strength INTEGER DEFAULT 0,
    mystical_prefs JSONB DEFAULT '{}',
    session_wifi_health connection_quality DEFAULT 'good',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mystic Workshop Sessions
-- Quantum holding spaces for creative manifestation
CREATE TABLE workshop_sessions (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    presenter_id UUID NOT NULL REFERENCES participants(participant_id),
    participant_ids UUID[] NOT NULL DEFAULT '{}',
    phase workshop_phase NOT NULL DEFAULT 'lobby',
    scheduled_start TIMESTAMPTZ NOT NULL,
    actual_start TIMESTAMPTZ,
    quantum_state JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Creative Artifacts Manifestation
-- AI-generated mystery with mystical metadata
CREATE TABLE creative_outputs (
    output_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES workshop_sessions(session_id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES participants(participant_id) ON DELETE CASCADE,
    ai_tool_used ai_tool_type NOT NULL,
    content_type content_type NOT NULL,
    mystical_prompt TEXT NOT NULL,
    output_url TEXT NOT NULL,
    observation_count INTEGER DEFAULT 0,
    gallery_position JSONB DEFAULT '{"x": 0, "y": 0, "z": 0}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quantum Observations
-- Participant interactions with creative outputs (animations, comments, etc.)
CREATE TABLE observations (
    observation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    output_id UUID NOT NULL REFERENCES creative_outputs(output_id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES participants(participant_id) ON DELETE CASCADE,
    observation_type observation_type NOT NULL,
    comment TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(output_id, participant_id, observation_type)
);

-- Workshop Session Archives
-- Historical workshop data for analytics and learning
CREATE TABLE workshop_archives (
    archive_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES workshop_sessions(session_id) ON DELETE SET NULL,
    archive_metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Tool Usage Tracking
-- Mystical resource management and cost optimization
CREATE TABLE ai_tool_usage (
    usage_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID REFERENCES participants(participant_id),
    ai_tool ai_tool_type,
    tokens_used INTEGER DEFAULT 0,
    cost_incurred DECIMAL(10,6) DEFAULT 0.000000,
    operation_type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes for Quantum Speed
-- Sacred database acceleration for mystical performance
CREATE INDEX idx_participants_observation ON participants(observation_strength DESC);
CREATE INDEX idx_sessions_presenter ON workshop_sessions(presenter_id);
CREATE INDEX idx_sessions_phase ON workshop_sessions(phase);
CREATE INDEX idx_sessions_timing ON workshop_sessions(scheduled_start);
CREATE INDEX idx_outputs_session ON creative_outputs(session_id);
CREATE INDEX idx_outputs_participant ON creative_outputs(participant_id);
CREATE INDEX idx_outputs_observations ON creative_outputs(observation_count DESC);
CREATE INDEX idx_observations_output ON observations(output_id);
CREATE INDEX idx_observations_participant ON observations(participant_id);

-- Row Level Security Policies for Sacred Protection
-- Mystical access control for workshop privacy
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE creative_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;

-- Function for Quantum Participant Identification
-- Sacred participant resolution for mystical workflows
CREATE OR REPLACE FUNCTION get_participant_role(participant_uuid UUID, session_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if participant is presenter
    IF EXISTS (
        SELECT 1 FROM workshop_sessions
        WHERE session_id = session_uuid AND presenter_id = participant_uuid
    ) THEN
        RETURN 'presenter';
    END IF;

    -- Check if participant is in session
    IF participant_uuid = ANY(ARRAY(
        SELECT UNNEST(participant_ids) FROM workshop_sessions
        WHERE session_id = session_uuid
    )) THEN
        RETURN 'participant';
    END IF;

    RETURN 'visitor';
END;
$$;

-- Trigger for Automatic Timestamp Updates
-- Sacred temporal quantum synchronization
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply temporal synchronization triggers
CREATE TRIGGER update_participants_updated_at BEFORE UPDATE
    ON participants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workshop_sessions_updated_at BEFORE UPDATE
    ON workshop_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creative_outputs_updated_at BEFORE UPDATE
    ON creative_outputs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View for Workshop Analytics
-- Mystical dashboard insights for quantum observation
CREATE VIEW workshop_analytics AS
SELECT
    ws.session_id,
    ws.title,
    ws.phase,
    COUNT(DISTINCT ws.participant_ids) as participant_count,
    COUNT(co.output_id) as output_count,
    COUNT(obs.observation_id) as observation_count,
    AVG(p.observation_strength) as avg_participant_engagement,
    ws.created_at
FROM workshop_sessions ws
LEFT JOIN participants p ON p.participant_id = ANY(ws.participant_ids)
LEFT JOIN creative_outputs co ON co.session_id = ws.session_id
LEFT JOIN observations obs ON obs.output_id = co.output_id
GROUP BY ws.session_id, ws.title, ws.phase, ws.created_at;

-- Function for Workshop Sacred Summary
-- Quantum workshop completion analytics
CREATE OR REPLACE FUNCTION get_workshop_sacred_summary(session_uuid UUID)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'session_info', jsonb_build_object(
            'session_id', ws.session_id,
            'title', ws.title,
            'phase', ws.phase,
            'participant_count', array_length(ws.participant_ids, 1),
            'duration_minutes', EXTRACT(EPOCH FROM (ws.actual_start - ws.created_at))/60
        ),
        'creation_stats', jsonb_build_object(
            'total_outputs', COUNT(co.output_id),
            'outputs_per_participant', COUNT(co.output_id)::float /
                                   GREATEST(array_length(ws.participant_ids, 1), 1),
            'avg_observations_per_output', AVG(co.observation_count)
        ),
        'mystical_engagement', jsonb_build_object(
            'avg_participant_engagement', AVG(p.observation_strength),
            'total_observations', COUNT(obs.observation_id),
            'harmony_score', LEAST(
                COUNT(DISTINCT obs.participant_id)::float /
                GREATEST(array_length(ws.participant_ids, 1), 1),
                1.0
            ) * 100
        )
    ) INTO result
    FROM workshop_sessions ws
    LEFT JOIN participants p ON p.participant_id = ANY(ws.participant_ids)
    LEFT JOIN creative_outputs co ON co.session_id = ws.session_id
    LEFT JOIN observations obs ON obs.output_id = co.output_id
    WHERE ws.session_id = session_uuid
    GROUP BY ws.session_id, ws.title, ws.phase, ws.participant_ids,
             ws.actual_start, ws.created_at;

    RETURN result;
END;
$$;

-- Notification Functions for Mystical Updates
-- Real-time quantum state synchronization
CREATE OR REPLACE FUNCTION notify_mystical_observation()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('mystical_observation', json_build_object(
        'output_id', NEW.output_id,
        'participant_id', NEW.participant_id,
        'observation_type', NEW.observation_type
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply mystical notification triggers
CREATE TRIGGER notify_mystical_observation_trigger
    AFTER INSERT OR UPDATE ON observations
    FOR EACH ROW EXECUTE FUNCTION notify_mystical_observation();

-- Sacred Data Validation Constraints
-- Quantum integrity enforcement
ALTER TABLE creative_outputs ADD CONSTRAINT valid_content_type
    CHECK (content_type IN ('image', 'audio', 'text', 'video'));

ALTER TABLE observations ADD CONSTRAINT valid_observation_type
    CHECK (observation_type IN ('view', 'like', 'collaborate', 'comment'));

-- Grant permissions for quantum access
-- Sacred role-based mystical access
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Reserved for quantum workshop administrator
-- Sacred service role access
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;

COMMENT ON DATABASE postgresql IS 'Sacred Quantum Workshop - Mystical AI Creativity Manifestation';
