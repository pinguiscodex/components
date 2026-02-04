// WebDev Components Library - JavaScript

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

let currentTheme = 'light';

if (savedTheme) {
    currentTheme = savedTheme;
} else if (prefersDarkScheme.matches) {
    currentTheme = 'dark';
}

// Apply the initial theme
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
});

function applyTheme(theme) {
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙 Dark Mode';
    }
}

// Modal functionality
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeBtn = document.querySelector('.close');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Slider functionality
const slider = document.getElementById('myRange');
const sliderValue = document.getElementById('slider-value');

if (slider && sliderValue) {
    slider.oninput = function() {
        sliderValue.textContent = this.value;
    }
}

// Hamburger menu for mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Component customization functions
function updateButtonCode() {
    const buttonType = document.getElementById('button-type').value;
    const buttonSize = document.getElementById('button-size').value;
    const buttonText = document.getElementById('button-text').value;
    
    let classes = 'btn';
    if (buttonType) classes += ` btn-${buttonType}`;
    if (buttonSize) classes += ` ${buttonSize}`;
    
    const code = `<button class="${classes}">${buttonText}</button>`;
    document.getElementById('button-code').textContent = code;
}

function updateDropdownCode() {
    // For simplicity, we'll just update the preview with the selected options
    const dropdownColor = document.getElementById('dropdown-color').value;
    const dropdownPosition = document.getElementById('dropdown-position').value;
    
    // In a real implementation, we would update the dropdown style based on these values
    // For now, we'll just log the changes
    console.log(`Dropdown color: ${dropdownColor}, position: ${dropdownPosition}`);
}

function updateSliderCode() {
    const minVal = document.getElementById('slider-min').value;
    const maxVal = document.getElementById('slider-max').value;
    const initialVal = document.getElementById('slider-initial').value;
    
    const code = `<input type="range" min="${minVal}" max="${maxVal}" value="${initialVal}" class="slider" id="myRange">`;
    document.getElementById('slider-code').textContent = code;
}

function updateAlertCode() {
    const alertType = document.getElementById('alert-type').value;
    const alertMessage = document.getElementById('alert-message').value;
    
    const code = `<div class="alert alert-${alertType}"><strong>${alertType.charAt(0).toUpperCase() + alertType.slice(1)}!</strong> ${alertMessage}</div>`;
    document.getElementById('alert-code').textContent = code;
}

function updateCardCode() {
    const cardTitle = document.getElementById('card-title').value;
    const cardContent = document.getElementById('card-content').value;
    const cardWidth = document.getElementById('card-width').value;
    
    const code = `<div class="card" style="width: ${cardWidth}px;">
  <div class="card-header">Card Header</div>
  <div class="card-body">
    <h5>${cardTitle}</h5>
    <p>${cardContent}</p>
  </div>
  <div class="card-footer">Card Footer</div>
</div>`;
    document.getElementById('card-code').textContent = code;
}

function updateModalCode() {
    const modalTitle = document.getElementById('modal-title').value;
    const modalContent = document.getElementById('modal-content').value;
    
    const code = `<!-- Modal Trigger -->
<button id="open-modal-btn" class="btn btn-primary">Open Modal</button>

<!-- Modal -->
<div id="modal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>${modalTitle}</h2>
    <p>${modalContent}</p>
  </div>
</div>`;
    document.getElementById('modal-code').textContent = code;
}

function updateFormCode() {
    const formLayout = document.getElementById('form-layout').value;
    const inputRadius = document.getElementById('input-radius').value;
    
    // In a real implementation, we would update the form based on these values
    // For now, we'll just log the changes
    console.log(`Form layout: ${formLayout}, input radius: ${inputRadius}px`);
}

function updateTableCode() {
    const tableStyle = document.getElementById('table-style').value;
    const showActions = document.getElementById('table-actions').checked;
    
    // In a real implementation, we would update the table based on these values
    // For now, we'll just log the changes
    console.log(`Table style: ${tableStyle}, show actions: ${showActions}`);
}

function updateNavCode() {
    const navBg = document.getElementById('nav-bg').value;
    const navText = document.getElementById('nav-text').value;
    const navLayout = document.getElementById('nav-layout').value;
    
    // In a real implementation, we would update the nav based on these values
    // For now, we'll just log the changes
    console.log(`Nav bg: ${navBg}, text: ${navText}, layout: ${navLayout}`);
}

function updateDbCode() {
    const dbServer = document.getElementById('db-server').value;
    const dbUsername = document.getElementById('db-username').value;
    const dbPassword = document.getElementById('db-password').value;
    const dbName = document.getElementById('db-name').value;
    const tableName = document.getElementById('table-name').value;

    const code = `<?php
// Database configuration
$config = new DatabaseConfig('${dbServer}', '${dbUsername}', '${dbPassword}', '${dbName}');

// Create connection
$dbConnection = new DatabaseConnection($config);
$dbManager = new DatabaseManager($dbConnection);

// Create a table
$columns = [
    'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
    'name' => 'VARCHAR(100) NOT NULL',
    'email' => 'VARCHAR(100) UNIQUE NOT NULL'
];
\$dbManager->createTable('${tableName}', \$columns);

// Insert data
\$userId = \$dbManager->insert('${tableName}', [
    'name' => 'John Doe',
    'email' => 'john@example.com'
]);

// Select data
\$users = \$dbManager->select('${tableName}');

// Update data
\$dbManager->update('${tableName}', ['name' => 'Jane Doe'], ['id' => \$userId]);
?>`;
    document.getElementById('db-code').textContent = code;
}

