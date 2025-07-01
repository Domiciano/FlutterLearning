Prism.languages.sql = {
	'comment': {
		pattern: /--.*/,
		greedy: true
	},
	'string': {
		pattern: /(^|[^\\'])'(?:[^'\\]|\\.)*'/,
		lookbehind: true,
		greedy: true
	},
	'keyword': /\b(?:ADD|ALL|ALTER|AND|ANY|AS|ASC|AUTO_INCREMENT|BETWEEN|BY|CASE|CHECK|COLUMN|CONSTRAINT|CREATE|CROSS|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|DATABASE|DEFAULT|DELETE|DESC|DISTINCT|DROP|ELSE|EXISTS|FOREIGN|FROM|FULL|GROUP|HAVING|IN|INDEX|INNER|INSERT|INTO|IS|JOIN|KEY|LEFT|LIKE|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|REFERENCES|RIGHT|SELECT|SET|TABLE|THEN|UNION|UNIQUE|UPDATE|VALUES|WHEN|WHERE|WITH)\b/i,
	'function': /\b(?:AVG|COUNT|MAX|MIN|SUM)\b/i,
	'boolean': /\b(?:TRUE|FALSE)\b/i,
	'number': /\b\d+(?:\.\d+)?\b/,
	'operator': /[-+*\/=<>!&|]/,
	'punctuation': /[;(),.]/
}; 