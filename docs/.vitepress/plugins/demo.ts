import { AttributeNode, baseParse, ElementNode } from "@vue/compiler-core";
import type { PluginOption } from "vite";
import { createFilter } from "@rollup/pluginutils";

let index = 0;

function createComponentName() {
  return `Demo${index++}`;
}

type DemoElement = {
  tag: string;
  props: Record<string, any>;
};

function parseDemoElement(code: string): DemoElement {
  const { children } = baseParse(code);

  const elementNode = children[0] as ElementNode;

  const props = {};

  for (const prop of elementNode.props) {
    props[prop.name] = (prop as AttributeNode).value?.content;
  }

  return {
    tag: elementNode.tag,
    props,
  };
}

function transformCode(code: string, id: string) {
  const reg = /<demo(.*)\/>/g;

  const scripts: string[] = [];

  code = code.replace(reg, (match) => {
    const ast = parseDemoElement(match);
    const componentName = createComponentName();

    const filePath = ast.props.src;

    scripts.push(`import ${componentName} from '${filePath}'`);

    return `<${componentName} />`;
  });

  const scriptsCode = `<script setup> 
  ${scripts.join("\n")} 
  </script>
  `;

  code = scriptsCode + "\n" + code;

  return code;
}

const vitePluginVitepressDemo = (): PluginOption => {
  /** filter out files which aren't Markdown files */
  const filter = createFilter(/(.*)hooks(.*)\.md$/);

  return {
    name: "vite-plugin-vitepress-demo",
    enforce: "pre",

    transform(code: string, id: string) {
      if (!filter(id)) return;

      try {
        return transformCode(code, id);
      } catch (error) {
        this.error(error);
      }
    },
  };
};

export default vitePluginVitepressDemo;
