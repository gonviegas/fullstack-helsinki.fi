```mermaid
sequenceDiagram
    participant user 
    participant browser
    participant server

    user->>browser: Submits form
    Note right of user: $inserted_text
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: note: $inserted_text
    activate server 
    server-->>browser: { "message": "note created" }
    deactivate server 

    browser-->>browser: spa is updated
```