// Add event listeners for customization controls
document.addEventListener('DOMContentLoaded', function() {
    // Button controls
    const buttonTypeSelect = document.getElementById('button-type');
    const buttonSizeSelect = document.getElementById('button-size');
    const buttonTextInput = document.getElementById('button-text');
    
    if (buttonTypeSelect) buttonTypeSelect.addEventListener('change', updateButtonCode);
    if (buttonSizeSelect) buttonSizeSelect.addEventListener('change', updateButtonCode);
    if (buttonTextInput) buttonTextInput.addEventListener('input', updateButtonCode);
    
    // Dropdown controls
    const dropdownColorInput = document.getElementById('dropdown-color');
    const dropdownPositionSelect = document.getElementById('dropdown-position');
    
    if (dropdownColorInput) dropdownColorInput.addEventListener('input', updateDropdownCode);
    if (dropdownPositionSelect) dropdownPositionSelect.addEventListener('change', updateDropdownCode);
    
    // Slider controls
    const sliderMinInput = document.getElementById('slider-min');
    const sliderMaxInput = document.getElementById('slider-max');
    const sliderInitialInput = document.getElementById('slider-initial');
    
    if (sliderMinInput) sliderMinInput.addEventListener('input', updateSliderCode);
    if (sliderMaxInput) sliderMaxInput.addEventListener('input', updateSliderCode);
    if (sliderInitialInput) sliderInitialInput.addEventListener('input', updateSliderCode);
    
    // Alert controls
    const alertTypeSelect = document.getElementById('alert-type');
    const alertMessageInput = document.getElementById('alert-message');
    
    if (alertTypeSelect) alertTypeSelect.addEventListener('change', updateAlertCode);
    if (alertMessageInput) alertMessageInput.addEventListener('input', updateAlertCode);
    
    // Card controls
    const cardTitleInput = document.getElementById('card-title');
    const cardContentInput = document.getElementById('card-content');
    const cardWidthInput = document.getElementById('card-width');
    
    if (cardTitleInput) cardTitleInput.addEventListener('input', updateCardCode);
    if (cardContentInput) cardContentInput.addEventListener('input', updateCardCode);
    if (cardWidthInput) cardWidthInput.addEventListener('input', updateCardCode);
    
    // Modal controls
    const modalTitleInput = document.getElementById('modal-title');
    const modalContentInput = document.getElementById('modal-content');
    
    if (modalTitleInput) modalTitleInput.addEventListener('input', updateModalCode);
    if (modalContentInput) modalContentInput.addEventListener('input', updateModalCode);
    
    // Form controls
    const formLayoutSelect = document.getElementById('form-layout');
    const inputRadiusInput = document.getElementById('input-radius');
    
    if (formLayoutSelect) formLayoutSelect.addEventListener('change', updateFormCode);
    if (inputRadiusInput) inputRadiusInput.addEventListener('input', updateFormCode);
    
    // Table controls
    const tableStyleSelect = document.getElementById('table-style');
    const tableActionsCheckbox = document.getElementById('table-actions');
    
    if (tableStyleSelect) tableStyleSelect.addEventListener('change', updateTableCode);
    if (tableActionsCheckbox) tableActionsCheckbox.addEventListener('change', updateTableCode);
    
    // Nav controls
    const navBgInput = document.getElementById('nav-bg');
    const navTextInput = document.getElementById('nav-text');
    const navLayoutSelect = document.getElementById('nav-layout');
    
    if (navBgInput) navBgInput.addEventListener('input', updateNavCode);
    if (navTextInput) navTextInput.addEventListener('input', updateNavCode);
    if (navLayoutSelect) navLayoutSelect.addEventListener('change', updateNavCode);
    
    // DB controls
    const dbServerInput = document.getElementById('db-server');
    const dbUsernameInput = document.getElementById('db-username');
    const dbPasswordInput = document.getElementById('db-password');
    const dbNameInput = document.getElementById('db-name');
    const tableNameInput = document.getElementById('table-name');

    if (dbServerInput) dbServerInput.addEventListener('input', updateDbCode);
    if (dbUsernameInput) dbUsernameInput.addEventListener('input', updateDbCode);
    if (dbPasswordInput) dbPasswordInput.addEventListener('input', updateDbCode);
    if (dbNameInput) dbNameInput.addEventListener('input', updateDbCode);
    if (tableNameInput) tableNameInput.addEventListener('input', updateDbCode);
    
    // Initialize all codes with default values
    updateButtonCode();
    updateSliderCode();
    updateAlertCode();
    updateCardCode();
    updateModalCode();
    updateDbCode();

    // Initialize loader code
    updateLoaderCode();
});

