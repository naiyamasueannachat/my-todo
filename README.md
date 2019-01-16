# my-todo

### List Product
`GET` /product/list

#### Response body
```json
{
    "status": 200,
    "message": "success",
    "data": [
        {
            "id": 1,
            "name": "food 1",
            "price": 99.99,
        },
        {
            "id": 2,
            "name": "food 2",
            "price": 99.99,
        }
    ]
}
```