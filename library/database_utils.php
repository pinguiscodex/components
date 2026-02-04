<?php
/**
 * WebDev Components Library - PHP Database Utilities
 */

require_once 'database.php';

// Database Migration Class
class DatabaseMigration {
    private $dbManager;
    
    public function __construct(DatabaseManager $dbManager) {
        $this->dbManager = $dbManager;
    }
    
    // Create migration table
    public function createMigrationTable() {
        $columns = [
            'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
            'migration_name' => 'VARCHAR(255) NOT NULL UNIQUE',
            'applied_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
        ];
        
        return $this->dbManager->createTable('migrations', $columns);
    }
    
    // Run a migration
    public function runMigration($migrationName, $sql) {
        try {
            $this->dbManager->query($sql);
            
            // Record migration in migrations table
            $this->dbManager->insert('migrations', [
                'migration_name' => $migrationName
            ]);
            
            return true;
        } catch (Exception $e) {
            error_log("Migration failed: " . $e->getMessage());
            return false;
        }
    }
    
    // Check if migration has been applied
    public function hasRun($migrationName) {
        $results = $this->dbManager->select('migrations', ['migration_name' => $migrationName]);
        return count($results) > 0;
    }
}

// Database Seeding Class
class DatabaseSeeder {
    private $dbManager;
    
    public function __construct(DatabaseManager $dbManager) {
        $this->dbManager = $dbManager;
    }
    
    // Seed a table with sample data
    public function seedTable($tableName, $data) {
        $insertedCount = 0;
        
        foreach ($data as $row) {
            if ($this->dbManager->insert($tableName, $row)) {
                $insertedCount++;
            }
        }
        
        return $insertedCount;
    }
    
    // Clear a table
    public function clearTable($tableName) {
        $sql = "DELETE FROM `{$tableName}`";
        try {
            $stmt = $this->dbManager->getConnection()->prepare($sql);
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Error clearing table: " . $e->getMessage());
            return false;
        }
    }
}

// Database Backup Class
class DatabaseBackup {
    private $config;
    
    public function __construct(DatabaseConfig $config) {
        $this->config = $config;
    }
    
    // Create a backup of the database
    public function createBackup($backupFile = null) {
        if (!$backupFile) {
            $backupFile = 'backup_' . date('Y-m-d_H-i-s') . '.sql';
        }
        
        $host = $this->config->getHost();
        $port = $this->config->getPort();
        $username = $this->config->getUsername();
        $password = $this->config->getPassword();
        $database = $this->config->getDatabase();
        
        $command = "mysqldump --host={$host} --port={$port} --user={$username} --password={$password} {$database} > {$backupFile} 2>/dev/null";
        
        $output = [];
        $returnCode = 0;
        exec($command, $output, $returnCode);
        
        if ($returnCode === 0) {
            return $backupFile;
        } else {
            error_log("Database backup failed");
            return false;
        }
    }
    
    // Restore database from backup
    public function restoreFromBackup($backupFile) {
        if (!file_exists($backupFile)) {
            return false;
        }
        
        $host = $this->config->getHost();
        $port = $this->config->getPort();
        $username = $this->config->getUsername();
        $password = $this->config->getPassword();
        $database = $this->config->getDatabase();
        
        $command = "mysql --host={$host} --port={$port} --user={$username} --password={$password} {$database} < {$backupFile} 2>/dev/null";
        
        $output = [];
        $returnCode = 0;
        exec($command, $output, $returnCode);
        
        return $returnCode === 0;
    }
}

// Database Validator Class
class DatabaseValidator {
    private $dbManager;
    
    public function __construct(DatabaseManager $dbManager) {
        $this->dbManager = $dbManager;
    }
    
    // Validate email format
    public function isValidEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
    
    // Validate required fields
    public function validateRequired($data, $requiredFields) {
        $errors = [];
        
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty(trim($data[$field]))) {
                $errors[] = "{$field} is required";
            }
        }
        
        return $errors;
    }
    
    // Validate unique constraint
    public function validateUnique($tableName, $fieldName, $value, $excludeId = null) {
        $conditions = [$fieldName => $value];
        
        if ($excludeId) {
            $conditions['id != '] = $excludeId; // Note: This is a simplified approach
        }
        
        $results = $this->dbManager->select($tableName, $conditions);
        return count($results) === 0;
    }
}

// Example usage:
/*
try {
    // Create database configuration
    $config = new DatabaseConfig('localhost', 'root', '', 'webdev_components');
    
    // Create database connection
    $dbConnection = new DatabaseConnection($config);
    
    // Create database manager
    $dbManager = new DatabaseManager($dbConnection);
    
    // Create migration utility
    $migration = new DatabaseMigration($dbManager);
    $migration->createMigrationTable();
    
    // Create seeder utility
    $seeder = new DatabaseSeeder($dbManager);
    
    // Create validator utility
    $validator = new DatabaseValidator($dbManager);
    
    // Example: Validate an email
    if ($validator->isValidEmail('test@example.com')) {
        echo "Valid email";
    }
    
    // Example: Validate required fields
    $data = ['name' => 'John', 'email' => ''];
    $required = ['name', 'email'];
    $errors = $validator->validateRequired($data, $required);
    
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo $error . "\n";
        }
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
*/
?>