function updateLoaderCode() {
    const loaderType = document.getElementById('loader-type').value;
    const loaderColor = document.getElementById('loader-color').value;
    const loaderSize = document.getElementById('loader-size').value;

    let code = '';

    switch(loaderType) {
        case 'spinner':
            code = `<div class="spinner" style="width: ${loaderSize}px; height: ${loaderSize}px; border-width: ${Math.max(1, Math.floor(loaderSize/10))}px; border-left-color: ${loaderColor};"></div>`;
            break;
        case 'dots':
            code = `<div class="dots-loader">
  <div class="dot" style="background-color: ${loaderColor}; width: ${Math.max(8, Math.floor(loaderSize/5))}px; height: ${Math.max(8, Math.floor(loaderSize/5))}px;"></div>
  <div class="dot" style="background-color: ${loaderColor}; width: ${Math.max(8, Math.floor(loaderSize/5))}px; height: ${Math.max(8, Math.floor(loaderSize/5))}px;"></div>
  <div class="dot" style="background-color: ${loaderColor}; width: ${Math.max(8, Math.floor(loaderSize/5))}px; height: ${Math.max(8, Math.floor(loaderSize/5))}px;"></div>
</div>`;
            break;
        case 'bars':
            code = `<div class="bars-loader">
  <div class="bar" style="background-color: ${loaderColor};"></div>
  <div class="bar" style="background-color: ${loaderColor};"></div>
  <div class="bar" style="background-color: ${loaderColor};"></div>
</div>`;
            break;
        default:
            code = `<div class="spinner" style="width: ${loaderSize}px; height: ${loaderSize}px; border-width: ${Math.max(1, Math.floor(loaderSize/10))}px; border-left-color: ${loaderColor};"></div>`;
    }

    document.getElementById('loader-code').textContent = code;
}

// Add event listeners for loader controls
const loaderTypeSelect = document.getElementById('loader-type');
const loaderColorInput = document.getElementById('loader-color');
const loaderSizeInput = document.getElementById('loader-size');

if (loaderTypeSelect) loaderTypeSelect.addEventListener('change', updateLoaderCode);
if (loaderColorInput) loaderColorInput.addEventListener('input', updateLoaderCode);
if (loaderSizeInput) loaderSizeInput.addEventListener('input', updateLoaderCode);

// Python component code updates
function updatePythonCode() {
    const componentType = document.getElementById('python-component-type').value;

    let code = '';

    switch(componentType) {
        case 'encryption':
            code = `import hashlib
import bcrypt

class PasswordHasher:
    @staticmethod
    def hash_sha256(password):
        """Hash a password using SHA256"""
        return hashlib.sha256(password.encode('utf-8')).hexdigest()

    @staticmethod
    def hash_bcrypt(password):
        """Hash a password using bcrypt with salt"""
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password_bytes, salt)

    @staticmethod
    def verify_bcrypt(password, hashed):
        """Verify a password against a bcrypt hash"""
        password_bytes = password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed)

# Example usage
hasher = PasswordHasher()

# SHA256 hashing
sha_hash = hasher.hash_sha256("my_password")
print(f"SHA256 hash: {sha_hash}")

# Bcrypt hashing
bcrypt_hash = hasher.hash_bcrypt("my_password")
print(f"Bcrypt hash: {bcrypt_hash}")
print(f"Verification: {hasher.verify_bcrypt('my_password', bcrypt_hash)}")`;
            break;

        case 'flask':
            code = `from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return {'message': 'Welcome to the Flask API!'}

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example endpoint returning JSON data
    return jsonify({'data': 'This is sample data'})

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.get_json()
    # Process the received data
    return jsonify({'received': data, 'status': 'success'}), 201

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)`;
            break;

        case 'django':
            code = `# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

@method_decorator(csrf_exempt, name='dispatch')
class DataAPIView(View):
    def get(self, request):
        # Return sample data
        data = {'message': 'Hello from Django API', 'status': 'success'}
        return JsonResponse(data)

    def post(self, request):
        try:
            # Parse JSON data from request
            data = json.loads(request.body)
            # Process the data
            response = {
                'received': data,
                'status': 'success',
                'message': 'Data processed successfully'
            }
            return JsonResponse(response)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

# urls.py
from django.urls import path
from .views import DataAPIView

urlpatterns = [
    path('api/data/', DataAPIView.as_view(), name='data-api'),
    path('api/data/<int:id>/', DataAPIView.as_view(), name='data-detail'),
]`;
            break;

        case 'gui':
            code = `import tkinter as tk
from tkinter import ttk, messagebox
import customtkinter as ctk

# Configure CustomTkinter
ctk.set_appearance_mode("dark")  # Modes: "System" (standard), "Dark", "Light"
ctk.set_default_color_theme("blue")  # Themes: "blue" (standard), "green", "dark-blue"

class App(ctk.CTk):
    def __init__(self):
        super().__init__()

        # Configure window
        self.title("CustomTkinter App")
        self.geometry(f"{600}x{400}")

        # Configure grid layout
        self.grid_columnconfigure(1, weight=1)
        self.grid_rowconfigure((0, 1, 2), weight=1)

        # Create sidebar frame
        self.sidebar_frame = ctk.CTkFrame(self, width=140, corner_radius=0)
        self.sidebar_frame.grid(row=0, column=0, rowspan=4, sticky="nsew")
        self.sidebar_frame.grid_rowconfigure(4, weight=1)

        # Sidebar widgets
        self.logo_label = ctk.CTkLabel(self.sidebar_frame, text="App Name", font=ctk.CTkFont(size=20, weight="bold"))
        self.logo_label.grid(row=0, column=0, padx=20, pady=(20, 10))

        # Main entry and button
        self.entry = ctk.CTkEntry(self, placeholder_text="CTkEntry")
        self.entry.grid(row=3, column=1, columnspan=2, padx=(20, 0), pady=(20, 20), sticky="nsew")

        self.main_button_1 = ctk.CTkButton(master=self, fg_color="transparent", border_width=2, text_color=("gray10", "#DCE4EE"))
        self.main_button_1.grid(row=3, column=3, padx=(20, 20), pady=(20, 20), sticky="nsew")

        # Create textbox
        self.textbox = ctk.CTkTextbox(self, width=250)
        self.textbox.grid(row=0, column=1, columnspan=2, padx=(20, 0), pady=(20, 0), sticky="nsew")

    def button_callback(self):
        print("Button pressed")

if __name__ == "__main__":
    app = App()
    app.mainloop()`;
            break;

        case 'keyring':
            code = `import keyring
import getpass

class SecureStorage:
    def __init__(self, service_name):
        self.service_name = service_name

    def store_password(self, username, password=None):
        """Store a password in the system keyring"""
        if password is None:
            password = getpass.getpass(f"Enter password for {username}: ")

        keyring.set_password(self.service_name, username, password)
        print(f"Password stored for {username}")

    def get_password(self, username):
        """Retrieve a password from the system keyring"""
        password = keyring.get_password(self.service_name, username)
        if password is None:
            print(f"No password found for {username}")
            return None
        return password

    def delete_password(self, username):
        """Delete a password from the system keyring"""
        try:
            keyring.delete_password(self.service_name, username)
            print(f"Password deleted for {username}")
        except keyring.errors.PasswordDeleteError:
            print(f"No password found to delete for {username}")

# Example usage
storage = SecureStorage("MyApp")

# Store a password
storage.store_password("user@example.com", "secure_password_123")

# Retrieve a password
retrieved_password = storage.get_password("user@example.com")
print(f"Retrieved password: {'*' * len(retrieved_password) if retrieved_password else 'None'}")

# Delete a password
# storage.delete_password("user@example.com")`;
            break;

        default:
            code = `# Python component code will appear here
# Select a component type from the dropdown above`;
    }

    document.getElementById('python-code').textContent = code;
}

