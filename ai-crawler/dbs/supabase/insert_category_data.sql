-- 清空现有数据
TRUNCATE TABLE navigation_category;

-- 插入新的分类数据
INSERT INTO navigation_category(name, title, sort, del_flag, create_by, create_time) 
VALUES 
('prompt-engineering', 'Prompt Engineering', -1, 0, null, now()),
('security-defense', 'AI Defense', 0, 0, null, now()),
('security-offensive', 'AI Offensive', 1, 0, null, now()),
('security-privacy', 'AI Privacy', 2, 0, null, now()),
('security-code', 'Code Security', 3, 0, null, now()),
('security-deception', 'Deception Security', 4, 0, null, now()),
('security-intelligence', 'Security Intelligence', 5, 0, null, now()),
('data-science', 'Data Science', 10, 0, null, now()),
('research', 'Research AI', 11, 0, null, now()),
('business', 'Business AI', 20, 0, null, now()),
('healthcare', 'Healthcare AI', 21, 0, null, now()),
('education', 'Education AI', 30, 0, null, now()),
('developer', 'Developer AI', 31, 0, null, now()),
('design', 'Design AI', 40, 0, null, now()),
('marketing', 'Marketing AI', 41, 0, null, now()),
('image', 'Image AI', 50, 0, null, now()),
('text', 'Text AI', 51, 0, null, now()),
('audio', 'Audio AI', 52, 0, null, now()),
('video', 'Video AI', 53, 0, null, now()),
('chat', 'Chat AI', 54, 0, null, now()),
('productivity', 'Productivity AI', 55, 0, null, now()),
('other', 'Other Tools', 99, 0, null, now());