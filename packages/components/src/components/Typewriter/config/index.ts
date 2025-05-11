import type { CodeCss, ConfigOption } from './types.d.ts'

// 自定义 md 渲染前缀
export const prefix = 'elx-md'
// export const prefix = 'md-editor'

export const cdnBase = 'https://unpkg.com'

// 代码高亮cdn链接
export const highlightUrl = `${cdnBase}/@highlightjs/cdn-assets@11.10.0/highlight.min.js`

// 美化代码cdn连接
export const prettierUrl = {
  main: `${cdnBase}/prettier@3.3.3/standalone.js`,
  markdown: `${cdnBase}/prettier@3.3.3/plugins/markdown.js`,
}

export const cropperUrl = {
  css: `${cdnBase}/cropperjs@1.6.2/dist/cropper.min.css`,
  js: `${cdnBase}/cropperjs@1.6.2/dist/cropper.min.js`,
}

export const screenfullUrl = `${cdnBase}/screenfull@5.2.0/dist/screenfull.js`

export const mermaidUrl = `${cdnBase}/mermaid@11.3.0/dist/mermaid.min.js`
// export const mermaidUrl = `${cdnBase}/mermaid/9.4.0/mermaid.min.js`;

export const katexUrl = {
  js: `${cdnBase}/katex@0.16.11/dist/katex.min.js`,
  css: `${cdnBase}/katex@0.16.11/dist/katex.min.css`,
}

export const codeCss: CodeCss = {
  a11y: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/a11y-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/a11y-dark.min.css`,
  },
  atom: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-dark.min.css`,
  },
  github: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/github.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/github-dark.min.css`,
  },
  gradient: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/gradient-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/gradient-dark.min.css`,
  },
  kimbie: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-dark.min.css`,
  },
  paraiso: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-dark.min.css`,
  },
  qtcreator: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-dark.min.css`,
  },
  stackoverflow: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-dark.min.css`,
  },
}