// Add event listeners for Python component controls
const pythonComponentTypeSelect = document.getElementById('python-component-type');
const pythonVersionSelect = document.getElementById('python-version');

if (pythonComponentTypeSelect) pythonComponentTypeSelect.addEventListener('change', updatePythonCode);
if (pythonVersionSelect) pythonVersionSelect.addEventListener('change', updatePythonCode);

// Initialize Python code
updatePythonCode();

// Python Password Encryption Code Updates
function updateEncryptionCode() {
    const algorithm = document.getElementById('encryption-algorithm').value;
    const includeVerification = document.getElementById('include-verification').checked;
    const customPassword = document.getElementById('custom-password').value;

    let code = '';

    switch(algorithm) {
        case 'sha256':
            code = `import hashlib${includeVerification ? `
import bcrypt` : ''}

def hash_sha256(password):
    """Hash a password using SHA256"""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Example usage
password = "${customPassword}"
hashed = hash_sha256(password)
print(f"SHA256 hash: {hashed}")`;
            if(includeVerification) {
                code += `

def verify_sha256(password, hashed):
    """Verify a password against a SHA256 hash (not recommended for passwords)"""
    return hash_sha256(password) == hashed

is_valid = verify_sha256("${customPassword}", hashed)
print(f"Verification: {is_valid}")`;
            }
            break;

        case 'bcrypt':
            code = `import bcrypt

def hash_bcrypt(password):
    """Hash a password using bcrypt with salt"""
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password_bytes, salt)

def verify_bcrypt(password, hashed):
    """Verify a password against a bcrypt hash"""
    password_bytes = password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed)

# Example usage
password = "${customPassword}"
hashed = hash_bcrypt(password)
is_valid = verify_bcrypt("${customPassword}", hashed)
print(f"Password verified: {is_valid}")`;
            break;

        case 'combined':
            code = `import hashlib
import secrets

def hash_sha256_with_salt(password, salt=None):
    """Hash a password using SHA256 with a salt"""
    if salt is None:
        salt = secrets.token_hex(32)  # Generate a random 32-byte salt
    else:
        salt = salt.hex() if isinstance(salt, bytes) else salt

    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest(), salt

def verify_sha256_with_salt(password, hashed, salt):
    """Verify a password against a SHA256 hash with salt"""
    computed_hash, _ = hash_sha256_with_salt(password, salt)
    return computed_hash == hashed

# Example usage
password = "${customPassword}"
hashed, salt = hash_sha256_with_salt(password)
is_valid = verify_sha256_with_salt("${customPassword}", hashed, salt)
print(f"Password verified: {is_valid}")`;
            break;

        default:
            code = `# Password encryption code will appear here
# Select an algorithm from the dropdown above`;
    }

    document.getElementById('encryption-code').textContent = code;
}

