export interface Command {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}

export const categories = [
  "All",
  "Deployment",
  "Database",
  "Server Setup",
  "Security",
  "Tools",
  "Configuration"
];

export const commands: Command[] = [
  {
    id: "deploy-django-apache",
    title: "Deploy Django with Apache",
    description: "Complete guide to deploy Django applications using Apache web server",
    category: "Deployment",
    tags: ["django", "apache", "python", "deployment"],
    content: `# Deploy Django with Apache

## Prerequisites
- Ubuntu/Debian server
- Apache2 installed
- Python and pip installed

## Steps

1. Install required packages:
\`\`\`bash
sudo apt update
sudo apt install python3-pip apache2 libapache2-mod-wsgi-py3
\`\`\`

2. Create virtual environment:
\`\`\`bash
python3 -m venv venv
source venv/bin/activate
\`\`\`

3. Install Django:
\`\`\`bash
pip install django
\`\`\`

4. Configure Apache VirtualHost:
\`\`\`apache
<VirtualHost *:80>
    ServerName your-domain.com
    
    Alias /static /path/to/your/staticfiles
    <Directory /path/to/your/staticfiles>
        Require all granted
    </Directory>
    
    WSGIDaemonProcess your_project python-path=/path/to/your/project python-home=/path/to/venv
    WSGIProcessGroup your_project
    WSGIScriptAlias / /path/to/your/project/wsgi.py
    
    <Directory /path/to/your/project>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>
</VirtualHost>
\`\`\`

5. Restart Apache:
\`\`\`bash
sudo systemctl restart apache2
\`\`\``
  },
  {
    id: "lamp-stack",
    title: "LAMP Stack Installation",
    description: "Install Linux, Apache, MySQL, and PHP stack on Ubuntu",
    category: "Server Setup",
    tags: ["lamp", "apache", "mysql", "php", "ubuntu"],
    content: `# LAMP Stack Installation

## Install Apache
\`\`\`bash
sudo apt update
sudo apt install apache2
sudo systemctl start apache2
sudo systemctl enable apache2
\`\`\`

## Install MySQL
\`\`\`bash
sudo apt install mysql-server
sudo mysql_secure_installation
\`\`\`

## Install PHP
\`\`\`bash
sudo apt install php libapache2-mod-php php-mysql
\`\`\`

## Verify Installation
\`\`\`bash
php -v
apache2 -v
mysql --version
\`\`\``
  },
  {
    id: "mongodb-setup",
    title: "MongoDB Installation & Configuration",
    description: "Install and configure MongoDB on Ubuntu server",
    category: "Database",
    tags: ["mongodb", "database", "nosql"],
    content: `# MongoDB Installation

## Import MongoDB GPG Key
\`\`\`bash
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-6.0.gpg
\`\`\`

## Add MongoDB Repository
\`\`\`bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
\`\`\`

## Install MongoDB
\`\`\`bash
sudo apt update
sudo apt install -y mongodb-org
\`\`\`

## Start MongoDB
\`\`\`bash
sudo systemctl start mongod
sudo systemctl enable mongod
\`\`\``
  },
  {
    id: "ssl-certificate",
    title: "SSL Certificate with Let's Encrypt",
    description: "Set up free SSL certificates using Let's Encrypt and Certbot",
    category: "Security",
    tags: ["ssl", "https", "certbot", "apache"],
    content: `# SSL Certificate Setup

## Install Certbot
\`\`\`bash
sudo apt install certbot python3-certbot-apache
\`\`\`

## Obtain Certificate
\`\`\`bash
sudo certbot --apache -d your-domain.com -d www.your-domain.com
\`\`\`

## Auto-renewal
\`\`\`bash
sudo certbot renew --dry-run
\`\`\`

## Certificate renewal cron job is automatically set up by certbot`
  },
  {
    id: "nodejs-install",
    title: "Install Node.js & NPM",
    description: "Install the latest version of Node.js and NPM using NVM",
    category: "Tools",
    tags: ["nodejs", "npm", "nvm", "javascript"],
    content: `# Install Node.js & NPM

## Install NVM
\`\`\`bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
\`\`\`

## Reload shell configuration
\`\`\`bash
source ~/.bashrc
\`\`\`

## Install Node.js
\`\`\`bash
nvm install node
nvm install --lts
\`\`\`

## Verify Installation
\`\`\`bash
node --version
npm --version
\`\`\``
  },
  {
    id: "mysql-user",
    title: "Create MySQL User & Database",
    description: "Create a new MySQL user and assign database permissions",
    category: "Database",
    tags: ["mysql", "database", "user-management"],
    content: `# Create MySQL User & Assign Database

## Login to MySQL
\`\`\`bash
sudo mysql -u root -p
\`\`\`

## Create Database
\`\`\`sql
CREATE DATABASE your_database;
\`\`\`

## Create User
\`\`\`sql
CREATE USER 'your_user'@'localhost' IDENTIFIED BY 'strong_password';
\`\`\`

## Grant Privileges
\`\`\`sql
GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

## Exit
\`\`\`sql
EXIT;
\`\`\``
  },
  {
    id: "ufw-firewall",
    title: "UFW Firewall Setup",
    description: "Configure UFW firewall for basic server security",
    category: "Security",
    tags: ["ufw", "firewall", "security"],
    content: `# UFW Firewall Configuration

## Install UFW
\`\`\`bash
sudo apt install ufw
\`\`\`

## Set Default Policies
\`\`\`bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
\`\`\`

## Allow SSH
\`\`\`bash
sudo ufw allow ssh
# or
sudo ufw allow 22
\`\`\`

## Allow HTTP and HTTPS
\`\`\`bash
sudo ufw allow 80
sudo ufw allow 443
\`\`\`

## Enable Firewall
\`\`\`bash
sudo ufw enable
\`\`\`

## Check Status
\`\`\`bash
sudo ufw status verbose
\`\`\``
  },
  {
    id: "ssh-key-setup",
    title: "SSH Key Authentication",
    description: "Set up SSH key-based authentication for secure server access",
    category: "Security",
    tags: ["ssh", "authentication", "security"],
    content: `# SSH Key Setup

## Generate SSH Key (Local Machine)
\`\`\`bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
\`\`\`

## Copy Public Key to Server
\`\`\`bash
ssh-copy-id username@server_ip
\`\`\`

## Or manually copy:
\`\`\`bash
cat ~/.ssh/id_rsa.pub | ssh username@server_ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
\`\`\`

## Disable Password Authentication (Server)
Edit /etc/ssh/sshd_config:
\`\`\`bash
PasswordAuthentication no
PubkeyAuthentication yes
\`\`\`

## Restart SSH Service
\`\`\`bash
sudo systemctl restart sshd
\`\`\``
  },
  {
    id: "composer-install",
    title: "Install Composer",
    description: "Install Composer dependency manager for PHP",
    category: "Tools",
    tags: ["composer", "php", "package-manager"],
    content: `# Install Composer

## Download Composer Installer
\`\`\`bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
\`\`\`

## Verify Installer
\`\`\`bash
php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
\`\`\`

## Install Composer Globally
\`\`\`bash
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
\`\`\`

## Verify Installation
\`\`\`bash
composer --version
\`\`\``
  },
  {
    id: "deploy-nextjs-apache",
    title: "Deploy Next.js with Apache",
    description: "Deploy Next.js application using Apache as reverse proxy",
    category: "Deployment",
    tags: ["nextjs", "apache", "react", "deployment"],
    content: `# Deploy Next.js with Apache

## Install Dependencies
\`\`\`bash
sudo apt install apache2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs
\`\`\`

## Clone and Build Project
\`\`\`bash
git clone your-repo.git
cd your-project
npm install
npm run build
\`\`\`

## Install PM2
\`\`\`bash
sudo npm install -g pm2
pm2 start npm --name "nextjs-app" -- start
pm2 startup
pm2 save
\`\`\`

## Configure Apache
\`\`\`apache
<VirtualHost *:80>
    ServerName your-domain.com
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
\`\`\`

## Enable Modules
\`\`\`bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
\`\`\``
  },
  {
    id: "sudo-user-create",
    title: "Create Sudo User",
    description: "Create a new user with sudo privileges on Linux",
    category: "Configuration",
    tags: ["linux", "user", "sudo", "permissions"],
    content: `# Create Sudo User

## Create New User
\`\`\`bash
sudo adduser newusername
\`\`\`

## Add User to Sudo Group
\`\`\`bash
sudo usermod -aG sudo newusername
\`\`\`

## Verify Sudo Access
\`\`\`bash
su - newusername
sudo whoami
\`\`\`

## Grant Passwordless Sudo (Optional)
\`\`\`bash
sudo visudo
\`\`\`

Add this line:
\`\`\`
newusername ALL=(ALL) NOPASSWD:ALL
\`\`\``
  },
  {
    id: "lemp-stack",
    title: "LEMP Stack Installation",
    description: "Install Linux, Nginx, MySQL, and PHP stack",
    category: "Server Setup",
    tags: ["lemp", "nginx", "mysql", "php"],
    content: `# LEMP Stack Installation

## Install Nginx
\`\`\`bash
sudo apt update
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
\`\`\`

## Install MySQL
\`\`\`bash
sudo apt install mysql-server
sudo mysql_secure_installation
\`\`\`

## Install PHP
\`\`\`bash
sudo apt install php-fpm php-mysql
\`\`\`

## Configure Nginx for PHP
Edit /etc/nginx/sites-available/default:
\`\`\`nginx
location ~ \\.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
}
\`\`\`

## Restart Services
\`\`\`bash
sudo systemctl restart nginx
sudo systemctl restart php8.1-fpm
\`\`\``
  }
];
