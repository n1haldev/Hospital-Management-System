import mysql.connector

user = "root"
password = "Il0vemym0m?"
database = "hms"

connection = mysql.connector.connect(
    user = user,
    password = password,
    database = database
)

cursor = connection.cursor()

cursor.execute("create table dummy(id int primary key)")

results = cursor.fetchall()

for row in results:
    print(row)

connection.commit()

cursor.close()
connection.close()
