- Server side rendering delivers the html without interactiviy first, then the Browser loads the script tag. The hydrateRoot method will attach the event listeners to the delivered HTML. SSR does stream the html with head, parsed HTML with React renderTo string, and then close the html.

Build ssg using basic node and create element react
Check how to convert md to html on the repo
Ssr pre renders the page with some Html and adds interactivity with React later
Web browser do not exist in the server
We don't replace the root like we did on the client side. Instead we split into parts and sends the head tag so it can download css and js while giving the pre rendered page

- Traditional SPA without SSR will
