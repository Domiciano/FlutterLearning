// Archivo de lenguaje HTTP personalizado para Prism.js
Prism.languages.http = {
    'method': {
        pattern: /\b(?:GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\b/i,
        alias: 'keyword'
    },
    'url': {
        pattern: /\/[^\s\n]+/,
        alias: 'string'
    },
    'header': {
        pattern: /^[A-Z][a-zA-Z0-9-]*:/m,
        alias: 'property'
    },
    'status-code': {
        pattern: /\b\d{3}\b/,
        alias: 'number'
    },
    'version': {
        pattern: /HTTP\/\d\.\d/,
        alias: 'string'
    },
    'punctuation': /[{}[\];(),.:]/,
    'operator': /[=<>]/,
    'comment': {
        pattern: /#.*$/m,
        greedy: true
    }
};