<?php
/**
 * WebDev Components Library - PHP Database Components
 */

// Database Configuration Class
class DatabaseConfig {
    private $host;
    private $username;
    private $password;
    private $database;
    private $port;

    public function __construct($host = 'localhost', $username = 'root', $password = '', $database = 'webdev_components', $port = 3306) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        $this->port = $port;
    }

    public function getHost() {
        return $this->host;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getDatabase() {
        return $this->database;
    }

    public function getPort() {
        return $this->port;
    }
}

// Database Connection Class
class DatabaseConnection {
    private $connection;
    private $config;

    public function __construct(DatabaseConfig $config) {
        $this->config = $config;
        $this->connect();
    }

    private function connect() {
        try {
            $dsn = "mysql:host={$this->config->getHost()};port={$this->config->getPort()};dbname={$this->config->getDatabase()}";
            $this->connection = new PDO($dsn, $this->config->getUsername(), $this->config->getPassword());
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            throw new Exception("Connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->connection;
    }

    public function close() {
        $this->connection = null;
    }
}

// Database Manager Class
class DatabaseManager {
    private $connection;

    public function __construct(DatabaseConnection $dbConnection) {
        $this->connection = $dbConnection->getConnection();
    }

    // Create a table
    public function createTable($tableName, $columns) {
        $columnDefs = [];
        foreach ($columns as $name => $definition) {
            $columnDefs[] = "`{$name}` {$definition}";
        }
        $sql = "CREATE TABLE IF NOT EXISTS `{$tableName}` (" . implode(', ', $columnDefs) . ")";
        
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            error_log("Error creating table: " . $e->getMessage());
            return false;
        }
    }

    // Insert data into a table
    public function insert($tableName, $data) {
        $columns = array_keys($data);
        $placeholders = array_map(function($col) { return ":{$col}"; }, $columns);
        
        $sql = "INSERT INTO `{$tableName}` (`" . implode('`, `', $columns) . "`) VALUES (" . implode(', ', $placeholders) . ")";
        
        try {
            $stmt = $this->connection->prepare($sql);
            $result = $stmt->execute($data);
            return $this->connection->lastInsertId();
        } catch (PDOException $e) {
            error_log("Error inserting data: " . $e->getMessage());
            return false;
        }
    }

    // Select data from a table
    public function select($tableName, $conditions = [], $orderBy = '', $limit = '') {
        $whereClause = '';
        $params = [];
        
        if (!empty($conditions)) {
            $whereParts = [];
            foreach ($conditions as $column => $value) {
                $whereParts[] = "`{$column}` = :{$column}";
                $params[$column] = $value;
            }
            $whereClause = 'WHERE ' . implode(' AND ', $whereParts);
        }
        
        $orderClause = !empty($orderBy) ? "ORDER BY {$orderBy}" : '';
        $limitClause = !empty($limit) ? "LIMIT {$limit}" : '';
        
        $sql = "SELECT * FROM `{$tableName}` {$whereClause} {$orderClause} {$limitClause}";
        
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("Error selecting data: " . $e->getMessage());
            return [];
        }
    }

    // Update data in a table
    public function update($tableName, $data, $conditions) {
        $setParts = [];
        $params = [];
        
        foreach ($data as $column => $value) {
            $setParts[] = "`{$column}` = :{$column}";
            $params[$column] = $value;
        }
        
        $whereParts = [];
        foreach ($conditions as $column => $value) {
            $conditionParam = 'cond_' . $column;
            $whereParts[] = "`{$column}` = :{$conditionParam}";
            $params[$conditionParam] = $value;
        }
        
        $sql = "UPDATE `{$tableName}` SET " . implode(', ', $setParts) . " WHERE " . implode(' AND ', $whereParts);
        
        try {
            $stmt = $this->connection->prepare($sql);
            return $stmt->execute($params);
        } catch (PDOException $e) {
            error_log("Error updating data: " . $e->getMessage());
            return false;
        }
    }

    // Delete data from a table
    public function delete($tableName, $conditions) {
        $whereParts = [];
        $params = [];
        
        foreach ($conditions as $column => $value) {
            $whereParts[] = "`{$column}` = :{$column}";
            $params[$column] = $value;
        }
        
        $sql = "DELETE FROM `{$tableName}` WHERE " . implode(' AND ', $whereParts);
        
        try {
            $stmt = $this->connection->prepare($sql);
            return $stmt->execute($params);
        } catch (PDOException $e) {
            error_log("Error deleting data: " . $e->getMessage());
            return false;
        }
    }

    // Get table information
    public function getTableInfo($tableName) {
        $sql = "DESCRIBE `{$tableName}`";
        
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("Error getting table info: " . $e->getMessage());
            return [];
        }
    }

    // Execute a custom query
    public function query($sql, $params = []) {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("Error executing query: " . $e->getMessage());
            return [];
        }
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
    
    // Example: Create a users table
    $columns = [
        'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
        'name' => 'VARCHAR(100) NOT NULL',
        'email' => 'VARCHAR(100) UNIQUE NOT NULL',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ];
    
    $dbManager->createTable('users', $columns);
    
    // Example: Insert a user
    $userId = $dbManager->insert('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com'
    ]);
    
    // Example: Select users
    $users = $dbManager->select('users');
    
    // Example: Update a user
    $dbManager->update('users', ['name' => 'Jane Doe'], ['id' => $userId]);
    
    // Example: Delete a user
    // $dbManager->delete('users', ['id' => $userId]);
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
*/

?>