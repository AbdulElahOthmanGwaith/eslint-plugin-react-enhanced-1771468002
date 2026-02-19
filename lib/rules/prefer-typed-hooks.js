/**
 * @fileoverview Enforce generic type arguments on React hooks in TypeScript
 * @author Manus
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const report = require('../util/report');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const messages = {
  preferTypedHook: 'React hook "{{name}}" should have explicit generic type arguments in TypeScript for better type safety.',
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'Enforce generic type arguments on React hooks in TypeScript',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('prefer-typed-hooks'),
    },
    messages,
    schema: [
      {
        type: 'object',
        properties: {
          hooks: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const hooksToTrack = options.hooks || ['useState', 'useRef', 'useContext'];

    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && hooksToTrack.includes(node.callee.name)) {
          // Check if it's a TypeScript file (simple check by extension if possible, or AST features)
          const sourceCode = context.getSourceCode();
          const filename = context.getFilename();
          
          // Only apply to .ts or .tsx files
          if (!filename.endsWith('.ts') && !filename.endsWith('.tsx')) {
            return;
          }

          // Check if generic type arguments are missing
          if (!node.typeParameters && !node.typeArguments) {
            report(context, messages.preferTypedHook, 'preferTypedHook', {
              node,
              data: {
                name: node.callee.name,
              },
            });
          }
        }
      },
    };
  },
};
