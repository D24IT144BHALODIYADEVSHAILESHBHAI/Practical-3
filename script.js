const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the directory to serve files from
const publicDir = path.join(__dirname);

// Create the server
const server = http.createServer((req, res) => {
    let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);

    // Determine the file extension
    const extname = path.extname(filePath).toLowerCase();

    // Set the content type based on the file extension
    let contentType = 'text/html';
    if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.jpg' || extname === '.jpeg') {
        contentType = 'image/jpeg';
    } else if (extname === '.png') {
        contentType = 'image/png';
    }

    // Serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If the file is not found, respond with a 404 error
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested file could not be found.</p>');
            } else {
                // If there was an error reading the file, respond with a 500 error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1><p>There was an error processing your request.</p>');
            }
        } else {
            // Serve the file with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
