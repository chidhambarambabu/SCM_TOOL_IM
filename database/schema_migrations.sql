-- Migration Script: CR-004 Database Donation Fields
-- SCM Change Request: CR-004
-- Author: Dravid Anand B (23MIS0036)

ALTER TABLE donations 
ADD COLUMN IF NOT EXISTS storage_req ENUM('REFRIGERATED', 'HOT_INSULATED', 'AMBIENT') DEFAULT 'AMBIENT',
ADD COLUMN IF NOT EXISTS allergen_info VARCHAR(255) DEFAULT 'None',
ADD COLUMN IF NOT EXISTS packaging_type VARCHAR(100) DEFAULT 'Eco-Friendly Containers';

-- Audit trail entry for SCM Status Accounting
INSERT INTO scm_audit_log (configuration_item_id, action_type, version, commit_sha, author, change_request_id)
VALUES ('CI-05', 'MODIFICATION', 'v1.1', 'git-commit-cr004-hash', 'Dravid Anand B', 'CR-004');
