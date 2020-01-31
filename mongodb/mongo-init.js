db.auth('root', 'Root123');
db = db.getSiblingDB('admin');

db.createUser({
	"user": "admin", "pwd":"Admin123", 
	"roles": [  
		{ "role": "userAdminAnyDatabase", "db": "admin" },
		{ "role": "dbAdminAnyDatabase", "db": "admin" },
		{ "role": "readWriteAnyDatabase", "db":"admin" },
		{ "role": "clusterAdmin",  "db": "admin" }
	]
});

db.createUser({
	"user" : "appuser", "pwd": "App123",
	"roles": [
		{ "role": "userAdminAnyDatabase", "db": "admin" },
		{ "role": "dbAdminAnyDatabase", "db": "admin" },
		{ "role": "readWriteAnyDatabase", "db":"admin" }
	]
});
