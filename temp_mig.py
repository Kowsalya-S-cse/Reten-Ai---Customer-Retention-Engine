import sqlite3
conn = sqlite3.connect('backend/database.db')
cursor = conn.cursor()
cursor.execute("UPDATE playbook_rules SET domain = 'cinema' WHERE title LIKE 'Cinema%'")
cursor.execute("UPDATE playbook_rules SET domain = 'saas' WHERE title LIKE 'SaaS%'")
cursor.execute("UPDATE playbook_rules SET domain = 'telco' WHERE title LIKE 'Telecom%'")
conn.commit()
conn.close()
print('Seed data updated')