// Python Flask Code Updates
function updateFlaskCode() {
    const appName = document.getElementById('flask-app-name').value;
    const includeAuth = document.getElementById('flask-include-auth').checked;
    const dbType = document.getElementById('flask-db-type').value;

    let code = `from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return {'message': 'Welcome to the ${appName} API!'}

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example endpoint returning JSON data
    return jsonify({'data': 'This is sample data'})

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.get_json()
    # Process the received data
    return jsonify({'received': data, 'status': 'success'}), 201`;

    if(includeAuth) {
        code += `

# Authentication example
from functools import wraps

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        expected_key = os.environ.get('API_KEY')

        if not api_key or api_key != expected_key:
            return jsonify({'error': 'Invalid API key'}), 401

        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/protected', methods=['GET'])
@require_api_key
def protected_route():
    return {'message': 'This is a protected route'}`;
    }

    if(dbType !== 'none') {
        code += `

# Database integration (${dbType})
`;
        if(dbType === 'sqlite') {
            code += `import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return jsonify([dict(user) for user in users])`;
        } else if(dbType === 'postgres') {
            code += `import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        database=os.environ.get('DB_NAME', 'mydb'),
        user=os.environ.get('DB_USER', 'user'),
        password=os.environ.get('DB_PASS', 'password')
    )
    return conn

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM users')
    users = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(users)`;
        } else if(dbType === 'mysql') {
            code += `import pymysql

def get_db_connection():
    conn = pymysql.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        user=os.environ.get('DB_USER', 'user'),
        password=os.environ.get('DB_PASS', 'password'),
        database=os.environ.get('DB_NAME', 'mydb'),
        cursorclass=pymysql.cursors.DictCursor
    )
    return conn

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute('SELECT * FROM users')
        users = cur.fetchall()
    conn.close()
    return jsonify(users)`;
        }
    }

    code += `

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)`;

    document.getElementById('flask-code').textContent = code;
}

// Python Django Code Updates
function updateDjangoCode() {
    const modelName = document.getElementById('django-model-name').value;
    const includeUserAuth = document.getElementById('django-user-auth').checked;
    const apiType = document.getElementById('django-api-type').value;

    let code = '';

    // Models
    code += `# models.py
from django.db import models
${includeUserAuth ? `
from django.contrib.auth.models import User` : ''}

class ${modelName}(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
${includeUserAuth ? `
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)` : ''}

    def __str__(self):
        return self.name
`;

    // Views based on API type
    if(apiType === 'class') {
        code += `# views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

from .models import ${modelName}

@method_decorator(csrf_exempt, name='dispatch')
class ${modelName}ListView(View):
    def get(self, request):
        items = ${modelName}.objects.all().values()
        return JsonResponse(list(items), safe=False)

    def post(self, request):
        try:
            data = json.loads(request.body)
            item = ${modelName}.objects.create(
                name=data['name'],
                description=data.get('description', '')
            )
            return JsonResponse({
                'id': item.id,
                'name': item.name,
                'description': item.description
            }, status=201)
        except (json.JSONDecodeError, KeyError):
            return JsonResponse({'error': 'Invalid data'}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class ${modelName}DetailView(View):
    def get(self, request, pk):
        try:
            item = ${modelName}.objects.get(pk=pk)
            return JsonResponse({
                'id': item.id,
                'name': item.name,
                'description': item.description
            })
        except ${modelName}.DoesNotExist:
            return JsonResponse({'error': '${modelName} not found'}, status=404)

    def put(self, request, pk):
        try:
            item = ${modelName}.objects.get(pk=pk)
            data = json.loads(request.body)
            item.name = data.get('name', item.name)
            item.description = data.get('description', item.description)
            item.save()
            return JsonResponse({
                'id': item.id,
                'name': item.name,
                'description': item.description
            })
        except ${modelName}.DoesNotExist:
            return JsonResponse({'error': '${modelName} not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid data'}, status=400)

    def delete(self, request, pk):
        try:
            item = ${modelName}.objects.get(pk=pk)
            item.delete()
            return JsonResponse({'message': '${modelName} deleted'})
        except ${modelName}.DoesNotExist:
            return JsonResponse({'error': '${modelName} not found'}, status=404)
`;
    } else if(apiType === 'function') {
        code += `# views.py
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

from .models import ${modelName}

@csrf_exempt
@require_http_methods(["GET"])
def ${modelName.lower()}_list(request):
    items = ${modelName}.objects.all().values()
    return JsonResponse(list(items), safe=False)

@csrf_exempt
@require_http_methods(["POST"])
def ${modelName.lower()}_create(request):
    try:
        data = json.loads(request.body)
        item = ${modelName}.objects.create(
            name=data['name'],
            description=data.get('description', '')
        )
        return JsonResponse({
            'id': item.id,
            'name': item.name,
            'description': item.description
        }, status=201)
    except (json.JSONDecodeError, KeyError):
        return JsonResponse({'error': 'Invalid data'}, status=400)

@csrf_exempt
@require_http_methods(["GET"])
def ${modelName.lower()}_detail(request, pk):
    item = get_object_or_404(${modelName}, pk=pk)
    return JsonResponse({
        'id': item.id,
        'name': item.name,
        'description': item.description
    })

@csrf_exempt
@require_http_methods(["PUT"])
def ${modelName.lower()}_update(request, pk):
    item = get_object_or_404(${modelName}, pk=pk)
    try:
        data = json.loads(request.body)
        item.name = data.get('name', item.name)
        item.description = data.get('description', item.description)
        item.save()
        return JsonResponse({
            'id': item.id,
            'name': item.name,
            'description': item.description
        })
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid data'}, status=400)

@csrf_exempt
@require_http_methods(["DELETE"])
def ${modelName.lower()}_delete(request, pk):
    item = get_object_or_404(${modelName}, pk=pk)
    item.delete()
    return JsonResponse({'message': '${modelName} deleted'})
`;
    } else { // DRF
        code += `# serializers.py
from rest_framework import serializers
from .models import ${modelName}

class ${modelName}Serializer(serializers.ModelSerializer):
    class Meta:
        model = ${modelName}
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']


# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import ${modelName}
from .serializers import ${modelName}Serializer

class ${modelName}ListCreateView(generics.ListCreateAPIView):
    queryset = ${modelName}.objects.all()
    serializer_class = ${modelName}Serializer

class ${modelName}RetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ${modelName}.objects.all()
    serializer_class = ${modelName}Serializer
`;
    }

    // URLs
    code += `# urls.py
from django.urls import path
${apiType === 'drf' ? 'from rest_framework.routers import DefaultRouter\n' : ''}
from . import views

urlpatterns = [
    path('api/${modelName.toLowerCase()}s/', views.${modelName}ListView.as_view(), name='${modelName.lower()}-list'),
    path('api/${modelName.toLowerCase()}s/<int:pk>/', views.${modelName}DetailView.as_view(), name='${modelName.lower()}-detail'),
]
`;

    document.getElementById('django-code').textContent = code;
}

