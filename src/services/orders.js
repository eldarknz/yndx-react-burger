export const bun = {
    "_id":"60d3b41abdacab0026a733c6",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
};

export const ingredients = [
    {
        "_id":"60d3b41abdacab0026a733c8",
        "name":"Филе Люминесцентного тетраодонтимформа",
        "type":"main",
        "proteins":44,
        "fat":26,
        "carbohydrates":85,
        "calories":643,
        "price":988,
        "image":"https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v":0
    },
    {
        "_id":"60d3b41abdacab0026a733cf",
        "name":"Соус с шипами Антарианского плоскоходца",
        "type":"sauce",
        "proteins":101,
        "fat":99,
        "carbohydrates":100,
        "calories":100,
        "price":88,
        "image":"https://code.s3.yandex.net/react/code/sauce-01.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png",
        "__v":0
    },
    {
        "_id":"60d3b41abdacab0026a733c9",
        "name":"Мясо бессмертных моллюсков Protostomia",
        "type":"main",
        "proteins":433,
        "fat":244,
        "carbohydrates":33,
        "calories":420,
        "price":1337,
        "image":"https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v":0
    }
];

export const getOrdersRequest = async () => {
    return await new Promise(resolve =>
        setTimeout(() => {
            resolve({
                "success": true,
                "orders": [
                    {
                        "ingredients": [
                            "60d3463f7034a000269f45e9",
                            "60d3463f7034a000269f45e7"
                        ],
                        "_id": "",
                        "status": "done",
                        "number": 1,
                        "createdAt": "2021-06-23T20:11:01.403Z",
                        "updatedAt": "2021-06-23T20:11:01.406Z"
                    },
                    {
                        "ingredients": [
                            "60d3463f7034a000269f45e9"
                        ],
                        "_id": "",
                        "status": "done",
                        "number": 3,
                        "createdAt": "2021-06-23T20:13:23.654Z",
                        "updatedAt": "2021-06-23T20:13:23.657Z"
                    }
                ],
                "total": 2,
                "totalToday": 2
            });
        }, 3500)
    );
};