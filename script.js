// Audio Context for sound effects
let audioContext;

// Initialize audio context
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play sound effect
function playSound(type) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sounds for different events
    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
            
        case 'success':
            oscillator.frequency.value = 1200;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case 'error':
            oscillator.frequency.value = 300;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
            
        case 'typing':
            oscillator.frequency.value = 1000;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
            
        case 'progress':
            oscillator.frequency.value = 600;
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
    }
}

// Matrix background effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = [];
for(let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    
    for(let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Terminal clock
function updateTerminalTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('terminalTime').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTerminalTime, 1000);
updateTerminalTime();

// Generate random IP
function generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Generate random location
function generateRandomLocation() {
    const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'Canada', 'Australia', 'Brazil', 'India', 'Russia'];
    const cities = {
        'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
        'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol'],
        'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
        'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
        'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
        'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
        'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
        'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
        'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
        'Russia': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan']
    };
    
    const country = countries[Math.floor(Math.random() * countries.length)];
    const cityList = cities[country];
    const city = cityList[Math.floor(Math.random() * cityList.length)];
    
    return `${city}, ${country}`;
}

// Generate random ISP/Provider
function generateRandomProvider(targetType) {
    if (targetType === 'phone') {
        const carriers = ['AT&T', 'Verizon', 'T-Mobile', 'Sprint', 'Vodafone', 'Orange', 'Deutsche Telekom', 'China Mobile'];
        return carriers[Math.floor(Math.random() * carriers.length)];
    } else {
        const isps = [
            'Comcast Corporation', 'AT&T Inc.', 'Verizon Communications', 'Charter Communications', 
            'British Telecom', 'Deutsche Telekom', 'Orange S.A.', 'NTT Communications',
            'Telstra Corporation', 'Telefónica', 'China Telecom', 'Vodafone Group',
            'America Movil', 'SoftBank Group', 'KT Corporation', 'Singtel'
        ];
        return isps[Math.floor(Math.random() * isps.length)];
    }
}

// Generate random ports
function generateRandomPorts() {
    const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995, 3306, 3389, 5432, 5900];
    const numPorts = Math.floor(Math.random() * 5) + 1;
    const ports = [];
    
    for (let i = 0; i < numPorts; i++) {
        ports.push(commonPorts[Math.floor(Math.random() * commonPorts.length)]);
    }
    
    return [...new Set(ports)].sort((a, b) => a - b).join(', ');
}

// Generate random vulnerabilities based on attack method
function generateRandomVulns(attackMethod) {
    const vulnMap = {
        'portScan': ['Open SSH Port', 'Unprotected FTP', 'Exposed Database Port'],
        'sqlInjection': ['SQL Injection Vulnerability', 'Unsanitized Input', 'Database Access'],
        'xss': ['Cross-Site Scripting', 'Reflected XSS', 'DOM-based XSS'],
        'ddos': ['Amplification Vector', 'Reflection Vulnerability', 'Resource Exhaustion'],
        'bruteForce': ['Weak Password Policy', 'No Rate Limiting', 'Account Lockout Bypass'],
        'phishing': ['Email Spoofing', 'Social Engineering', 'Credential Harvesting'],
        'mitm': ['Unencrypted Connection', 'Certificate Validation Bypass', 'ARP Spoofing']
    };
    
    const vulns = vulnMap[attackMethod] || ['Unknown Vulnerability'];
    const numVulns = Math.floor(Math.random() * 3) + 1;
    const selectedVulns = [];
    
    for (let i = 0; i < numVulns; i++) {
        const vuln = vulns[Math.floor(Math.random() * vulns.length)];
        if (!selectedVulns.includes(vuln)) {
            selectedVulns.push(vuln);
        }
    }
    
    return selectedVulns.join(', ');
}

