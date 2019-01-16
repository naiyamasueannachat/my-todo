
### List Task
`GET` /imax/list

#### Response body
```json
{
    "status": 200,
    "message": "success",
    "data": [
        {
            "_id": "id",
            "name": "max",
            "description": "support get image path",
            "status": "doing",
            "startdate": "2019-01-16",
        },
        {
            "_id": "id",
            "name": "ice",
            "description": "support DT",
            "status": "test",
            "startdate": "2019-01-17"
        }
    ]
}
```

### Add Task
`POST` /imax/add
#### Request body
```json
{
            "name": "ice",
            "description": "support DT1",
            "status": "test",
            "startdate": "2019-01-17"
    
}
```
#### Response body 
```json
{
    "status": 200,
    "message": "Add successful",
    "data": {
        "name": "ice",
        "description": "support DT1",
        "status": "test",
        "startdate": "2019-01-17",
        "_id": "5c3f1da928d55478655c24d9"
    }
}
```
### Delete Task
`GET` /imax/del/{id}

#### Response body
```json
{
   "status": 200,
   "message": "Delete successful",
   "data": {}
}
```

### Update Task
`GET` /imax/edit/{id}
### Request body
```json
{
   "name": "ice",
            "description": "support OCR",
            "status": "test",
            "startdate": "2019-01-25"
}
```

#### Response body
```json
{
    "status": 200,
    "message": "Edit successful",
    "data": {}
}
```




