import { Parser } from "acorn";
import jsx from "acorn-jsx";
import { visit } from "unist-util-visit";

const parser = Parser.extend(jsx());

const lang = new Set(["js", "jsx", "javascript"]);

export function remarkMdxEvalCodeBlock(filename: string) {
  return (tree: any) => {
    visit(tree, "code", (node, index, parent) => {
      if (lang.has(node.lang) && node.meta === "eval") {
        const program = parser.parse(node.value, {
          ecmaVersion: 2020,
          sourceType: "module",
        });
        const output = {
          type: "mdxFlowExpression",
          value: "",
          data: {
            estree: {
              type: "Program",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    callee: {
                      type: "ArrowFunctionExpression",
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        body: [
                          ...program.body.slice(0, -1),
                          {
                            type: "ReturnStatement",
                            argument: program.body.at(-1),
                          },
                        ],
                      },
                    },
                    arguments: [],
                    optional: false,
                  },
                },
              ],
            },
          },
        };
        // console.log(`Processing eval block in ${filename}`);
        parent.children.splice(index, 1, output);
      }
    });
  };
}