// Generate terminal messages based on target type and attack method
function generateTerminalMessages(targetType, attackMethod, targetValue) {
    const messages = [
        { text: 'Initializing attack sequence...', delay: 0 },
        { text: `Target: ${targetValue} (${targetType})`, delay: 500 },
        { text: `Method: ${attackMethod}`, delay: 1000 },
        { text: 'Establishing secure connection...', delay: 1500 }
    ];
    
    // Target-specific messages
    if (targetType === 'phone') {
        messages.push(
            { text: 'Initializing SS7 protocol...', delay: 2000 },
            { text: 'Connecting to mobile network...', delay: 2500 },
            { text: 'Bypassing carrier security...', delay: 3000 }
        );
    } else if (targetType === 'ip') {
        messages.push(
            { text: 'Resolving IP address...', delay: 2000 },
            { text: 'Initiating direct connection...', delay: 2500 },
            { text: 'Bypassing firewall...', delay: 3000 }
        );
    } else if (targetType === 'email') {
        messages.push(
            { text: 'Connecting to mail server...', delay: 2000 },
            { text: 'Bypassing SPF/DKIM checks...', delay: 2500 },
            { text: 'Establishing SMTP session...', delay: 3000 }
        );
    } else if (targetType === 'website') {
        messages.push(
            { text: 'Resolving domain name...', delay: 2000 },
            { text: 'Establishing HTTPS connection...', delay: 2500 },
            { text: 'Bypassing WAF...', delay: 3000 }
        );
    } else {
        messages.push(
            { text: 'Searching digital footprint...', delay: 2000 },
            { text: 'Analyzing online presence...', delay: 2500 },
            { text: 'Establishing connection vectors...', delay: 3000 }
        );
    }
    
    // Attack method specific messages
    if (attackMethod === 'portScan') {
        messages.push(
            { text: 'Initiating port scan...', delay: 3500 },
            { text: 'Scanning common ports...', delay: 4000 },
            { text: 'Identifying services...', delay: 4500 }
        );
    } else if (attackMethod === 'sqlInjection') {
        messages.push(
            { text: 'Analyzing input fields...', delay: 3500 },
            { text: 'Testing SQL injection vectors...', delay: 4000 },
            { text: 'Bypassing input validation...', delay: 4500 }
        );
    } else if (attackMethod === 'ddos') {
        messages.push(
            { text: 'Establishing botnet connection...', delay: 3500 },
            { text: 'Coordinating attack nodes...', delay: 4000 },
            { text: 'Initiating traffic flood...', delay: 4500 }
        );
    } else if (attackMethod === 'phishing') {
        messages.push(
            { text: 'Crafting phishing email...', delay: 3500 },
            { text: 'Spoofing sender address...', delay: 4000 },
            { text: 'Deploying tracking pixel...', delay: 4500 }
        );
    }
    
    // Common messages
    messages.push(
        { text: 'Exploiting vulnerabilities...', delay: 5000, className: 'terminal-warning' },
        { text: 'Exploitation successful!', delay: 5500, className: 'terminal-success' },
        { text: 'Gaining access...', delay: 6000 },
        { text: 'Access granted. Privileges escalated.', delay: 6500, className: 'terminal-success' },
        { text: 'Installing persistence...', delay: 7000 },
        { text: 'Persistence installed.', delay: 7500, className: 'terminal-success' },
        { text: 'Exfiltrating data...', delay: 8000 },
        { text: 'Data exfiltration complete.', delay: 8500, className: 'terminal-success' },
        { text: 'Cleaning traces...', delay: 9000 },
        { text: 'Traces removed.', delay: 9500, className: 'terminal-success' },
        { text: 'Terminating connection...', delay: 10000 },
        { text: 'Connection terminated.', delay: 10500, className: 'terminal-warning' }
    );
    
    return messages;
}

// Generate exploitation data based on target type and attack method
function generateExploitData(targetType, attackMethod) {
    let dataLines = [
        `[+] Establishing connection to target...`,
        `[+] Connection established. Session ID: ${Math.random().toString(36).substring(2, 15)}`
    ];
    
    if (targetType === 'phone') {
        dataLines.push(
            `[+] IMEI: ${Math.floor(Math.random() * 100000000000000)}`,
            `[+] Carrier: ${generateRandomProvider('phone')}`,
            `[+] Signal Strength: ${Math.floor(Math.random() * 100)}%`,
            `[+] Intercepting SMS traffic...`,
            `[+] SMS interception active`,
            `[+] Tracking location...`,
            `[+] Location: ${generateRandomLocation()}`
        );
    } else if (targetType === 'ip') {
        dataLines.push(
            `[+] Target IP: ${generateRandomIP()}`,
            `[+] MAC Address: ${Math.random().toString(16).substr(2, 2)}:${Math.random().toString(16).substr(2, 2)}:${Math.random().toString(16).substr(2, 2)}:${Math.random().toString(16).substr(2, 2)}:${Math.random().toString(16).substr(2, 2)}:${Math.random().toString(16).substr(2, 2)}`,
            `[+] Hostname: ${Math.random().toString(36).substring(2, 10)}`,
            `[+] OS: ${['Linux Ubuntu 20.04', 'Windows Server 2019', 'macOS Big Sur'][Math.floor(Math.random() * 3)]}`
        );
    } else if (targetType === 'email') {
        dataLines.push(
            `[+] Email server: ${['smtp.gmail.com', 'mail.outlook.com', 'smtp.yahoo.com'][Math.floor(Math.random() * 3)]}`,
            `[+] Port: 587`,
            `[+] Encryption: STARTTLS`,
            `[+] Bypassing authentication...`,
            `[+] Access to mailbox granted`,
            `[+] Extracting contacts...`
        );
    } else if (targetType === 'website') {
        dataLines.push(
            `[+] Web server: ${['Apache/2.4.41', 'Nginx/1.18.0', 'Microsoft-IIS/10.0'][Math.floor(Math.random() * 3)]}`,
            `[+] PHP version: ${['7.4.33', '8.0.28', '8.1.16'][Math.floor(Math.random() * 3)]}`,
            `[+] Database: ${['MySQL 8.0', 'PostgreSQL 13', 'MariaDB 10.5'][Math.floor(Math.random() * 3)]}`,
            `[+] Uploading web shell...`,
            `[+] Web shell uploaded: /tmp/.${Math.random().toString(36).substring(2, 8)}.php`
        );
    } else {
        dataLines.push(
            `[+] Searching social media...`,
            `[+] Found ${Math.floor(Math.random() * 10) + 1} accounts`,
            `[+] Extracting profile data...`,
            `[+] Compromising accounts...`,
            `[+] Accounts compromised: ${Math.floor(Math.random() * 5) + 1}`
        );
    }
    
    if (attackMethod === 'portScan') {
        dataLines.push(
            `[+] Open ports: ${generateRandomPorts()}`,
            `[+] Services identified`,
            `[+] Vulnerabilities found: ${generateRandomVulns(attackMethod)}`
        );
    } else if (attackMethod === 'sqlInjection') {
        dataLines.push(
            `[+] SQL payload: ${['OR 1=1', 'UNION SELECT NULL', 'DROP TABLE users'][Math.floor(Math.random() * 3)]}`,
            `[+] Database access granted`,
            `[+] Extracting data...`,
            `[+] Records exfiltrated: ${Math.floor(Math.random() * 1000) + 100}`
        );
    } else if (attackMethod === 'ddos') {
        dataLines.push(
            `[+] Botnet size: ${Math.floor(Math.random() * 10000) + 1000} nodes`,
            `[+] Attack rate: ${Math.floor(Math.random() * 100) + 10} Gbps`,
            `[+] Duration: ${Math.floor(Math.random() * 60) + 10} minutes`,
            `[+] Target offline: YES`
        );
    } else if (attackMethod === 'phishing') {
        dataLines.push(
            `[+] Phishing page deployed`,
            `[+] URL: https://${Math.random().toString(36).substring(2, 15)}.com/update`,
            `[+] Emails sent: ${Math.floor(Math.random() * 10000) + 1000}`,
            `[+] Click rate: ${Math.floor(Math.random() * 30) + 5}%`
        );
    }
    
    dataLines.push(
        `[+] Mission complete!`
    );
    
    return dataLines.join('\n');
}

