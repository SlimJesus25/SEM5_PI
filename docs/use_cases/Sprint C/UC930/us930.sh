#!/bin/bash

# MongoDB connection details
COLLECTION="tarefas"
HOST="vsgate-s1.dei.isep.ipp.pt"
PORT="10242"
USERNAME="mongoadmin"
PASSWORD="aed0452dba3a82201f874542"
BACKUP_FOLDER="/root/bin/mongodumptotal/test_20231206"
LOG_FILE="/root/us930_logs.log"

# MongoDB query
QUERY='{}'

# Execute the query using mongosh
if mongorestore --host "$HOST" --port "$PORT" --username "$USERNAME" --password "$PASSWORD" "$BACKUP_FOLDER" >> "$LOG_FILE" 2>&1; then
        result=$(mongosh --host "$HOST" --port "$PORT" --username "$USERNAME" --password "$PASSWORD" --quiet --eval "db.$COLLECTION.find($QUERY)")
        echo "Query result: $result" >> "$LOG_FILE"
        echo "Mongorestore success" >> "$LOG_FILE"
else
        echo "Mongorestore failed" >> "$LOG_FILE"
fi