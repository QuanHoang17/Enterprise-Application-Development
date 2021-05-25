# Enterprise-Application-Development


## Starting the project:
- Make sure Java 16 is installed
- Make sure the project sdk is Java 16 and language level is 16 or SDK default
- Make sure you are connected to the Internet to use the mail server
- To use localhost database:
  + Create a local postgres database name "gearmit" with the user name "postgres" and password "root" on port 5432
  + Create a schema in "gearmit" name "public"
- To use AWS database:
  + Open application.properties file in "src/main/resources/"
  + Comment out line 5 - 7 (Below comment "#Localhost")
  + Uncomment line 10 - 12 (Below comment "#AWS")
  + To switch back to localhost from AWS, do the opposite
- Open the folder GeaRMIT with Intellij
- Run "create.sql" to drop all table and create table for the schema of database
- Run "populate.sql" to drop all records and add default data to the table of the database
- Run "GeaRmitApplication.java" in "src/main/java/com/group5/gearmit/" with Intellij to run the project
- Open browser and type the link "http://localhost:8080" to visit the website
- To access the admin page: 
  - Go to the login page and login with the username: "admin" and password: "admin". 
  - Before exit the page, make sure to logout or the admin username will be saved to the browser
## Common problem
- Dependency problem: In Intellij in Maven tab, click "Download Sources" -> Click "Reload All Maven Projects"
- Mail Server problem: 
  - Some network block connection to gmail smpt server (Ex: RMIT University network) so connect to a differenct network.
  - If the problem persist: disable firewall and anti virus software.
  - If the problem continue to persist: Comment out line 87 in "CustomerServiceI.java" in "src/main/java/com/group5/gearmit/service".
- AWS database connection problem:
  - Some network block connection to AWS (Ex: RMIT University network) so connect to a different network.
  - If the problem persist, switch back to localhost and contact the group via email.
