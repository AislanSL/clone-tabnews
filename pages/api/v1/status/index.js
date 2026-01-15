import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versionDatabase = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");

  const databaseName = 'local_db'
  const openeedConections = await database.query(`SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`)

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionDatabase.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        open_connections: openeedConections.rows[0].count
      }
    },
  });
}
  
export default status;