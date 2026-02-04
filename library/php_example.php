<?php
/**
 * WebDev Components Library - PHP Database Example
 */

require_once 'database.php';
require_once 'database_utils.php';

// Example usage of the database components
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
    
    // Example: Create migration utility
    $migration = new DatabaseMigration($dbManager);
    $migration->createMigrationTable();
    
    // Example: Create seeder utility
    $seeder = new DatabaseSeeder($dbManager);
    
    // Example: Create validator utility
    $validator = new DatabaseValidator($dbManager);
    
    // Example: Validate an email
    $isValidEmail = $validator->isValidEmail('test@example.com');
    
    // Example: Validate required fields
    $data = ['name' => 'John', 'email' => ''];
    $required = ['name', 'email'];
    $errors = $validator->validateRequired($data, $required);
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Database Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
        }
        .result {
            margin: 10px 0;
            padding: 10px;
            background-color: #e9f7ef;
            border-left: 4px solid #28a745;
        }
        .error {
            background-color: #f8d7da;
            border-left: 4px solid #dc3545;
        }
        pre {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>PHP Database Example</h1>
        
        <h2>Database Operations Performed:</h2>
        
        <div class="result">
            <strong>Created 'users' table</strong>
            <p>Table structure: id (auto-increment), name (varchar), email (unique varchar), created_at (timestamp)</p>
        </div>
        
        <div class="result">
            <strong>Inserted user</strong>
            <p>User ID: <?php echo $userId; ?>, Name: Jane Doe, Email: john@example.com</p>
        </div>
        
        <div class="result">
            <strong>Fetched users</strong>
            <p>Number of users: <?php echo count($users); ?></p>
        </div>
        
        <div class="result">
            <strong>Email validation</strong>
            <p>Is 'test@example.com' valid? <?php echo $isValidEmail ? 'Yes' : 'No'; ?></p>
        </div>
        
        <?php if (!empty($errors)): ?>
        <div class="result error">
            <strong>Validation errors:</strong>
            <ul>
                <?php foreach ($errors as $error): ?>
                <li><?php echo htmlspecialchars($error); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php endif; ?>
        
        <h2>Sample PHP Code:</h2>
        <pre>&lt;?php
// Database configuration
$config = new DatabaseConfig('localhost', 'root', '', 'my_database');

// Create connection
$dbConnection = new DatabaseConnection($config);
$dbManager = new DatabaseManager($dbConnection);

// Create a table
$columns = [
    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
    'name' => 'VARCHAR(100) NOT NULL',
    'email' => 'VARCHAR(100) UNIQUE NOT NULL'
];
$dbManager-&gt;createTable('users', $columns);

// Insert data
$userId = $dbManager-&gt;insert('users', [
    'name' => 'John Doe',
    'email' => 'john@example.com'
]);

// Select data
$users = $dbManager-&gt;select('users');

// Update data
$dbManager-&gt;update('users', ['name' => 'Jane Doe'], ['id' =&gt; $userId]);
?&gt;</pre>
    </div>
</body>
</html>