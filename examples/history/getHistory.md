# History

Mendapatkan History prediksi penyakit tanaman (ALPA).

**URL** : `/fungsi/`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

{
    "history": [
        {
            "id": 18,
            "result": "gambar.jpg"
        },
        {
            "id": 19,
            "result": "gambar.jpg"
        },
        {
            "id": 20,
            "result": "gambar.jpg"
        },
        {
            "id": 21,
            "result": "gambar.jpg"
        },
        {
            "id": 22,
            "result": "gambar.jpg"
        }
    ]
}

## Error Response

**Code** : `401 BAD REQUEST`

**Condition** : Ketika gunakan token yang sudah digunakan logout

**Content**
```json
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Harap login kembali"
}
```

**Condition** : Ketika token tidak ditemukan

**Content**
```json
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Token tidak ditemukan"
}
```

**Condition** : Ketika token tidak benar

**Content**
```json
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "invalid token"
}
```
