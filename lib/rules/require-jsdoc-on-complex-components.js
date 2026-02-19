/**
 * @fileoverview Enforce JSDoc documentation on complex React components
 * @author Manus
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const report = require('../util/report');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const messages = {
  requireJsDoc: 'Complex React component "{{name}}" ({{lines}} lines) should have JSDoc documentation for better maintainability.',
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'Enforce JSDoc documentation on complex React components',
      category: 'Maintainability',
      recommended: false,
      url: docsUrl('require-jsdoc-on-complex-components'),
    },
    messages,
    schema: [
      {
        type: 'object',
        properties: {
          lineLimit: {
            type: 'number',
            default: 50,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const lineLimit = options.lineLimit || 50;
    const sourceCode = context.getSourceCode();

    function checkJsDoc(node, name) {
      const lines = node.loc.end.line - node.loc.start.line;
      if (lines > lineLimit) {
        const jsdoc = sourceCode.getJSDocComment(node);
        if (!jsdoc) {
          report(context, messages.requireJsDoc, 'requireJsDoc', {
            node,
            data: {
              name,
              lines,
            },
          });
        }
      }
    }

    return {
      FunctionDeclaration(node) {
        if (node.id && /^[A-Z]/.test(node.id.name)) {
          checkJsDoc(node, node.id.name);
        }
      },
      VariableDeclarator(node) {
        if (node.id && /^[A-Z]/.test(node.id.name) && 
            (node.init && (node.init.type === 'ArrowFunctionExpression' || node.init.type === 'FunctionExpression'))) {
          checkJsDoc(node.init, node.id.name);
        }
      },
      ClassDeclaration(node) {
        if (node.id && /^[A-Z]/.test(node.id.name)) {
          checkJsDoc(node, node.id.name);
        }
      },
    };
  },
};
