/**
 * @fileoverview Prevents usage of console.log in React components
 * @author Manus
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const report = require('../util/report');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const messages = {
  noConsoleInComponent: 'Unexpected console.log in React component. Use a dedicated logger or remove it before production.',
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'Prevents usage of console.log in React components',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-console-in-components'),
    },
    messages,
    schema: [],
  },

  create(context) {
    let inComponent = false;

    function enterComponent() {
      inComponent = true;
    }

    function exitComponent() {
      inComponent = false;
    }

    return {
      FunctionDeclaration: enterComponent,
      'FunctionDeclaration:exit': exitComponent,
      FunctionExpression: enterComponent,
      'FunctionExpression:exit': exitComponent,
      ArrowFunctionExpression: enterComponent,
      'ArrowFunctionExpression:exit': exitComponent,
      ClassDeclaration: enterComponent,
      'ClassDeclaration:exit': exitComponent,

      'CallExpression[callee.object.name="console"][callee.property.name="log"]'(node) {
        if (inComponent) {
          report(context, messages.noConsoleInComponent, 'noConsoleInComponent', {
            node,
          });
        }
      },
    };
  },
};
