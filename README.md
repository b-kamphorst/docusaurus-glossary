# Glossary Docusaurus Plugin

This plugin allows you to generate a glossary from markdown files in a specified directory. It automatically processes markdown links to terms and displays them in a Term component, and adds all terms to a Glossary component in the `terms/index.md` file.

## Installation

Install the plugin using npm:

```bash
npm install glossary-docusaurus-plugin
```

## Usage

Add the plugin to your Docusaurus configuration:

```js
module.exports = {
  plugins: [
    {
      resolve: 'glossary-docusaurus-plugin',
      options: {
        termsDir: 'docs/terms',
        glossaryPage: 'docs/terms/index.md',
      },
    },
  ],
};
```

## Contributing

Contributions are welcome! Please open an issue or pull request if you have any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.