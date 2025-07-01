// In a new file, e.g., 'prism-custom-http.js'
import Prism from 'prismjs';

Prism.languages['custom-http'] = {
    'command': {
        pattern: /^\[c:http\]/, // Matches [c:http]
        alias: 'keyword' // Or any other suitable alias for styling
    },
    'method': /\b(?:GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\b/, // Matches HTTP methods
    'path': /\/[^\s]+/, // Matches the path like /items/1
    'punctuation': /\[|\]/ // Matches the brackets
};