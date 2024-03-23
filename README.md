Nike Product Information Scraper API
This API is designed to scrape product information from Nike.com (US version) and provide real-time status updates to clients. It operates in full compliance with Nike's terms of service and legal standards.

Features
Asynchronous processing of product information scraping requests.
Immediate response with a unique process identifier upon request reception.
Real-time status updates, including a "not ready" status during data processing.
Transformation of website data into a unified JSON format.
Getting Started
Prerequisites
Node.js (version 14 or later recommended)
npm or Yarn
Access to the internet for scraping Nike.com

## Installation

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ git clone <repository-url>
```

## Navigate to the project directory:

```bash
$ npm install
```
or

```bash
$ yarn install
```
## Start the development server:

```bash
$ npm run start:dev
# or
$ yarn start:dev
```

## Installation

```bash
$ git clone <repository-url>
```

## The API is now accessible at http://localhost:3000/.

## Usage (curl example here, but can use any other tool like Postman or Insomnia)

Request (send product id): 
```bash
$ curl http://localhost:3000/scrape?productId=DQ8423-042
```
Response (get a unique process identifier):
```bash
{
  "processId": "unique_process_identifier"
}
```
Request (send unique process identifier):
```bash
$ curl curl http://localhost:3000/scrape?processId=unique_process_identifier
```
Response (before processing completes):
```bash
{
  "status": "not ready"
}
```
Response (after processing completes):
```bash
{
    "product": {
        "name": "Air Jordan 1 Mid",
        "brand": "Nike",
        "price": "$77.97",
        "isAvailable": true,
        "isInSale": true,
        "saleDescription": "29% off",
        "description": "Big Kids' Shoes"
    }
}
```

Development
This project uses the following main technologies:

NestJS for the backend framework.
Axios for HTTP requests.
Cheerio for HTML parsing.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
