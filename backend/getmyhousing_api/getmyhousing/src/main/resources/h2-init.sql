MERGE INTO users (
  email,
  password,
  full_name,
  mobile_number,
  whatsapp_number,
  country,
  state,
  district,
  city,
  password_change_on_login,
  status,
  created_date,
  updated_date,
  pincode,
  country_code
) KEY(email) VALUES (
  'admin@getmyhousing.com',
  '$2y$10$A.qQgnuMYDwKDwLFTxiMBuY27bYlC.WOfq9L3QQYYekw5yxS/VYoe',
  'Local Admin',
  '9999999999',
  '9999999999',
  'India',
  'Karnataka',
  'Bengaluru Urban',
  'Bengaluru',
  'No',
  'Active',
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP(),
  '560001',
  '+91'
);

UPDATE users
SET created_by = id,
    updated_by = id
WHERE email = 'admin@getmyhousing.com'
  AND (created_by IS NULL OR updated_by IS NULL);

INSERT INTO user_roles (user_id, role, status, created_date, created_by, updated_date, updated_by)
SELECT u.id, 'Admin', 'Active', CURRENT_TIMESTAMP(), u.id, CURRENT_TIMESTAMP(), u.id
FROM users u
WHERE u.email = 'admin@getmyhousing.com'
  AND NOT EXISTS (
    SELECT 1
    FROM user_roles ur
    WHERE ur.user_id = u.id AND ur.role = 'Admin'
  );

INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Apartment', '', 1, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Apartment');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Builder Floor', '', 2, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Builder Floor');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Pent House', '', 3, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Pent House');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Studio Flat', '', 4, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Studio Flat');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Serviced Apartment', '', 5, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Serviced Apartment');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Residential Building', '', 6, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Residential Building');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'PG Building', '', 7, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'PG Building');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'PG/Co-Living', '', 8, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'PG/Co-Living');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Independent House/Bungalow', '', 9, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Independent House/Bungalow');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Villa', '', 10, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Villa');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Row House', '', 11, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Row House');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Farm House', '', 12, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Farm House');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Farm Plot/Land', '', 13, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Farm Plot/Land');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Residential', 'Residential Plot/Land', '', 14, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Residential' AND property_sub_type = 'Residential Plot/Land');

INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Co-Working Space', '', 1, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Co-Working Space');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Office Space', '', 2, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Office Space');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Office Space In IT Park/SEZ', '', 3, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Office Space In IT Park/SEZ');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Commercial Building', '', 4, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Commercial Building');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Retail Shop/Showroom', '', 5, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Retail Shop/Showroom');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Guest House/Banquet Hall', '', 6, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Guest House/Banquet Hall');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Hotel/Resorts', '', 7, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Hotel/Resorts');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Shopping Mall', '', 8, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Shopping Mall');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Rooftop', '', 9, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Rooftop');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Preleased Properties', '', 10, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Preleased Properties');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Estate/Plantation', '', 11, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Estate/Plantation');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Commercial', 'Commercial Plot/Land', '', 12, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Commercial' AND property_sub_type = 'Commercial Plot/Land');

INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Industrial', 'Shed/Factory', '', 1, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Industrial' AND property_sub_type = 'Shed/Factory');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Industrial', 'Warehouse/Godown', '', 2, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Industrial' AND property_sub_type = 'Warehouse/Godown');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Industrial', 'Industrial Building', '', 3, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Industrial' AND property_sub_type = 'Industrial Building');
INSERT INTO property_types (property_type, property_sub_type, property_sub_type_icon_path, property_rank_order, property_type_icon_path, status, created_date, created_by, updated_date, updated_by)
SELECT 'Industrial', 'Industrial Plot/Land', '', 4, '', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM property_types WHERE property_type = 'Industrial' AND property_sub_type = 'Industrial Plot/Land');

INSERT INTO country_pincode_mapping (country, state, district, pincode, status, created_date, created_by, updated_date, updated_by)
SELECT 'India', 'Karnataka', 'Bengaluru Urban', '560001', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM country_pincode_mapping WHERE country = 'India' AND state = 'Karnataka' AND district = 'Bengaluru Urban' AND pincode = '560001');
INSERT INTO country_pincode_mapping (country, state, district, pincode, status, created_date, created_by, updated_date, updated_by)
SELECT 'India', 'Karnataka', 'Mysuru', '570001', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM country_pincode_mapping WHERE country = 'India' AND state = 'Karnataka' AND district = 'Mysuru' AND pincode = '570001');
INSERT INTO country_pincode_mapping (country, state, district, pincode, status, created_date, created_by, updated_date, updated_by)
SELECT 'India', 'Tamil Nadu', 'Chennai', '600001', 'Active', CURRENT_TIMESTAMP(), 1, CURRENT_TIMESTAMP(), 1
WHERE NOT EXISTS (SELECT 1 FROM country_pincode_mapping WHERE country = 'India' AND state = 'Tamil Nadu' AND district = 'Chennai' AND pincode = '600001');
