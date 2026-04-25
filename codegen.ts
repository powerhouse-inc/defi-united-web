import type { CodegenConfig } from '@graphql-codegen/cli'

const SCHEMA = process.env.NEXT_PUBLIC_SWITCHBOARD_URL ?? 'http://localhost:4001/graphql'

const config: CodegenConfig = {
  schema: SCHEMA,
  overwrite: true,
  documents: ['./modules/**/*.gql', './modules/**/*.{tsx,ts}', './app/**/*.{tsx,ts}'],
  generates: {
    './modules/__generated__/graphql/gql-generated.ts': {
      plugins: [
        {
          add: {
            content: `/* eslint-disable */\n// @ts-nocheck`,
            placement: 'prepend',
          },
        },
        'typescript',
        'typescript-operations',
      ],
      config: {
        avoidOptionals: false,
        skipTypename: false,
        enumsAsTypes: true,
        useTypeImports: true,
      },
    },
  },
}

export default config