// Python GUI Code Updates
function updateGuiCode() {
    const framework = document.getElementById('gui-framework').value;
    const widgets = document.getElementById('gui-widgets').value;
    const windowTitle = document.getElementById('gui-window-title').value;

    let code = '';

    if(framework === 'tkinter' || framework === 'both') {
        code += `# Tkinter ${widgets} Example
import tkinter as tk
from tkinter import ttk
${widgets === 'form' || widgets === 'advanced' ? 'from tkinter import messagebox, filedialog\n' : ''}
${widgets === 'advanced' ? 'from tkinter import scrolledtext\n' : ''}

class App:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("${windowTitle}")
        self.root.geometry("400x300")

        # Create ${widgets === 'basic' ? 'basic' : widgets} widgets
${widgets === 'basic' ? `        # Create a label
        label = ttk.Label(self.root, text="Hello, World!")
        label.pack(pady=20)

        # Create a button
        button = ttk.Button(self.root, text="Click Me", command=self.button_click)
        button.pack(pady=10)` :
widgets === 'form' ? `        # Create form elements
        ttk.Label(self.root, text="Name:").pack(pady=5)
        self.name_entry = ttk.Entry(self.root)
        self.name_entry.pack(pady=5)

        ttk.Label(self.root, text="Email:").pack(pady=5)
        self.email_entry = ttk.Entry(self.root)
        self.email_entry.pack(pady=5)

        submit_btn = ttk.Button(self.root, text="Submit", command=self.submit_form)
        submit_btn.pack(pady=10)` :
widgets === 'advanced' ? `        # Create a notebook for tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        # Tab 1
        tab1 = ttk.Frame(self.notebook)
        self.notebook.add(tab1, text="Tab 1")

        label1 = ttk.Label(tab1, text="This is Tab 1")
        label1.pack(pady=20)

        # Tab 2
        tab2 = ttk.Frame(self.notebook)
        self.notebook.add(tab2, text="Tab 2")

        text_area = scrolledtext.ScrolledText(tab2, width=40, height=10)
        text_area.pack(pady=10)` : ''}

    def button_click(self):
        print("Button clicked!")
${widgets === 'form' ? `
    def submit_form(self):
        name = self.name_entry.get()
        email = self.email_entry.get()
        messagebox.showinfo("Form Submitted", f"Name: {name}\\nEmail: {email}")` : ''}

    def run(self):
        self.root.mainloop()

# Run the application
if __name__ == "__main__":
    app = App()
    app.run()
`;

        if(framework === 'both') {
            code += '\n\n';
        }
    }

    if(framework === 'customtkinter' || framework === 'both') {
        code += `# CustomTkinter ${widgets} Example
import customtkinter as ctk

class ModernApp:
    def __init__(self):
        # Set appearance mode and color theme
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")

        self.root = ctk.CTk()
        self.root.title("${windowTitle}")
        self.root.geometry("500x400")

        # Create main frame
        self.main_frame = ctk.CTkFrame(master=self.root)
        self.main_frame.pack(pady=20, padx=40, fill="both", expand=True)

        # Add ${widgets === 'basic' ? 'basic' : widgets} widgets
${widgets === 'basic' ? `        # Add widgets
        self.label = ctk.CTkLabel(
            master=self.main_frame,
            text="Modern GUI with CustomTkinter",
            font=ctk.CTkFont(size=20, weight="bold")
        )
        self.label.pack(pady=20)

        self.button = ctk.CTkButton(
            master=self.main_frame,
            text="Modern Button",
            command=self.button_callback
        )
        self.button.pack(pady=10)` :
widgets === 'form' ? `        # Create form elements
        ctk.CTkLabel(self.main_frame, text="Name:").pack(pady=5)
        self.name_entry = ctk.CTkEntry(self.main_frame, placeholder_text="Enter your name")
        self.name_entry.pack(pady=5)

        ctk.CTkLabel(self.main_frame, text="Email:").pack(pady=5)
        self.email_entry = ctk.CTkEntry(self.main_frame, placeholder_text="Enter your email")
        self.email_entry.pack(pady=5)

        submit_btn = ctk.CTkButton(self.main_frame, text="Submit", command=self.submit_form)
        submit_btn.pack(pady=10)` :
widgets === 'advanced' ? `        # Create segmented button
        self.segmented_button = ctk.CTkSegmentedButton(
            self.main_frame,
            values=["Option 1", "Option 2", "Option 3"],
            command=self.segmented_button_callback
        )
        self.segmented_button.pack(pady=10)
        self.segmented_button.set("Option 1")

        # Create slider
        self.slider = ctk.CTkSlider(self.main_frame, from_=0, to=100)
        self.slider.pack(pady=10)

        # Create progress bar
        self.progress = ctk.CTkProgressBar(self.main_frame)
        self.progress.pack(pady=10)
        self.progress.set(0.5)` : ''}

    def button_callback(self):
        print("Modern button clicked!")
${widgets === 'form' ? `
    def submit_form(self):
        name = self.name_entry.get()
        email = self.email_entry.get()
        ctk.CTkMessageBox.show_info("Form Submitted", f"Name: {name}\\nEmail: {email}")` : ''}
${widgets === 'advanced' ? `
    def segmented_button_callback(self, value):
        print(f"Selected value: {value}")` : ''}

    def run(self):
        self.root.mainloop()

# Run the application
if __name__ == "__main__":
    app = ModernApp()
    app.run()
`;
    }

    document.getElementById('gui-code').textContent = code;
}

