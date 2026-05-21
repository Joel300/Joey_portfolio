# Joey Portfolio

Personal portfolio for **Joel Dabankah Owusu** — finance operations (SAP ERP) and software development.

**Live site:** [https://joel300.github.io/Joey_portfolio/](https://joel300.github.io/Joey_portfolio/)

## Stack

- HTML, CSS, JavaScript (vanilla)
- [Formspree](https://formspree.io) contact form
- GitHub REST API for repository cards

## Local development

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000)

## Project structure

| Path | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `css/style.css` | Styles and responsive layout |
| `js/app.js` | UI interactions, GitHub projects, contact form |
| `js/projects-data.js` | Featured projects and GitHub config |
| `js/chat.js` | Quick Q&A widget |
| `resume.pdf` | Downloadable resume |
| `images/` | Headshot and project screenshots |

## Customize

- **Featured projects:** edit `FEATURED_PROJECTS` in `js/projects-data.js`
- **GitHub repos shown:** edit `githubAllowlist` in `js/projects-data.js`
- **Contact form:** update Formspree `action` URL in `index.html`

## License

See [LICENSE](LICENSE).
