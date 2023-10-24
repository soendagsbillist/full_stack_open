```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    note right of browser: POST request contains new note as JSON data
    server-->>browser: Status Code 201 Created
    deactivate server
```
