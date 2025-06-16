-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for additional UUID functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enums
CREATE TYPE "public"."user_role" AS ENUM('account_owner', 'church_admin', 'ministry_leader', 'service_coordinator', 'member');
CREATE TYPE "public"."subscription_tier" AS ENUM('tier1', 'tier2', 'tier3');
CREATE TYPE "public"."ministry_icon" AS ENUM('music', 'users', 'heart', 'baby', 'graduation-cap', 'mic', 'cross', 'book-open', 'helping-hand', 'globe', 'coffee', 'calendar', 'star', 'home', 'church');
CREATE TYPE "public"."program_status" AS ENUM('draft', 'planning', 'ready', 'in_progress', 'completed', 'archived');
CREATE TYPE "public"."program_item_type" AS ENUM('welcome', 'prayer', 'song', 'hymn', 'scripture', 'sermon', 'offering', 'communion', 'benediction', 'announcement', 'special_music', 'testimony', 'baptism', 'dedication', 'other');
CREATE TYPE "public"."hymn_category" AS ENUM('worship', 'praise', 'prayer', 'communion', 'christmas', 'easter', 'gospel', 'contemporary', 'traditional', 'children', 'special_occasions', 'other');
CREATE TYPE "public"."copyright_status" AS ENUM('public_domain', 'licensed', 'church_owned', 'permission_required');
CREATE TYPE "public"."notification_type" AS ENUM('service_reminder', 'program_update', 'team_assignment', 'approval_request', 'system_announcement', 'ministry_update', 'event_change', 'feedback_request', 'subscription_update');
CREATE TYPE "public"."notification_priority" AS ENUM('low', 'normal', 'high', 'urgent');

-- Users table
CREATE TABLE IF NOT EXISTS "public"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar(255) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"profile_image_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Accounts table
CREATE TABLE IF NOT EXISTS "public"."accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"owner_id" uuid NOT NULL REFERENCES "public"."users"("id") ON DELETE RESTRICT,
	"subscription_tier" "subscription_tier" DEFAULT 'tier1' NOT NULL,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"subscription_status" varchar(50) DEFAULT 'active',
	"subscription_ends_at" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Churches table
CREATE TABLE IF NOT EXISTS "public"."churches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL REFERENCES "public"."accounts"("id") ON DELETE CASCADE,
	"name" varchar(255) NOT NULL,
	"address" text,
	"city" varchar(100),
	"state" varchar(50),
	"zip_code" varchar(20),
	"country" varchar(100) DEFAULT 'United States',
	"contact_email" varchar(255),
	"contact_phone" varchar(50),
	"website" varchar(255),
	"time_zone" varchar(100) DEFAULT 'America/New_York' NOT NULL,
	"primary_language" varchar(10) DEFAULT 'en' NOT NULL,
	"logo_url" text,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Ministries table
CREATE TABLE IF NOT EXISTS "public"."ministries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"church_id" uuid NOT NULL REFERENCES "public"."churches"("id") ON DELETE CASCADE,
	"name" varchar(255) NOT NULL,
	"description" text,
	"color" varchar(7) NOT NULL,
	"icon" "ministry_icon" DEFAULT 'church' NOT NULL,
	"leader_id" uuid REFERENCES "public"."users"("id") ON DELETE SET NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Service types table
CREATE TABLE IF NOT EXISTS "public"."service_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ministry_id" uuid NOT NULL REFERENCES "public"."ministries"("id") ON DELETE CASCADE,
	"name" varchar(255) NOT NULL,
	"description" text,
	"default_day_of_week" integer,
	"default_time" varchar(8),
	"typical_duration" integer,
	"location" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Event series table
CREATE TABLE IF NOT EXISTS "public"."event_series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_type_id" uuid NOT NULL REFERENCES "public"."service_types"("id") ON DELETE CASCADE,
	"name" varchar(255) NOT NULL,
	"description" text,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"recurrence_pattern" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Service events table
CREATE TABLE IF NOT EXISTS "public"."service_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_type_id" uuid NOT NULL REFERENCES "public"."service_types"("id") ON DELETE CASCADE,
	"series_id" uuid REFERENCES "public"."event_series"("id") ON DELETE SET NULL,
	"name" varchar(255) NOT NULL,
	"event_type" varchar(20) DEFAULT 'one-time' NOT NULL,
	"event_date" timestamp with time zone NOT NULL,
	"start_time" varchar(8) NOT NULL,
	"duration" integer NOT NULL,
	"location" varchar(255),
	"notes" text,
	"special_instructions" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- User permissions table
CREATE TABLE IF NOT EXISTS "public"."user_permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "public"."users"("id") ON DELETE CASCADE,
	"role" "user_role" NOT NULL,
	"church_id" uuid REFERENCES "public"."churches"("id") ON DELETE CASCADE,
	"ministry_id" uuid REFERENCES "public"."ministries"("id") ON DELETE CASCADE,
	"service_type_id" uuid REFERENCES "public"."service_types"("id") ON DELETE CASCADE,
	"granted_by" uuid REFERENCES "public"."users"("id"),
	"granted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_users_clerk_id" ON "public"."users"("clerk_id");
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "public"."users"("email");
CREATE INDEX IF NOT EXISTS "idx_accounts_owner_id" ON "public"."accounts"("owner_id");
CREATE INDEX IF NOT EXISTS "idx_churches_account_id" ON "public"."churches"("account_id");
CREATE INDEX IF NOT EXISTS "idx_ministries_church_id" ON "public"."ministries"("church_id");
CREATE INDEX IF NOT EXISTS "idx_ministries_leader_id" ON "public"."ministries"("leader_id");
CREATE INDEX IF NOT EXISTS "idx_service_types_ministry_id" ON "public"."service_types"("ministry_id");
CREATE INDEX IF NOT EXISTS "idx_service_events_service_type_id" ON "public"."service_events"("service_type_id");
CREATE INDEX IF NOT EXISTS "idx_service_events_event_date" ON "public"."service_events"("event_date");
CREATE INDEX IF NOT EXISTS "idx_user_permissions_user_id" ON "public"."user_permissions"("user_id");
CREATE INDEX IF NOT EXISTS "idx_user_permissions_church_id" ON "public"."user_permissions"("church_id");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "public"."users" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON "public"."accounts" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_churches_updated_at BEFORE UPDATE ON "public"."churches" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ministries_updated_at BEFORE UPDATE ON "public"."ministries" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_types_updated_at BEFORE UPDATE ON "public"."service_types" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_series_updated_at BEFORE UPDATE ON "public"."event_series" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_events_updated_at BEFORE UPDATE ON "public"."service_events" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_permissions_updated_at BEFORE UPDATE ON "public"."user_permissions" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();