// Python Keyring Code Updates
function updateKeyringCode() {
    const serviceName = document.getElementById('keyring-service').value;
    const includeTokens = document.getElementById('keyring-tokens').checked;
    const includeConfig = document.getElementById('keyring-config').checked;

    let code = `import keyring
import getpass

class SecureStorage:
    def __init__(self, service_name):
        self.service_name = service_name

    def store_password(self, username, password=None):
        """Store a password in the system keyring"""
        if password is None:
            password = getpass.getpass(f"Enter password for {username}: ")

        keyring.set_password(self.service_name, username, password)
        print(f"Password stored for {username}")

    def get_password(self, username):
        """Retrieve a password from the system keyring"""
        password = keyring.get_password(self.service_name, username)
        if password is None:
            print(f"No password found for {username}")
            return None
        return password

    def delete_password(self, username):
        """Delete a password from the system keyring"""
        try:
            keyring.delete_password(self.service_name, username)
            print(f"Password deleted for {username}")
        except keyring.errors.PasswordDeleteError:
            print(f"No password found to delete for {username}")

${includeTokens ? `    def store_token(self, token_name, token_value, expiry_hours=24):
        \"\"\"Store an authentication token with expiration\"\"\"
        import json
        from datetime import datetime, timedelta

        # Create a JSON object with the token and expiration
        token_data = {
            "token": token_value,
            "expiry": (datetime.now() + timedelta(hours=expiry_hours)).isoformat(),
            "created": datetime.now().isoformat()
        }

        # Store as JSON string
        keyring.set_password(f"{self.service_name}_tokens", token_name, json.dumps(token_data))
        print(f"Token '{token_name}' stored with expiry in {expiry_hours} hours")

    def get_token(self, token_name):
        \"\"\"Retrieve an authentication token and check if it's expired\"\"\"
        import json
        from datetime import datetime

        token_json = keyring.get_password(f"{self.service_name}_tokens", token_name)
        if not token_json:
            return None

        try:
            token_data = json.loads(token_json)
            expiry = datetime.fromisoformat(token_data["expiry"])

            if datetime.now() > expiry:
                print(f"Token '{token_name}' has expired. Deleting...")
                self.delete_token(token_name)
                return None

            return token_data["token"]
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Error parsing token data: {e}")
            return None

    def delete_token(self, token_name):
        \"\"\"Delete a token from the system keyring\"\"\"
        try:
            keyring.delete_password(f"{self.service_name}_tokens", token_name)
            print(f"Token '{token_name}' deleted")
        except keyring.errors.PasswordDeleteError:
            print(f"No token found to delete for '{token_name}'")
` : ''}${includeConfig ? `    def store_encrypted_config(self, config_name, config_data, password_prompt=True):
        \"\"\"Store configuration data encrypted with a password\"\"\"
        import hashlib
        import base64
        from cryptography.fernet import Fernet
        import json

        # Get or create a password for encryption
        password_key = f"{config_name}_encryption_key"
        encryption_password = self.get_password(password_key)

        if encryption_password is None:
            if password_prompt:
                print(f"Creating encryption key for {config_name}")
                encryption_password = getpass.getpass("Enter password for config encryption: ")
            else:
                # Generate a secure random password
                import secrets
                import string
                alphabet = string.ascii_letters + string.digits
                encryption_password = ''.join(secrets.choice(alphabet) for _ in range(32))

            # Store the encryption password in keyring
            self.store_password(password_key, encryption_password)

        # Create encryption key from password
        key = base64.urlsafe_b64encode(hashlib.sha256(encryption_password.encode()).digest())
        cipher_suite = Fernet(key)

        # Encrypt the config data
        config_json = json.dumps(config_data)
        encrypted_data = cipher_suite.encrypt(config_json.encode())

        # Store the encrypted config
        keyring.set_password(f"{self.service_name}_configs", config_name, base64.b64encode(encrypted_data).decode())
        print(f"Configuration '{config_name}' stored securely")

    def get_encrypted_config(self, config_name):
        \"\"\"Retrieve and decrypt configuration data\"\"\"
        import hashlib
        import base64
        from cryptography.fernet import Fernet
        import json

        # Get the encrypted config
        encrypted_data_b64 = keyring.get_password(f"{self.service_name}_configs", config_name)
        if not encrypted_data_b64:
            return None

        # Get the encryption password
        password_key = f"{config_name}_encryption_key"
        encryption_password = self.get_password(password_key)

        if not encryption_password:
            print(f"No encryption key found for {config_name}")
            return None

        try:
            # Recreate the encryption key
            key = base64.urlsafe_b64encode(hashlib.sha256(encryption_password.encode()).digest())
            cipher_suite = Fernet(key)

            # Decrypt the data
            encrypted_data = base64.b64decode(encrypted_data_b64.encode())
            decrypted_json = cipher_suite.decrypt(encrypted_data).decode()

            return json.loads(decrypted_json)
        except Exception as e:
            print(f"Error decrypting config: {e}")
            return None
` : ''}}

# Example usage
storage = SecureStorage("${serviceName}")

# Store a password
storage.store_password("user@example.com", "secure_password_123")

# Retrieve a password
retrieved_password = storage.get_password("user@example.com")
print(f"Retrieved password: {'*' * len(retrieved_password) if retrieved_password else 'None'}")
`;

    document.getElementById('keyring-code').textContent = code;
}

