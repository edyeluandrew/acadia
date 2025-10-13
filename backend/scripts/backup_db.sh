
#!/bin/bash
set -e
TIMESTAMP=$(date +"%F_%H%M")
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR
PG_HOST=localhost
PG_DB=nyumba
PG_USER=nyumbauser
export PGPASSWORD=your_db_password

pg_dump -Fc -h $PG_HOST -U $PG_USER $PG_DB -f $BACKUP_DIR/nyumba_${TIMESTAMP}.dump
find $BACKUP_DIR -type f -mtime +14 -delete
# optionally upload to S3 if configured
