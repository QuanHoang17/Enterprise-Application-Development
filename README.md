# Enterprise-Application-Development


## Starting the project for the first time:
- Make sure Java 16 is installed
- To use localhost database:
  + Create a local postgres database name "geaRMIT" with the user name "postgres" and password "root"
  + Create a schema in "geaRMIT" name "public"
- To use AWS database:
  + Open application.properties file in "src/main/resources/"
  + Comment out line 5 - 7 (Below comment "#Localhost")
  + Uncomment line 10 - 12 (Below comment "#AWS")
  + To switch back to localhost from AWS, do the opposite
- Run "create.sql" to create table for the database
- Run "populate.sql" to add data to the table of the database
- Run "GeaRmitApplication.java" in "src/main/java/com/group5/gearmit/" with Intellij to run the project
- Open browser and type the link "http://localhost:8080" to visit the website
## Common problem
- Dependency problem: In Intellij in Maven tab, click "Download Sources" -> Click "Reload All Maven Projects"
