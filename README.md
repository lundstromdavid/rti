# Runtime Interface (RTI) for Typescript/Javascript

(name will be changed as I've learned that there exists something called a RTI connector)

I wanted my TypeScript-interfaces to persist in runtime so that I could (for example) validate data received from the client. Then I thought I might as well make it so that you can put more restrictions on the fields except for data-types, like min length, max length and more.

This will support custom field-types as well (GUID, phonenumber, email, etc). Support will also be added to for the user to write their own types by simply extending the classes.

There are similar libraries already on the market, as this is essentially a JSON-schema validator type library. I haven't found any library that does exactly what I want, however, so I thought it would be a great exercise to write my own.

The code is currently very messy and a lot of refactoring will need to be made to make it readable.

## Personal goals for the project

- publish it to NPM, with Typescript support
- learn, understand and use Semver
- understand how licensing works and use the appropriate license for the project
- write and analyse tests and test-coverage
