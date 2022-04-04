export const ApiCall = (url, data) => {

    const body = JSON.stringify({
        ingredients: typeof data === "string" ? JSON.parse(data) : data,
    });

    return await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
    })
};