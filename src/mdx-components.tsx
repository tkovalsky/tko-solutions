import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-4xl font-semibold leading-tight" {...props} />,
    h2: (props) => <h2 className="mt-12 text-3xl font-semibold leading-tight" {...props} />,
    h3: (props) => <h3 className="mt-10 text-xl font-semibold" {...props} />,
    p: (props) => <p className="mt-5 text-lg leading-8 text-muted" {...props} />,
    ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-muted" {...props} />,
    ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-muted" {...props} />,
    ...components,
  };
}

