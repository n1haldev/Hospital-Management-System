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

cursor.execute("insert into patient values(1, 'Nihal T M', 'male', '2002-10-10', '7892896964', 'no insurance')")

results = cursor.fetchall()

for row in results:
    print(row)

connection.commit()

cursor.close()
connection.close()