// Add event listeners for all Python component controls
document.addEventListener('DOMContentLoaded', function() {
    // Encryption controls
    const encryptionAlgorithmSelect = document.getElementById('encryption-algorithm');
    const includeVerificationCheckbox = document.getElementById('include-verification');
    const customPasswordInput = document.getElementById('custom-password');

    if (encryptionAlgorithmSelect) encryptionAlgorithmSelect.addEventListener('change', updateEncryptionCode);
    if (includeVerificationCheckbox) includeVerificationCheckbox.addEventListener('change', updateEncryptionCode);
    if (customPasswordInput) customPasswordInput.addEventListener('input', updateEncryptionCode);

    // Flask controls
    const flaskAppNameInput = document.getElementById('flask-app-name');
    const flaskIncludeAuthCheckbox = document.getElementById('flask-include-auth');
    const flaskDbTypeSelect = document.getElementById('flask-db-type');

    if (flaskAppNameInput) flaskAppNameInput.addEventListener('input', updateFlaskCode);
    if (flaskIncludeAuthCheckbox) flaskIncludeAuthCheckbox.addEventListener('change', updateFlaskCode);
    if (flaskDbTypeSelect) flaskDbTypeSelect.addEventListener('change', updateFlaskCode);

    // Django controls
    const djangoModelNameInput = document.getElementById('django-model-name');
    const djangoUserAuthCheckbox = document.getElementById('django-user-auth');
    const djangoApiTypeSelect = document.getElementById('django-api-type');

    if (djangoModelNameInput) djangoModelNameInput.addEventListener('input', updateDjangoCode);
    if (djangoUserAuthCheckbox) djangoUserAuthCheckbox.addEventListener('change', updateDjangoCode);
    if (djangoApiTypeSelect) djangoApiTypeSelect.addEventListener('change', updateDjangoCode);

    // GUI controls
    const guiFrameworkSelect = document.getElementById('gui-framework');
    const guiWidgetsSelect = document.getElementById('gui-widgets');
    const guiWindowTitleInput = document.getElementById('gui-window-title');

    if (guiFrameworkSelect) guiFrameworkSelect.addEventListener('change', updateGuiCode);
    if (guiWidgetsSelect) guiWidgetsSelect.addEventListener('change', updateGuiCode);
    if (guiWindowTitleInput) guiWindowTitleInput.addEventListener('input', updateGuiCode);

    // Keyring controls
    const keyringServiceInput = document.getElementById('keyring-service');
    const keyringTokensCheckbox = document.getElementById('keyring-tokens');
    const keyringConfigCheckbox = document.getElementById('keyring-config');

    if (keyringServiceInput) keyringServiceInput.addEventListener('input', updateKeyringCode);
    if (keyringTokensCheckbox) keyringTokensCheckbox.addEventListener('change', updateKeyringCode);
    if (keyringConfigCheckbox) keyringConfigCheckbox.addEventListener('change', updateKeyringCode);

    // Initialize all Python codes
    updateEncryptionCode();
    updateFlaskCode();
    updateDjangoCode();
    updateGuiCode();
    updateKeyringCode();
});

// Copy to clipboard functionality
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    const textArea = document.createElement('textarea');
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        // Modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(codeElement.textContent).then(() => {
                showCopyFeedback(event.target);
            }).catch(err => {
                // Fallback to execCommand
                fallbackCopyTextToClipboard(textArea, event.target);
            });
        } else {
            // Fallback to execCommand
            fallbackCopyTextToClipboard(textArea, event.target);
        }
    } catch (err) {
        // Fallback to execCommand
        fallbackCopyTextToClipboard(textArea, event.target);
    }

    document.body.removeChild(textArea);
}

function fallbackCopyTextToClipboard(textArea, button) {
    document.execCommand('copy');
    showCopyFeedback(button);
}

function showCopyFeedback(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});