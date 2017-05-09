# Codex

Codex was made to help you tag stuff and then query it easily.


## Installation

For the backend to work, you'll need to have a running instance of `postgresql` 9.5+

1. Clone the repo.
2. Run `codex.sql` in your pgsql server to initialize the database.
3. Adapt `server/config/default.json` to match your own db settings.
4. `npm install` in both `client` and `server`.
5. `npm start` on both as well.
6. Go to [http://localhost:3000]() and tag stuff.


## Query language

(see [tag](https://www.github.com/jfalxa/tag) for the origins of it)

Basically, when you use a tag in a query, it will translate to the whole set of documents that actually have this tag. Then the query language allows you to combine any of the short tags (< 50 chars) that were ever added in the database.

To do so, it uses only 3 reserved words that match the three basic set algebra operations:
- `and` to do an intersection
- `or` to do a union
- `not` to get the complement

If you want to build an even more complex query, you can use parenthesis to group operations. And finally, to avoid repeating and/or many times in a query, you can use a coma (,) to list a group of sets using only one operation.

### Examples:

1. Get the docs that have the tag `music` and the tag `jazz`:
`music and jazz`

2. Get the docs that have the tag `book` or the tag `audio book`:
`book or "audio book"`

3. Get the docs that have the tag `music`, `acid` and `rock`:
`music, acid and rock`

4. Get the docs that have the tag `music` and have either `jazz` or `rock`:
`music and (jazz or rock)`


## REST API

The backend is exposing a REST API so you do not have to go through the UI to actually query the database.

- `GET /api/documents/:docID`:
Gets the document with the given id and all of its tags

- `PUT /api/documents/:docID`:
Updates the document with the parameters sent in POST body (`{"name":"new_doc_name"}`)

- `DELETE /api/documents/:docID`:
Removes the document from the database

- `POST /api/documents/:docID/tags`:
Adds a new tag to the document with the parameters sent in POST body (`{"name":"tag_to_add"}`)

- `DELETE /api/documents/:docID/tags/:tagID`:
Removes the given tag from the document

- `GET /api/autocomplete?fragment=`:
Send a piece of word to the server to get all the matching existing tags

- `GET /api/search?query=`:
Use the query language to get a list of documents from the server


## Some features that would be nice to have
- [ ] Using the URL to store the current query
- [ ] User accounts
- [ ] Bookmarks
- [ ] Specifying the relationship between a doc and a tag
- [ ] Macros for quickly adding group of tags to documents
- [ ] Macros for quickly looking for documents matching those tags
- [ ] Mooore keyboard shortcuts
- [ ] Optimize the SQL queries that are translated from user queries (use EXCEPT!)