// 当前版本的值
export const editorExtensionsAttrs: ConfigOption['editorExtensionsAttrs'] = {
  highlight: {
    js: {
      integrity:
        'sha384-GdEWAbCjn+ghjX0gLx7/N1hyTVmPAjdC2OvoAA0RyNcAOhqwtT8qnbCxWle2+uJX',
      crossOrigin: 'anonymous',
    },
    css: {
      a11y: {
        light: {
          integrity:
            'sha384-qdZDAN3jffvh670RHw1wxLekabidEFaNRninYgIzBvMbL6WlHdXeHS/Bt+vx33lN',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-2QAAjX8pqaM5azX68KWI2wExF6Q13kY4kEiQFY4b/1zPe6rpgmTByNpDEllH3sb+',
          crossOrigin: 'anonymous',
        },
      },
      atom: {
        light: {
          integrity:
            'sha384-w6Ujm1VWa9HYFqGc89oAPn/DWDi2gUamjNrq9DRvEYm2X3ClItg9Y9xs1ViVo5b5',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-oaMLBGEzBOJx3UHwac0cVndtX5fxGQIfnAeFZ35RTgqPcYlbprH9o9PUV/F8Le07',
          crossOrigin: 'anonymous',
        },
      },
      github: {
        light: {
          integrity:
            'sha384-eFTL69TLRZTkNfYZOLM+G04821K1qZao/4QLJbet1pP4tcF+fdXq/9CdqAbWRl/L',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-wH75j6z1lH97ZOpMOInqhgKzFkAInZPPSPlZpYKYTOqsaizPvhQZmAtLcPKXpLyH',
          crossOrigin: 'anonymous',
        },
      },
      gradient: {
        light: {
          integrity:
            'sha384-yErHBR8aEZPxRl3XmR8dGSRAclMlnSRRw8sXQLcmPWzWUvb56BzQmBw3EWHl7QGI',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-lUCvtSOdvDbp5hLWKgwz/taFu1HxlpqES2OVP5UG2JMTfnU481gXcBhGF9lAGoSr',
          crossOrigin: 'anonymous',
        },
      },
      kimbie: {
        light: {
          integrity:
            'sha384-tloeSLUPczAvoZ48TUz+OxRie0oYLCRwlkadUXovGzzJEIbNQB2TkfUuvJ6SW5Mi',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-o5F1vUaMNOmou1sQrsWiFo4/QUGSV0svqNZW+EesmKxWC8MpFJcveBhAyfvTHbGb',
          crossOrigin: 'anonymous',
        },
      },
      paraiso: {
        light: {
          integrity:
            'sha384-5j6QHU2Hwg1ehtlIQNDebhETDB8bga3/88hzBFsMRaGmgQHCftqIN7GZNDNw0vTL',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-I5vnnMQu0LWDQnHpT61xyoMwKarAB8jpZkB2ioFOlmzUFnIFaV4QbUwlBBOMKhTH',
          crossOrigin: 'anonymous',
        },
      },
      qtcreator: {
        light: {
          integrity:
            'sha384-iEBgHrwi8Hv4dSZBz+MOGvS05rF7I7fGKM2fASQyE9jn2Istg9Qd5dSoK18WyRTB',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-D6LXJGWNR4QV7gnpuP3ccbvOYoR02td3cU0y7lESABPg/tzCSC4m+y+M2TtrmpHc',
          crossOrigin: 'anonymous',
        },
      },
      stackoverflow: {
        light: {
          integrity:
            'sha384-FMwt7cTGo4aLxZnno5k0xTj0W4gmi48Kwept+y/oQmE6cFk36Kr+QJZOKNOQwORe',
          crossOrigin: 'anonymous',
        },
        dark: {
          integrity:
            'sha384-iL+x+BroCyHm/p2c6sMA9umXhdCWp2cKe4QUjPeMzHgwXAk+ZxHyIGP3NZTZensU',
          crossOrigin: 'anonymous',
        },
      },
    },
  },
  prettier: {
    standaloneJs: {
      integrity:
        'sha384-92h6ALm8/lHpNGn6MfGlgZ+I8c/4yn/nSN8dV9ZmDxqbP9L93gk/Jj2i0LtV+AVd',
      crossOrigin: 'anonymous',
    },
    parserMarkdownJs: {
      integrity:
        'sha384-5ufuUgoSsr/2oihBZ5d+c+yt0qaUmzLtUz41VZNJ4txtyJ6mBve3ZwuKoq/IygYX',
      crossOrigin: 'anonymous',
    },
  },
  cropper: {
    js: {
      integrity:
        'sha384-jrOgQzBlDeUNdmQn3rUt/PZD+pdcRBdWd/HWRqRo+n2OR2QtGyjSaJC0GiCeH+ir',
      crossOrigin: 'anonymous',
    },
    css: {
      integrity:
        'sha384-6LFfkTKLRlzFtgx8xsWyBdKGpcMMQTkv+dB7rAbugeJAu1Ym2q1Aji1cjHBG12Xh',
      crossOrigin: 'anonymous',
    },
  },
  screenfull: {
    js: {
      integrity:
        'sha384-Qfbv8upMDu/ikv42M0Jnym2hahbDQ77Nm8PGU0G+iA6UIwt1+scE6P1qKXA0anWU',
      crossOrigin: 'anonymous',
    },
  },
  mermaid: {
    js: {
      integrity:
        'sha384-B2tp/GqmE6VfDRB3JPTsesr0+SXypThjLSvQEQH7iv3f3/PYKCm5Q4+SGPcitStz',
      crossOrigin: 'anonymous',
    },
  },
  katex: {
    js: {
      integrity:
        'sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg',
      crossOrigin: 'anonymous',
    },
    css: {
      integrity:
        'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
      crossOrigin: 'anonymous',
    },
  },
}

export const configOption: ConfigOption = {
  editorExtensions: {
    highlight: {
      js: highlightUrl,
      css: codeCss,
    },
    prettier: {
      standaloneJs: prettierUrl.main,
      parserMarkdownJs: prettierUrl.markdown,
    },
    cropper: {
      ...cropperUrl,
    },
    screenfull: {
      js: screenfullUrl,
    },
    mermaid: {
      js: mermaidUrl,
      enableZoom: true,
    },
    katex: {
      ...katexUrl,
    },
  },
  editorExtensionsAttrs: {},
  editorConfig: {
    languageUserDefined: {},
    mermaidTemplate: {},
    renderDelay: 500,
    zIndex: 20000,
  },
  codeMirrorExtensions: (_theme, innerExtensions) => innerExtensions,
  markdownItConfig: () => {},
  markdownItPlugins: s => s,
  mermaidConfig: c => c,
  katexConfig: c => c,
}
