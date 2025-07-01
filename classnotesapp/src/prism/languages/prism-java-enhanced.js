Prism.languages.java = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(^|[^\\])"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		lookbehind: true,
		greedy: true
	},
	'keyword': /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
	'class-name': {
		pattern: /\b[A-Z]\w*(?:\s*\.\s*[A-Z]\w*)*\b/,
		inside: {
			'punctuation': /\./
		}
	},
	'function': /\b\w+(?=\s*\()/,
	'number': /\b(?:0b[01]+|0x[\da-f]*\.?[\da-fp+-]+|\d*\.?\d+(?:e\d+)?[dfl]?)\b/i,
	'operator': {
		pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
		lookbehind: true
	},
	'punctuation': /[{}[\];(),.:]/
}; 