// Terminal output
const terminalOutput = document.getElementById('terminalOutput');
let terminalLines = 4; // Initial line count

function addTerminalLine(text, className = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.textContent = 'root@cyberhack:~$';
    
    const content = document.createElement('span');
    content.className = `terminal-text ${className}`;
    content.textContent = text;
    
    line.appendChild(prompt);
    line.appendChild(content);
    
    // Remove typing cursor from last line
    const lastLine = terminalOutput.lastElementChild;
    if (lastLine) {
        const cursor = lastLine.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
    }
    
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    
    // Add typing cursor to new line
    const newCursor = document.createElement('span');
    newCursor.className = 'typing-cursor';
    content.appendChild(newCursor);
    
    terminalLines++;
    
    // Keep only last 50 lines
    if (terminalLines > 50) {
        terminalOutput.removeChild(terminalOutput.firstElementChild);
        terminalLines--;
    }
    
    // Play typing sound
    playSound('typing');
}

// Form submission
document.getElementById('hackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Initialize audio on first interaction
    initAudio();
    
    const targetType = document.getElementById('targetType').value;
    const targetValue = document.getElementById('targetValue').value;
    const attackMethod = document.getElementById('attackMethod').value;
    
    // Play click sound
    playSound('click');
    
    // Reset results panel
    document.getElementById('resultsPanel').classList.add('hidden');
    
    // Clear terminal
    terminalOutput.innerHTML = '';
    terminalLines = 0;
    
    // Get terminal messages based on target and attack method
    const messages = generateTerminalMessages(targetType, attackMethod, targetValue);
    
    // Start attack simulation
    addTerminalLine('Initializing attack sequence...');
    addTerminalLine(`Target: ${targetValue} (${targetType})`);
    addTerminalLine(`Method: ${attackMethod}`);
    addTerminalLine('Establishing secure connection...');
    
    // Simulate attack progress
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, Math.floor(elapsed / 30));
        
        document.getElementById('systemProgress').style.width = `${progress}%`;
        
        // Play progress sound
        if (progress % 10 === 0) {
            playSound('progress');
        }
        
        if (progress === 100) {
            clearInterval(progressInterval);
            
            // Show results
            setTimeout(() => {
                const ip = generateRandomIP();
                const location = generateRandomLocation();
                const provider = generateRandomProvider(targetType);
                const ports = generateRandomPorts();
                const vulns = generateRandomVulns(attackMethod);
                const exploitData = generateExploitData(targetType, attackMethod);
                
                // Update results
                document.getElementById('resultTarget').textContent = targetValue;
                document.getElementById('resultType').textContent = targetType;
                document.getElementById('resultIP').textContent = ip;
                document.getElementById('resultLocation').textContent = location;
                document.getElementById('resultISP').textContent = provider;
                document.getElementById('resultMethod').textContent = attackMethod;
           
